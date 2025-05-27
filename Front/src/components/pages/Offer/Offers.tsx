import { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import axiosService from "../../../services/AxiosService";
import { Offer } from "../../../typings/Offer";
import { OffersList } from "../../organisms";
import { useTheme } from "@mui/material/styles";
import { CreateOfferButton, Pagination as PaginationItem } from "../../molecules";
import { useAuth } from "../../../contexts/AuthContext";
import { Pagination } from "../../../typings/Pagination";
import { Box } from "@mui/material";

const Offers: FC = () => {
	const [offers, setOffers] = useState<Pagination<Offer> | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const theme = useTheme();
	const { isConnected } = useAuth();
	const [page, setPage] = useState<number>(1);

	const handleOffers = async () => {
		setLoading(true);

		try {
			const response: AxiosResponse = await axiosService.get("offers", { params: { page: page, nb_per_page: 3 } });
			setOffers(response.data);
			setError(null);
		} catch (err) {
			setError("Une erreur s'est produite lors du chargement des offres.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Appeler handleOffers une fois au montage du composant
	useEffect(() => {
		handleOffers();
	}, [page]);

	return (
		<div style={{ marginBottom: '64px' }}>

			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				color={theme.palette.primary.main}
			>
				<h1>Les dernières annonces</h1>
				{isConnected() && <CreateOfferButton />}
			</Box>

			<OffersList offers={offers?.list} loading={loading} error={error} />
			{offers && <PaginationItem onPageChange={setPage} currentPage={offers!.page} totalPage={offers!.totalPage} />}
		</div>
	);
};

export default Offers;
