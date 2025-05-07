import {FC, useEffect, useState} from "react";
import {Offer} from "../../../typings/Offer";
import {useTheme} from "@mui/material/styles";
import {AxiosResponse} from "axios";
import axiosService from "../../../services/AxiosService";
import { OffersList} from "../../organisms";

const Favorite: FC = () => {
    const [offers, setOffers] = useState<Offer[]>([])

    const theme = useTheme();

    const handleOffers = async () => {
        const response: AxiosResponse = await axiosService.get("offers/favorite");
        setOffers(response.data.offers);
    };

    // Appeler handleOffers une fois au montage du composant
    useEffect(() => {
        handleOffers();
    }, []);

    return (
        <>
            <h2 style={{ color: theme.palette.primary.main }}>Mes annonces favorites</h2>
            <OffersList offers={offers} />
        </>
    )
}

export default Favorite;