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

const DetailOffer: FC = () =>
{
    const {id} = useParams();
    const [offer, setOffer] = useState<Offer | null>(null);
    const theme = useTheme();

    const handleOffer: () => Promise<void> = async (): Promise<void> =>
    {
        const response: AxiosResponse<any, any> = await axiosService.get(`offers/${id}`)
        setOffer(response.data);
    }

    useEffect((): void =>
    {
        handleOffer();
    }, []);

    return (
        !offer ? null :
            <Typography component={"div"} sx={{display: "flex"}}>
                <Typography component={"div"} sx={{width: "70%", display: "flex", gap: "8px", flexDirection: "column"}}>
                    <Typography component={"div"} sx={{
                        display:        "flex",
                        justifyContent: "space-between",
                        alignItems:     "center",
                        color:          theme.palette.primary.main
                    }}>
                        <Typography component={"span"} sx={{
                            fontSize:   "28px",
                            fontWeight: "bold"
                        }}>{offer.title}</Typography>
                        <FavoriteButton offerId={offer.id} defaultFilled={offer.isFavorite}/>
                    </Typography>
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
                </Typography>
                <Typography component={"div"} sx={{width: "30%"}}>
                    <Typography component={"div"} sx={{display: "flex"}}>
                        <Typography component={"div"} sx={{width: "50%"}}></Typography>
                        <Typography component={"div"} sx={{width: "50%"}}>
                            <Typography sx={{fontSize: "28px", color: theme.palette.primary.main}}>{offer.author.username}</Typography>
                        </Typography>
                    </Typography>
                </Typography>
            </Typography>
    );

}

export default DetailOffer;