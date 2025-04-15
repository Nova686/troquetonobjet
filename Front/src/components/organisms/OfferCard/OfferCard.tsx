import {CardWithPictureWithoutAction} from "../../atoms";
import {Typography} from "@mui/material";
import {Offer} from "../../../typings/Offer";
import {FC} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useTheme} from '@mui/material/styles';
import {ChatButton, FavoriteButton} from "../../molecules";
import {useNavigate} from "react-router-dom";
import {dateFormat} from "../../../services/FormatterService";
import {useAuth} from "../../../contexts/AuthContext";

interface OfferCardProps {
    offer: Offer,
    key?: unknown
}

const OfferCard: FC<OfferCardProps> = ({offer, key}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {isConnected, user} = useAuth();

    const handleClick = (offer: Offer) => {
        if (user?.username === offer.author.username) {
            navigate('/offers/form', {state: {offer}});
        } else {
            navigate(`/offers/${offer.id}`)
        }
    }

    const detail = (offer: Offer) => {
        // TODO: attendre que le back renvoie l'auteur
        return (
            <Typography component={'div'} style={{display: 'flex', justifyContent: "space-between", height: "100%"}}>
                <Typography variant={'body1'} component={'div'} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{offer.title}</div>
                        <hr style={{ borderColor: theme.palette.background.default }} />
                        {offer.cityName &&
                            <Typography sx={{display: 'flex', gap: '8px' }}>
                                <LocationOnIcon/>{offer.cityName}
                            </Typography>
                        }
                        <Typography sx={{display: 'flex', gap: '8px'}}>
                            <AccountCircleIcon/>{offer?.author?.username}
                        </Typography>
                    </div>
                    <Typography sx={{display: 'flex', gap: '8px', fontSize: '12px', marginTop: '4px' }}>
                        <CalendarMonthIcon sx={{fontSize: '16px'}} />Le {dateFormat(offer.createdAt)}
                    </Typography>
                </Typography>
                <Typography variant={'body1'} component={'div'} style={{
                    backgroundColor: theme.palette.background.default, borderBottomRightRadius: '8px', padding: '2px 0',
                    display:         "flex", justifyContent: 'space-around', flexDirection: 'column', height: "100%"
                }}>
                    {isConnected() && (user?.username !== offer?.author?.username) &&
                        <>
                            <FavoriteButton offerId={offer.id} defaultFilled={offer.isFavorite}/>
                            <ChatButton/>
                        </>
                    }
                </Typography>
            </Typography>
        )
    }

    return (
        <CardWithPictureWithoutAction
            sx={{
                backgroundColor: theme.palette.primary.main,
                padding:         '4px',
                borderRadius:    '8px',
                cursor:          'pointer',
                height:          "100%"
            }}
            cardContentStyle={{padding: '0'}}
            title={detail(offer)}
            picture={offer.mainImage}
            pictureStyle={{borderTopLeftRadius: '8px', borderTopRightRadius: '8px'}}
            onClick={() => handleClick(offer)}
        />
    )
}

export default OfferCard;