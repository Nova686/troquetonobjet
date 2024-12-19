import {CardWithPictureWithoutAction} from "../../atoms";
import {Typography} from "@mui/material";
import formatDate from "../../../utils/dateHelper";
import {Offer} from "../../../typings/Offer";
import {FC} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface OfferCardProps {
    offer: Offer;
}

const OfferCard : FC<OfferCardProps> = ({offer}) => {

    const detail = (offer : Offer) => {
        return (
            <Typography variant={'body1'} component={'div'}>
                <Typography variant={'h5'}>{offer.title}</Typography>
                <Typography sx={{display: 'flex', gap: '8px'}}><CalendarMonthIcon/>{formatDate(offer.createdAt)}</Typography>
                <Typography sx={{display: 'flex', gap: '8px'}}><LocationOnIcon/>{offer.cityName}</Typography>
                <Typography sx={{display: 'flex', gap: '8px'}}><AccountCircleIcon/>{offer.author.name}</Typography>
            </Typography>
        )
    }

    return (
        <>
            <CardWithPictureWithoutAction sx={{ backgroundColor: '#F2DC6B', padding: '4px', borderRadius: '8px' }}
                cardSize={{width: 300, height: 500}} pictureHeight={385} cardContentStyle={{padding: '0'}}
                title={detail(offer)} pictureStyle={{borderRadius : '8px', borderBottomRightRadius: '0'}}
            />
        </>
    )
}

export default OfferCard;