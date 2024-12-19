import {AxiosResponse} from "axios";
import {FC, useEffect, useState} from "react";
import axiosService from "../../../services/AxiosService";
import {Offer} from "../../../typings/Offer";
import {OfferCard} from "../../organisms";
import {Typography} from "../../atoms";

const Offers: FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleOffers = async () => {
        setLoading(true);
        setError(null); // Réinitialise l'erreur avant chaque appel

        try {
            const response: AxiosResponse = await axiosService.get("offers");
            setOffers(response.status === 200 ? response.data.offers : []);
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
        <div>
            <h1>Listing des offres</h1>

            {loading && <p>Chargement des offres...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}

            {
                !loading && !error &&
                <Typography component={'div'} sx={{display: 'flex', flexWrap: 'wrap', gap: '4.5em', justifyContent: 'center'}}>
                    {offers.map((offer) => (
                        <OfferCard offer={offer} key={offer.id}/>
                    ))}
                </Typography>
            }
        </div>
    );
};

export default Offers;
