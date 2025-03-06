import { FC, useState, MouseEvent } from 'react';
import {Button} from "../../atoms"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Coeur vide
import FavoriteIcon from '@mui/icons-material/Favorite'; // Coeur plein
import { useTheme } from '@mui/material/styles';
import axiosService from "../../../services/AxiosService";
import {AxiosResponse} from "axios";

interface FavoriteButtonProps {
    defaultFilled?: boolean;
    offerId: number;
    [key: string]: any;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ defaultFilled = false, offerId, ...other }) => {
    const theme = useTheme();
    const [isFilled, setIsFilled] = useState(defaultFilled);

    const toggleFavorite = async (e: MouseEvent) => {
        e.stopPropagation();

        console.log('Ajout des favoris', offerId)

        const response: AxiosResponse = await axiosService.post(`/offers/${offerId}/favorite`);
        console.log(response)


        setIsFilled(!isFilled);
    };

    return (
        <Button
            onClick={toggleFavorite}
            {...other}
            sx={{ color: theme.palette.secondary.main }}
        >
            {isFilled ? (
                // S'il est favori alors on affiche un coeur en entier
                <FavoriteIcon sx={{ color: theme.palette.secondary.main, fontSize: '25px'}} />
            ) : (
                // Sinon, que les bordures
                <FavoriteBorderIcon sx={{ color: theme.palette.secondary.main, fontSize: '25px'}} />
            )}
        </Button>
    );
};

export default FavoriteButton;
