import {AxiosResponse} from "axios";
import {FC, useEffect, useState} from "react";
import axiosService from "../../../services/AxiosService";
import {Offer} from "../../../typings/Offer";
import {OfferCard} from "../../organisms";
import {Typography} from "../../atoms";
import {useTheme} from "@mui/material/styles";
import {CreateOfferButton} from "../../molecules";
import {useAuth} from "../../../contexts/AuthContext";
import {Pagination} from "../../../typings/Pagination";
import { Box } from "@mui/material";

const Offers: FC = () => {
    const [offers, setOffers] = useState<Pagination<Offer> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();
    const { isConnected } = useAuth();

    const handleOffers = async () => {
        setLoading(true);

        try {
            const response: AxiosResponse = await axiosService.get("offers", {params: {page: 1, nb_per_page: 20}});
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
    }, []);

    return (
        <div style={{ marginBottom: '64px' }}>

            <Typography component={'div'} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                color={theme.palette.primary.main}>
                <h1>Les dernières annonces</h1>
                {isConnected() && <CreateOfferButton/>}
            </Typography>

            {loading && <p style={{color: "white"}}>Chargement des offres...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}

            {!loading && !error &&
                <Box display={'flex'} justifyContent={'space-between'} gap="12px" flexWrap="wrap">
                    {offers?.list.map((offer) => (
                        <div key={offer.id} style={{ width: 'calc(25% - 12px)' }}>
                            <OfferCard offer={offer}/>
                        </div>
                    ))}
                </Box>
            }
        </div>
    );
};

export default Offers;
