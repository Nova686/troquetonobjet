import { FC } from 'react';
import {Button} from "../../atoms"
import { useTheme } from '@mui/material/styles';
import axiosService from "../../../services/AxiosService";

interface DeleteButtonProps {
    url: string;
    callable?: () => void
}

const DeleteButton: FC<DeleteButtonProps> = ({ url, callable }) => {
    const theme = useTheme();

    const toggleFavorite = () => {
        axiosService.delete(url).then(() => {
            if (callable) {
                callable();
            }
        });
    };

    return (
        <Button
            onClick={toggleFavorite}
            sx={{ backgroundColor: theme.palette.custom.danger, color:"white"}}
        >
            Suppression
        </Button>
    );
};

export default DeleteButton;
