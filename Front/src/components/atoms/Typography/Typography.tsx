import {FC} from "react";
import { Typography as MuiTypography, TypographyProps } from "@mui/material";

const CustomTypography: FC<TypographyProps> = ({...other}) => {
    return <MuiTypography {...other} />;
};

export default CustomTypography;