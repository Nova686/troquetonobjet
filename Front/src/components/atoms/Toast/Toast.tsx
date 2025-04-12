import {Snackbar} from "@mui/material";
import { FC } from "react";
import { CustomToastProps } from "../../../typings/components/CustomToastProps";
import {useTheme} from "@mui/material/styles"

interface ToastProps extends CustomToastProps {
    onClose: () => void;
}

const Toast: FC<ToastProps> = ({ message, position, onClose, closeTime, ...other }: ToastProps) => {
    const theme = useTheme();

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
                backgroundColor: theme.palette.secondary.main,
                '& .MuiSnackbarContent-root': {
                    backgroundColor: theme.palette.secondary.main,
                },
            }}
        />
    );
};

export default Toast;
