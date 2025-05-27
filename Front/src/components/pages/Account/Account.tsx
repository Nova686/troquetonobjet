import { FC, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import axiosService from '../../../services/AxiosService';
import { Offer } from '../../../typings/Offer';
import { Box } from '@mui/material';
import theme from '../../../theme';
import { Typography } from '../../atoms';
import { AccountHeader, AccountModals, AccountOffersTabs } from '../../organisms';
import { useToast } from '../../../contexts/ToastContext';

enum DisplayOfferType {
	Owned = 0,
	Favorite = 1
}

const Account: FC = () => {
	const { showToast } = useToast();
	const { user, logout, editUser } = useAuth();
	const [userOffers, setUserOffers] = useState<Offer[]>([]);
	const [userOffersLoading, setUserOffersLoading] = useState(false);
	const [favoriteOffers, setFavoriteOffers] = useState<Offer[]>([]);
	const [favoriteOffersLoading, setFavoriteOffersLoading] = useState(false);
	const [displayedOffers, setDisplayedOffers] = useState(DisplayOfferType.Owned);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [avatarsModalOpen, setAvatarsModalOpen] = useState(false);

	useEffect(() => {
		(async () => {
			setUserOffersLoading(true);
			setFavoriteOffersLoading(true);
			axiosService.get<{ offers: Offer[] }>("users/offers").then((resp) => {
				setUserOffers(resp.data.offers);
			}).catch((resp: AxiosError) => {
				console.log(resp.message);
				showToast({
					message: "Une erreur est survenue lors du chargement des offres",
					position: { vertical: 'bottom', horizontal: 'right' },
					type: 'error'
				});
			}).finally(() => {
				setUserOffersLoading(false);
			});;

			axiosService.get<{ offers: Offer[] }>("offers/favorite").then((resp) => {
				setFavoriteOffers(resp.data.offers);
			}).catch((resp: AxiosError) => {
				console.log(resp.message);
				showToast({
					message: "Une erreur est survenue lors du chargement des offres",
					position: { vertical: 'bottom', horizontal: 'right' },
					type: 'error'
				});
			}).finally(() => {
				setFavoriteOffersLoading(false);
			});
		})();
	}, []);

	const handleEditAccountAvatar = (selectedAvatar: number) => {
		setLoading(true);
		axiosService.put("users", { username: user?.username, avatar: selectedAvatar }).then((resp) => {
			if (resp.status === 204) {
				setAvatarsModalOpen(false);
				editUser(undefined, undefined, selectedAvatar);
				showToast({
					message: "L'avatar a été modifié avec succès",
					position: { vertical: 'bottom', horizontal: 'right' },
					type: 'success'
				});
			}
		}).catch((resp: AxiosError) => {
			console.log(resp.message);
			showToast({
				message: "Une erreur est survenue lors de l'edition de l'avatar",
				position: { vertical: 'bottom', horizontal: 'right' },
				type: 'error'
			});
		}).finally(() => {
			setLoading(false);
		});
	};

	const handleEditAccount = (username: string, phone: string) => {
		setLoading(true);
		const editedPhone = phone == "" ? null : phone;
		axiosService.put("users", { username: username, phone: editedPhone }).then((resp) => {
			if (resp.status === 204) {
				setEditModalOpen(false);
				editUser(username, editedPhone);
				showToast({
					message: "Le profil a été modifié avec succès",
					position: { vertical: 'bottom', horizontal: 'right' },
					type: 'success'
				});
			}
		}).catch((resp: AxiosError) => {
			console.log(resp.message);
			showToast({
				message: "Une erreur est survenue lors de l'edition du profil",
				position: { vertical: 'bottom', horizontal: 'right' },
				type: 'error'
			});
		}).finally(() => {
			setLoading(false);
		});
	};

	const handleLogout = () => {
		logout(() => window.location.href = "/");
	};

	return (
		<Box color={theme.palette.primary.main}>
			<Typography variant='h4'>
				Mon Compte
			</Typography>
			<AccountHeader
				user={user!}
				avatarIndex={user?.avatar ?? null}
				onLogout={handleLogout}
				onEditProfile={() => setEditModalOpen(true)}
				onEditAvatar={() => setAvatarsModalOpen(true)}
			/>
			<Box display='flex' flexDirection='column' marginTop='1rem'>
				<AccountOffersTabs
					displayed={displayedOffers}
					favoriteOffers={favoriteOffers}
					userOffers={userOffers}
					loadingFavorites={favoriteOffersLoading}
					loadingUser={userOffersLoading}
					setDisplayed={setDisplayedOffers}
				/>
			</Box>
			<AccountModals
				user={{ username: user!.username, avatar: user?.avatar, phone: user?.phone }}
				avatarsModalOpen={avatarsModalOpen}
				onEditAvatar={handleEditAccountAvatar}
				setAvatarsModalOpen={setAvatarsModalOpen}
				editModalOpen={editModalOpen}
				onEditAccount={handleEditAccount}
				setEditModalOpen={setEditModalOpen}
				loading={loading}
			/>
		</Box>
	);
};

export default Account;
