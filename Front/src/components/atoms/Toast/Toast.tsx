import {Snackbar} from "@mui/material";
import {useState} from "react";

const Toast = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={show}
            onClose={handleClose}
            message="I love snacks"
            key={'top' + 'right'}
        />
    )
}

export default Toast;