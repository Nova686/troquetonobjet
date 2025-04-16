import { FC, useState, MouseEvent } from 'react';
import {Button} from "../../atoms"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Coeur vide
import FavoriteIcon from '@mui/icons-material/Favorite'; // Coeur plein
import { useTheme } from '@mui/material/styles';
import axiosService from "../../../services/AxiosService";
import {AxiosResponse} from "axios";
import {useToast} from "../../../contexts/ToastContext";

interface FavoriteButtonProps {
    defaultFilled?: boolean;
    offerId: number;
    [key: string]: any;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ defaultFilled = false, offerId, ...other }) => {
    const theme = useTheme();
    const [isFilled, setIsFilled] = useState(defaultFilled);
    const { showToast } = useToast();

    const toggleFavorite = async (e: MouseEvent) => {
        e.stopPropagation();

        console.log('Ajout des favoris', offerId)

        const response: AxiosResponse = await axiosService.post(`/offers/${offerId}/favorite`);

        showToast({
            message: !isFilled ? "L'annonce à été ajoutée aux favoris." : "L'annonce à été retirée des favoris.",
            position: { vertical: "bottom", horizontal: "right" },
        });
        setIsFilled(!isFilled);
    };

    return (
        <Button
            onClick={toggleFavorite}
            {...other}
            sx={{
                color: theme.palette.secondary.main,
                '&:hover .filled-favorite-icon': {
                    display: 'none'
                },
                '&:hover .full-favorite-icon':   {
                    display: 'block'
                }
        }}
        >
            {isFilled ? (
                // S'il est favori alors on affiche un coeur en entier
                <FavoriteIcon sx={{ color: theme.palette.secondary.main, fontSize: '25px'}} />
            ) : (
                // Sinon, que les bordures
                <>
                    <FavoriteBorderIcon className={'filled-favorite-icon'}
                                        sx={{color: theme.palette.secondary.main, fontSize: '25px'}}/>
                    <FavoriteIcon className={'full-favorite-icon'}
                                  sx={{color: theme.palette.secondary.main, fontSize: '25px', display: 'none'}}/>
                </>
            )}
        </Button>
    );
};

export default FavoriteButton;
