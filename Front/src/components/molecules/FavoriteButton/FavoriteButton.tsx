import React, { useState } from 'react';
import {Button} from "../../atoms"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Coeur vide
import FavoriteIcon from '@mui/icons-material/Favorite'; // Coeur plein
import { useTheme } from '@mui/material/styles';

interface FavoriteButtonProps {
    defaultFilled?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ defaultFilled = false }) => {
    const theme = useTheme();
    const [isFilled, setIsFilled] = useState(defaultFilled);

    const toggleFavorite = () => {
        setIsFilled(!isFilled);
    };

    return (
        <Button
            onClick={toggleFavorite}
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
