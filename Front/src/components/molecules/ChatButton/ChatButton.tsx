import {FC} from 'react';
import {Button} from "../../atoms"
import { useTheme } from '@mui/material/styles';
import {ButtonProps} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const ChatButton: FC<ButtonProps> = () => {
    const theme = useTheme();

    const toggleChat = () => {};

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
