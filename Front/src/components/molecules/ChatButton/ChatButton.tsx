import {FC, MouseEvent} from 'react';
import {Button} from "../../atoms"
import { useTheme } from '@mui/material/styles';
import {ButtonProps} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import {AxiosResponse} from "axios";
import axiosService from "../../../services/AxiosService";
import {redirect} from "react-router-dom";

interface ChatButtonProps extends ButtonProps {
    offerId: number;
}

const ChatButton: FC<ChatButtonProps> = ({offerId}: ChatButtonProps) => {
    const theme = useTheme();

    const toggleChat = async (e: MouseEvent) => {
        e.stopPropagation();

        const response: AxiosResponse = await axiosService.post(`/offers/${offerId}/conversation`);

        if (response.status === 200) {
            window.location.href = `/conversations/${response.data.conversation.id}`;
        }
    };

    return (
        <Button
            onClick={toggleChat}
            sx={{ color: theme.palette.primary.main }}
        >
            <ChatIcon sx={{fontSize: '25px'}} />
        </Button>
    );
};

export default ChatButton;
