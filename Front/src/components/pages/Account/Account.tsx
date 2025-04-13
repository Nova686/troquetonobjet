import { FC, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import axiosService from '../../../services/AxiosService';
import { Offer } from '../../../typings/Offer';
import { Box, IconButton, Snackbar, SnackbarContent } from '@mui/material';
import theme from '../../../theme';
import { Avatar, Typography, Button } from '../../atoms';
import { AddCircle, Circle, Edit, Logout, PlusOneRounded, Square } from '@mui/icons-material';

const Account: FC = () => {
	const { user, logout } = useAuth();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [userOffers, setUserOffers] = useState<Offer[]>([]);
	const [favoriteOffers, setFavoriteOffers] = useState<Offer[]>([]);

	useEffect(() => {
		(async () => {
			axiosService.get<Offer[]>("users/offers").then((resp) => {
				setUserOffers(resp.data);
			}).catch((resp: AxiosError) => {
				console.log(resp.message);
				if (!snackbarOpen)
					setSnackbarOpen(true);
			});

			axiosService.get("offers/favorite").then((resp) => {
				setFavoriteOffers(resp.data);
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

	// Function to handle profile edit button click
	const handleEditProfile = () => {
		alert("Modifier le profil cliqué !");
		// You can navigate to the edit profile page or open a modal
	};

	// Function to handle view more button click
	const handleViewMore = () => {
		alert("Voir plus d'annonces !");
		// Logic to load more ads or redirect
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
								<Button color="secondary" size='small' variant='contained' onClick={logout} sx={{ paddingX: '1rem' }}>
									<Logout fontSize='inherit' sx={{ marginRight: '0.5rem' }} />
									<Typography variant='caption'>Se déconnecter</Typography>
								</Button>
							</Box>
						</Box>
					</Box>
					<Box display='flex' flexDirection='column' fontSize='80px'>
						<svg width="180" height="180" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M44 0C41.7909 0 40 1.79086 40 4V32C40 34.2091 41.7909 36 44 36H72C74.2091 36 76 34.2091 76 32V4C76 1.79086 74.2091 0 72 0H44ZM51 5C48.7909 5 47 6.79086 47 9V24C47 26.2091 48.7909 28 51 28H66C68.2091 28 70 26.2091 70 24V9C70 6.79086 68.2091 5 66 5H51Z" fill="#F2DC6B" />
							<path fill-rule="evenodd" clip-rule="evenodd" d="M4 40C1.79086 40 0 41.7909 0 44V72C0 74.2091 1.79086 76 4 76H32C34.2091 76 36 74.2091 36 72V44C36 41.7909 34.2091 40 32 40H4ZM11 45C8.79086 45 7 46.7909 7 49V64C7 66.2091 8.79086 68 11 68H26C28.2091 68 30 66.2091 30 64V49C30 46.7909 28.2091 45 26 45H11Z" fill="#F2DC6B" />
							<circle cx="58" cy="58" r="18" fill="#D99E89" />
							<circle cx="18" cy="18" r="18" fill="#D99E89" />
						</svg>

					</Box>
				</Box>

				<div className="history-container">
					<h3>Mes Annonces</h3>
					<div className="ad-card">
						<img src="/Images/gourde.jpeg" alt="Annonce 1" />
						<div className="ad-info">
							<h4>Titre de l'objet</h4>
							<p>Description courte de l'annonce...</p>
							<span>Date : 12/06/2024</span>
						</div>
					</div>
					<div className="ad-card">
						<img src="/Images/gourde.jpeg" alt="Annonce 2" />
						<div className="ad-info">
							<h4>Deuxième objet</h4>
							<p>Description courte de l'annonce...</p>
							<span>Date : 10/06/2024</span>
						</div>
					</div>
					<button className="view-more" onClick={handleViewMore}>
						Voir plus
					</button>
				</div>
			</Box>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
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
