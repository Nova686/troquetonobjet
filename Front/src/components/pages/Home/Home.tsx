import { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { AxiosResponse } from "axios";
import axiosService from "../../../services/AxiosService";
import { OffersList } from "../../organisms";
import { Offer } from "../../../typings/Offer";
import { Link } from "react-router-dom";
import { Typography } from "../../atoms";

const Home: FC = () => {
	const [offers, setOffers] = useState<Offer[]>([]);
	const [loadingOffers, setLoadingOffers] = useState(false);

	const theme = useTheme();

	const handleLastOffers = async () => {
		setLoadingOffers(true);
		const response: AxiosResponse = await axiosService.get("offers", { params: { page: 1, nb_per_page: 8 } });
		setOffers(response.data.list);
		setLoadingOffers(false);
	};

	// Appeler handleOffers une fois au montage du composant
	useEffect(() => {
		handleLastOffers();
	}, []);

	return (
		<>
			<Box display={'flex'} alignItems={'center'} marginTop={'16px'} gap={16}>
				<div style={{ width: '50%' }}>
					<Typography variant="h2" style={{
						color: theme.palette.primary.main,
						fontSize: '32px',
						textTransform: 'uppercase',
						fontWeight: 800
					}}>
						Donne et échange tes objets près de chez toi
					</Typography>
					<p style={{ fontSize: '18px', color: theme.palette.custom.textColor }}>
						Troc ton Objet, une plateforme communautaire de dons et d’échanges d'objets français !
					</p>
				</div>
				<img src="/Images/home.svg" alt="home" style={{ width: '50%' }} />
			</Box>

			<div style={{ backgroundColor: theme.palette.primary.main, padding: '32px', marginTop: '48px', fontWeight: 'bold' }}>
				<div style={{ textAlign: 'center', paddingBottom: '32px', fontSize: '24px' }}>Le troc comme tu ne l’as jamais connu !</div>

				<Box display={'flex'} alignItems={'center'} gap={'12px'} justifyContent={'space-around'}>
					<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<img src="/Images/trust.svg" alt="Logo mains se serrant" />
						Confiance
					</Box>
					<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<img src="/Images/meeting.svg" alt="Logo rencontre" />
						Rencontre
					</Box>
					<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<img src="/Images/environment.svg" alt="Logo sur l'environnement" />
						Environnement
					</Box>
					<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
						<img src="/Images/support.svg" alt="Logo sur l'entraide" />
						Entraide
					</Box>
				</Box>
			</div>

			<div style={{ color: theme.palette.primary.main, marginTop: '48px', marginBottom: '64px' }}>
				<div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '2em' }}>Dernières annonces en ligne</div>
				<OffersList offers={offers} loading={loadingOffers} />
				<Box display="flex" justifyContent="center" marginTop="32px">
					<Link to="/offers">
						<Button variant="contained" color="primary" type="submit">
							Voir plus d'offres
						</Button>
					</Link>
				</Box>
			</div>
		</>
	)
}

export default Home;