import {Card, CardContent, CardMedia, SxProps, Theme} from "@mui/material";
import {Typography} from "../index";
import {FC, ReactNode} from "react";
import {styled} from "@mui/system";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import "./CardWithPictureWithoutAction.css";

interface CustomCardProps {
    title?: string | ReactNode;
    description?: string | ReactNode;
    altPicture?: string;
    pictureStyle?: SxProps<Theme>;
    cardContentStyle?: SxProps<Theme>;

    [key: string]: any;
}

const CardWithPictureWithoutAction: FC<CustomCardProps> = ({
                                                               altPicture,
                                                               title,
                                                               description,
                                                               pictureStyle,
                                                               picture,
                                                               cardContentStyle,
                                                               ...other
                                                           }) => {
    const StyledCard = styled(Card)({
        display: "flex",
        flexDirection: "column",
    });

    return (
        <StyledCard {...other}>
            <Typography component={'div'} sx={{ height: '280px', backgroundColor: '#00000035', ...pictureStyle }}>
                {picture ? 
                    <CardMedia
                        sx={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            ...pictureStyle,
                        }}
                        component="img"
                        image={picture}
                        alt={altPicture}
                    />
                :
                    <div style={{  height: '280px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ padding: '12px', border: '5px solid #00000010', borderRadius: '100%' }}>
                            <NoPhotographyIcon style={{ color: '#00000010', fontSize: '72px' }} />
                        </div>
                    </div>
                }
            </Typography>
            <CardContent sx={{flexGrow: 1, height: "100%", ...cardContentStyle}} className={"card-body"}>
                <Typography component={'div'} sx={{height: "100%"}}>
                    {title && <Typography variant="h6" sx={{height: "100%"}}>{title}</Typography>}
                    {description && <Typography variant="body2">{description}</Typography>}
                </Typography>
            </CardContent>
        </StyledCard>
    );
};

export default CardWithPictureWithoutAction;
