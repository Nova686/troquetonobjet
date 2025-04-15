import { Link } from "react-router-dom";
import { FC } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useTheme} from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import {CreateOfferButton} from "../../molecules";
import { PermIdentityOutlined } from "@mui/icons-material";

const Header: FC = () => {
	const { isConnected, user } = useAuth();
    const theme = useTheme();

    return (
        <nav className="main-navbar" style={{backgroundColor: theme.palette.background.default, borderBottom: `1px solid ${theme.palette.primary.main}`}}>
            <Box display={'flex'} alignItems='center' justifyContent={'space-between'} width={'40%'} flexWrap={'wrap'}>
                <Link to={'/'}>
                    <img src="/Images/logo.svg" width="175" alt="logo"/>
                </Link>
                <CreateOfferButton/>
            </Box>
            <Box display={'flex'} flexDirection={"row"} alignItems='center' gap={'32px'} flexWrap={'wrap'}>
                {!isConnected() ?
                    <Link to="/auth/login">
                        <Box display='flex' alignItems='center' flexDirection={"column"} color={theme.palette.custom.textColor}>
                            <PermIdentityOutlined sx={{color: theme.palette.primary.main}}/>
                            Se connecter
                        </Box>
                    </Link>
                : (
                    <>
                        <Link to="/conversations">
                            <Box display='flex' alignItems='center' flexDirection={"column"}
                                color={theme.palette.custom.textColor}>
                                <MessageOutlinedIcon sx={{color: theme.palette.primary.main}}/>
                                Messages
                            </Box>
                        </Link>
                        <Link to={'/favorite'}>
                            <Box display={'flex'} flexDirection={"column"} alignItems='center'
                                color={theme.palette.custom.textColor}
                                sx={{
                                    '&:hover .filled-favorite-icon': {
                                        display: 'none'
                                    },
                                    '&:hover .full-favorite-icon':   {
                                        display: 'block'
                                    }
                                }}>
                                <FavoriteBorderIcon className={'filled-favorite-icon'}
                                                    sx={{color: theme.palette.secondary.main}}/>
                                <FavoriteIcon className={'full-favorite-icon'}
                                            sx={{color: theme.palette.secondary.main, display: 'none'}}/>
                                Mes favoris
                            </Box>
                        </Link>

                        <Link to="/profile">
                            <Box display='flex' alignItems='center' flexDirection={"column"}
                                color={theme.palette.custom.textColor}>
                                <AccountCircleIcon/>
                                Mon compte
                            </Box>
                        </Link>
                    </>
                )}
            </Box>
        </nav>
    );
}

export default Header;
