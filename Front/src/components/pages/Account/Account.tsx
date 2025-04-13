import { FC, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import axiosService from '../../../services/AxiosService';
import { Offer } from '../../../typings/Offer';
import { Box, colors, IconButton, Snackbar, SnackbarContent, Tab, Tabs } from '@mui/material';
import theme from '../../../theme';
import { Avatar, Typography, Button } from '../../atoms';
import { AddCircle, Edit, Logout } from '@mui/icons-material';
import { OfferCard } from '../../organisms';

enum DisplayOfferType {
	Owned = 0,
	Favorite = 1
}

const Account: FC = () => {
	const { user, logout } = useAuth();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [userOffers, setUserOffers] = useState<Offer[]>([]);
	const [favoriteOffers, setFavoriteOffers] = useState<Offer[]>([]);
	const [displayedOffers, setDisplayedOffers] = useState(DisplayOfferType.Owned);

	useEffect(() => {
		(async () => {
			axiosService.get<{ offers: Offer[] }>("users/offers").then((resp) => {
				setUserOffers(resp.data.offers);
			}).catch((resp: AxiosError) => {
				console.log(resp.message);
				if (!snackbarOpen)
					setSnackbarOpen(true);
			});

			axiosService.get<{ offers: Offer[] }>("offers/favorite").then((resp) => {
				setFavoriteOffers(resp.data.offers);
			}).catch((resp: AxiosError) => {
				console.log(resp.message);
				if (!snackbarOpen)
					setSnackbarOpen(true);
			});;
		})();
	}, []);

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	}

	const handleEditProfilePicture = () => {
		alert("Modifier la photo de profil cliqué !");
		// You can navigate to the edit profile page or open a modal
	};

	const handleEditProfile = () => {
		alert("Modifier le profil cliqué !");
		// You can navigate to the edit profile page or open a modal
	};

	const handleLogout = () => {
		logout(() => window.location.href = "/");
	};

	const handleDisplayedOffersChange = (event: React.SyntheticEvent, newValue: number) => {
		setDisplayedOffers(newValue);
	};

	return (
		<Typography component='div' color={theme.palette.primary.main}>
			<Typography variant='h4'>
				Mon Compte
			</Typography>

			<Box display='flex' flexDirection='column' marginTop='1rem'>
				<Box display='flex' justifyContent='space-between' width='100%'>
					<Box display='flex' alignItems='center'>
						<Box position='relative'>
							<Avatar size={180} url='/Images/avatar.jpg' />
							<IconButton onClick={handleEditProfilePicture} sx={{ position: "absolute", bottom: 0, right: 0 }}>
								<AddCircle fontSize='large' sx={{ color: 'white', backgroundColor: theme.palette.primary.main, borderRadius: '50%' }} />
							</IconButton>
						</Box>
						<Box display='flex' flexDirection='column' alignItems='start' marginLeft='2rem' alignSelf='start'>
							<Typography variant='h6'>{user?.username}</Typography>
							<Typography variant='caption'>{user?.email}</Typography>
							<Typography variant='caption'>07 70 70 70 70</Typography> {/* À faire */}
							<Box display='flex' flexDirection='column' marginTop='2rem'>
								<Button variant='contained' size='small' onClick={handleEditProfile} sx={{ paddingX: '1rem', marginBottom: '0.5rem' }}>
									<Edit fontSize='inherit' sx={{ marginRight: '0.5rem' }} />
									<Typography variant='caption'>Modifier le profil</Typography>
								</Button>
								<Button color="secondary" size='small' variant='contained' onClick={handleLogout} sx={{ paddingX: '1rem' }}>
									<Logout fontSize='inherit' sx={{ marginRight: '0.5rem' }} />
									<Typography variant='caption'>Se déconnecter</Typography>
								</Button>
							</Box>
						</Box>
					</Box>
					<Box display='flex' flexDirection='column' fontSize='80px'>
						<svg width="180" height="180" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M44 0C41.7909 0 40 1.79086 40 4V32C40 34.2091 41.7909 36 44 36H72C74.2091 36 76 34.2091 76 32V4C76 1.79086 74.2091 0 72 0H44ZM51 5C48.7909 5 47 6.79086 47 9V24C47 26.2091 48.7909 28 51 28H66C68.2091 28 70 26.2091 70 24V9C70 6.79086 68.2091 5 66 5H51Z" fill="#F2DC6B" />
							<path fillRule="evenodd" clipRule="evenodd" d="M4 40C1.79086 40 0 41.7909 0 44V72C0 74.2091 1.79086 76 4 76H32C34.2091 76 36 74.2091 36 72V44C36 41.7909 34.2091 40 32 40H4ZM11 45C8.79086 45 7 46.7909 7 49V64C7 66.2091 8.79086 68 11 68H26C28.2091 68 30 66.2091 30 64V49C30 46.7909 28.2091 45 26 45H11Z" fill="#F2DC6B" />
							<circle cx="58" cy="58" r="18" fill="#D99E89" />
							<circle cx="18" cy="18" r="18" fill="#D99E89" />
						</svg>

					</Box>
				</Box>
				<Box mt={10}>
					<Tabs
						value={displayedOffers}
						onChange={handleDisplayedOffersChange}
						aria-label="Type d'offres">
						<Tab sx={{ color: displayedOffers === DisplayOfferType.Owned ? theme.palette.primary.light : theme.palette.primary.dark }} label={`Mes annonces publiées (${userOffers.length})`} value={DisplayOfferType.Owned} />
						<Tab sx={{ color: displayedOffers === DisplayOfferType.Favorite ? theme.palette.primary.light : theme.palette.primary.dark }} label={`Mes annonces favorites (${favoriteOffers.length})`} value={DisplayOfferType.Favorite} />
					</Tabs>

					{displayedOffers === DisplayOfferType.Owned && (
						<Box display="flex" flexDirection="column" alignItems="center" mt={10}>
							{userOffers.length === 0 ? (
								<Typography variant="body1">
									Aucune annonce publiée pour le moment.
								</Typography>
							) : (
								<Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
									{userOffers.map((offer: Offer) => (
										<OfferCard offer={offer} key={offer.id} />
									))}
								</Box>
							)}
						</Box>
					)}

					{displayedOffers === DisplayOfferType.Favorite && (
						<Box display="flex" flexDirection="column" alignItems="center" mt={10}>
							{favoriteOffers.length === 0 ? (
								<Typography variant="body1">
									Aucune annonce favorite pour le moment.
								</Typography>
							) : (
								<Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
									{favoriteOffers.map((offer: Offer) => (
										<OfferCard offer={offer} key={offer.id} />
									))}
								</Box>
							)}
						</Box>
					)}

				</Box>
			</Box>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
			>
				<SnackbarContent
					message="Une erreur est survenue lors du chargement des offres."
					sx={{ color: theme.palette.custom.danger, backgroundColor: 'white' }} />
			</Snackbar>
		</Typography>
	);
};

export default Account;
