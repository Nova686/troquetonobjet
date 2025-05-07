import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Offer} from "../../../typings/Offer";
import axiosService from "../../../services/AxiosService";
import {AxiosResponse} from "axios";
import {Typography} from "../../atoms";
import {FavoriteButton} from "../../molecules";
import {useTheme} from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {dateFormat} from "../../../services/FormatterService";
import { Box } from "@mui/material";

const DetailOffer: FC = () =>
{
    const {id} = useParams();
    const [offer, setOffer] = useState<Offer | null>(null);
    const theme = useTheme();

    const handleOffer: () => Promise<void> = async (): Promise<void> => {
        const response: AxiosResponse<any, any> = await axiosService.get(`offers/${id}`)
        setOffer(response.data);
    }

    useEffect((): void => {
        handleOffer();
    }, []);

    if (!offer) {
        return <div>Chargement...</div>
    }
    return (
        <div style={{display: "flex"}}>
            <div style={{width: "70%", display: "flex", gap: "8px", flexDirection: "column"}}>
                <div>
                    <img src={ offer.mainImage } alt="" style={{ maxWidth: '30%', maxHeight: 400 }} />
                    {offer.images.map(image => 
                        <img src={image} alt="" style={{ maxWidth: '30%', maxHeight: 400 }} />
                    )}
                </div>
                <Box display="flex" justifyContent="space-between" alignItems="center" color={theme.palette.primary.main}>
                    <Typography component={"span"} sx={{
                        fontSize:   "28px",
                        fontWeight: "bold"
                    }}>
                        {offer.title}
                    </Typography>
                    <FavoriteButton offerId={offer.id} defaultFilled={offer.isFavorite}/>
                </Box>
                <Typography sx={{
                    display:    'flex',
                    fontSize:   '12px',
                    alignItems: "center",
                    color:      theme.palette.secondary.main
                }}>
                    <CalendarMonthIcon/>Le {dateFormat(offer.createdAt)}
                </Typography>
                <Typography component={"span"} sx={{fontSize: "18px", color: theme.palette.primary.main}}>
                    {offer.description}
                </Typography>
            </div>
            <div style={{width: "30%"}}>
                <div style={{display: "flex"}}>
                    <div style={{width: "50%"}}></div>
                    <div style={{width: "50%"}}>
                        <Typography sx={{fontSize: "28px", color: theme.palette.primary.main}}>{offer.author.username}</Typography>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DetailOffer;