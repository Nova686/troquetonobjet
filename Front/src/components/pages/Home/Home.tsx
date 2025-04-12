import {FC, useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {Box} from "@mui/material";
import {AxiosResponse} from "axios";
import axiosService from "../../../services/AxiosService";
import {OfferCard} from "../../organisms";
import {Pagination} from "../../../typings/Pagination";
import {Offer} from "../../../typings/Offer";

const Home: FC = () =>
{
    const [offers, setOffers] = useState<Offer[]>([])

    const theme = useTheme();

    const handleLastOffers = async () => {
        const response: AxiosResponse = await axiosService.get("offers", {params: {page: 1, nb_per_page: 4}});
        setOffers(response.data.list);
    };

    // Appeler handleOffers une fois au montage du composant
    useEffect(() => {
        handleLastOffers();
    }, []);

    return (
        <>
            <Box display={'flex'} alignItems={'center'} marginTop={'16px'}>
                <div style={{flex: '1'}}>
                    <h2 style={{
                        color:         theme.palette.primary.main,
                        fontSize:      '32px',
                        textTransform: 'uppercase',
                        fontWeight:    800
                    }}>
                        Donne et échange tes objets près de chez toi
                    </h2>
                    <p style={{ fontSize: '18px', color: theme.palette.custom.textColor }}>
                        Troc ton Objet, une plateforme communautaire de dons et d’échanges d'objets français !
                    </p>
                </div>
                <img src="/Images/home.svg" alt="Image d'habillage de la home" style={{flex: '1'}}/>
            </Box>

            <div style={{ backgroundColor: theme.palette.primary.main, padding: '24px', marginTop: '48px' }}>
                <h2 style={{ textAlign: 'center' }}>Le troc comme tu ne l’a jamais connu !</h2>

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

            <div style={{color: theme.palette.primary.main, marginTop: '48px'}}>
                <h3>Liste des dernières annonces</h3>
                <Box display={'flex'} justifyContent={'space-between'}>
                    {offers.map((offer: Offer) => (
                        <OfferCard offer={offer} key={offer.id}/>
                    ))}
                </Box>
            </div>
        </>
    )
}

export default Home;