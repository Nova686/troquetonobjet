import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Offer} from "../../../typings/Offer";
import axiosService from "../../../services/AxiosService";
import {AxiosResponse} from "axios";
import {Avatar, Button, Typography} from "../../atoms";
import {DeleteButton, FavoriteButton} from "../../molecules";
import {useTheme} from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {dateFormat} from "../../../services/FormatterService";
import { Box } from "@mui/material";
import MapView from "../../atoms/MapView/MapView";
import ChatIcon from "@mui/icons-material/Chat";
import { useAuth } from "../../../contexts/AuthContext";


const DetailOffer: FC = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [offer, setOffer] = useState<Offer | null>(null);
    const [avatarIndex, setAvatarIndex] = useState<number | null>(null);
    const theme = useTheme();

    const handleOffer: () => Promise<void> = async (): Promise<void> => {
        const response: AxiosResponse<any, any> = await axiosService.get(`offers/${id}`);
        setOffer(response.data);
        if (response.data.author.avatar) {
            setAvatarIndex(response.data.author.avatar);
        }
    }

    const createConversation = () => {
        axiosService.post(`/offers/${offer?.id}/conversation`).then((res) => {
            window.location.href = `/conversations/${res.data.conversation.id}`;
        });
    }

    useEffect((): void => {
        handleOffer();
    }, []);

    if (!offer) {
        return <div>Chargement...</div>
    }
    return (
        <div style={{display: "flex", gap: 8, marginBottom: 32 }}>
            <div style={{width: "70%", display: "flex", gap: "8px", flexDirection: "column"}}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <img src={ offer.mainImage } alt="" style={{ maxWidth: '33%', maxHeight: 350 }} />
                    {offer.images.map((image, index) => {
                        return (index < 2 ? 
                            <div style={{ width: '33%' }}>
                                <img src={image} alt="" style={{ width: '100%', maxHeight: index === 1 && offer.images.length > 1 ? 300 : 350 }} />
                                {index === 1 && offer.images.length > 1 &&
                                    <div style={{ height: 45, display: "flex", alignItems: 'end' }}>
                                        <Button variant="contained" color="primary" sx={{ width: '100%' }}>
                                            Plus de photos
                                        </Button>
                                    </div>
                                }
                            </div>
                            : <></>
                        )
                    })}
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
                    <CalendarMonthIcon sx={{ marginRight: 1 }}/>Le {dateFormat(offer.createdAt)}
                </Typography>
                <Typography component={"span"} sx={{fontSize: "16px", color: theme.palette.primary.main}}>
                    {offer.description}
                </Typography>
                {offer.wishs.length > 0 &&
                    <>
                        <Typography component={"span"} sx={{fontSize: "20px", color: theme.palette.secondary.main, marginTop: 4}}>
                            Cet utilisateur aimerais en retour l'un des éléments suivant :
                        </Typography>
                        <ul>
                            {offer.wishs.map(wish => 
                                <Typography component="li" sx={{color: theme.palette.primary.main}}>
                                    { wish.text }
                                </Typography>
                            )}
                        </ul>
                    </>
                }
            </div>
            <div style={{width: "30%"}}>
                <div style={{ display: "flex", marginBottom: 32 }}>
                    <Avatar size={"128px"} avatarIndex={avatarIndex} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 8 }}>
                        <div>
                            <Typography sx={{fontSize: "20px", fontWeight: 'bold', color: theme.palette.primary.main}}>{offer.author.username}</Typography>
                            <Typography sx={{fontSize: "16px", color: theme.palette.primary.main, marginTop: 1}}>{offer.cityName}</Typography>
                        </div>
                        {user?.id !== offer.author.id ?
                            <Button variant="contained" color="primary" onClick={createConversation}>
                                <ChatIcon sx={{ fontSize: '18px', marginRight: 1 }} />
                                Envoyer un message
                            </Button>
                            :
                            <Button variant="contained" color="primary" sx={{ marginRight: 4 }} onClick={() => navigate(`/offers/${offer.id}/edit`)}>
                                Modifier
                            </Button>
                        }
                    </div>
                </div>
                <MapView latitude={offer.latitude} longitude={offer.longitude} style={{ height: "200px", width: "100%", zIndex: 0 }}/>
                {user?.is_admin &&
                    <div style={{ display: "flex", justifyContent: 'end', marginTop: 16 }}>
                        <DeleteButton url={`/offers/${offer.id}`} callable={() => navigate('/offers')} />
                    </div>
                }
            </div>
        </div>
    );

}

export default DetailOffer;