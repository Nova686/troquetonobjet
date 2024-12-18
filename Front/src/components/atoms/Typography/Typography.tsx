import {FC} from "react";
import { Typography as MuiTypography, TypographyProps } from "@mui/material";

const Typography: FC<TypographyProps> = ({...other}) => {
    return <MuiTypography {...other} />;
};

export default Typography;