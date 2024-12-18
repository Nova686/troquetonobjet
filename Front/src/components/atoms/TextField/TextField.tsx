import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import {FC} from "react";

const CustomTextField: FC<TextFieldProps> = ({...other}) => {
    return <MuiTextField {...other} />;
};

export default CustomTextField;