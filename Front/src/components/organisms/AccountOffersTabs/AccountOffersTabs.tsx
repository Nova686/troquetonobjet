import { Box, Tab, Tabs } from '@mui/material';
import { OffersList } from '../../organisms';
import { Offer } from '../../../typings/Offer';
import { Typography } from '../../atoms';
import theme from '../../../theme';

interface Props {
	displayed: number;
	setDisplayed: (val: number) => void;
	userOffers: Offer[];
	favoriteOffers: Offer[];
	loadingUser: boolean;
	loadingFavorites: boolean;
}

const AccountOffersTabs = ({
	displayed,
	setDisplayed,
	userOffers,
	favoriteOffers,
	loadingUser,
	loadingFavorites
}: Props) => (
	<Box mt={10}>
		<Tabs value={displayed} onChange={(_, val) => setDisplayed(val)} aria-label="Type d'offres">
			<Tab
				sx={{ color: displayed === 0 ? theme.palette.primary.light : theme.palette.primary.dark }}
				label={`Mes annonces publiées (${userOffers.length})`}
				value={0}
			/>
			<Tab
				sx={{ color: displayed === 1 ? theme.palette.primary.light : theme.palette.primary.dark }}
				label={`Mes annonces favorites (${favoriteOffers.length})`}
				value={1}
			/>
		</Tabs>

		{displayed === 0 && (
			<Box display="flex" flexDirection="column" alignItems="center" mt={10}>
				{userOffers.length === 0 && !loadingUser ? (
					<Typography variant="body1">Aucune annonce publiée pour le moment.</Typography>
				) : (
					<OffersList offers={userOffers} loading={loadingUser} />
				)}
			</Box>
		)}

		{displayed === 1 && (
			<Box display="flex" flexDirection="column" alignItems="center" mt={10}>
				{favoriteOffers.length === 0 && !loadingFavorites ? (
					<Typography variant="body1">Aucune annonce favorite pour le moment.</Typography>
				) : (
					<OffersList offers={favoriteOffers} loading={loadingFavorites} />
				)}
			</Box>
		)}
	</Box>
);

export default AccountOffersTabs;