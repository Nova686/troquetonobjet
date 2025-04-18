import {Snackbar} from "@mui/material";
import { FC } from "react";
import { CustomToastProps } from "../../../typings/components/CustomToastProps";
import {useTheme} from "@mui/material/styles"

interface ToastProps extends CustomToastProps {
    onClose: () => void;
}

const Toast: FC<ToastProps> = ({ message, position, onClose, closeTime, type, ...other }: ToastProps) => {
    const theme = useTheme();
	const backgroundColor = type == 'error' ? theme.palette.secondary.main : type == 'success' ? theme.palette.success.main : theme.palette.secondary.main;

    return (
        <Snackbar
            anchorOrigin={{ vertical: position.vertical, horizontal: position.horizontal }}
            open={true}
            onClose={onClose}
            message={message}
            autoHideDuration={closeTime ?? 2000}
            {...other}
            className={"toast"}
            sx={{
                backgroundColor: backgroundColor,
                '& .MuiSnackbarContent-root': {
                    backgroundColor: backgroundColor,
                },
            }}
        />
    );
};

export default Toast;
