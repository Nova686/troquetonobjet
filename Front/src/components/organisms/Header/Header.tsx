import {Link} from "react-router-dom";
import {FC, useState, MouseEvent} from "react";
import {useAuth} from "../../../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Box, Button, Menu, MenuItem} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useTheme} from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import {CreateOfferButton} from "../../molecules";
import {PermIdentityOutlined} from "@mui/icons-material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Header: FC = () =>
{
    const {isConnected, user} = useAuth();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="container main-navbar" style={{backgroundColor: theme.palette.background.default}}>
            <nav style={{
                backgroundColor: theme.palette.background.default,
                borderBottom:    `1px solid ${theme.palette.primary.main}`
            }}>
                <Box display={'flex'} alignItems='center' justifyContent={'space-between'} width={'40%'}
                     flexWrap={'wrap'}>
                    <Link to={'/'}>
                        <img src="/Images/logo.svg" width="175" alt="logo"
                             style={{paddingTop: "12px", paddingBottom: "12px"}}/>
                    </Link>
                    <Box className="create-offer">
                        <CreateOfferButton/>
                    </Box>
                </Box>
                <Box display='flex' flexDirection="row" alignItems='end' gap='32px' flexWrap='wrap' paddingBottom="8px">
                    {!isConnected() ?
                        <Link to="/auth/login">
                            <Box display='flex' alignItems='center' flexDirection={"column"}
                                 color={theme.palette.custom.textColor}>
                                <PermIdentityOutlined sx={{color: theme.palette.primary.main}}/>
                                Se connecter
                            </Box>
                        </Link>
                        : (
                            <>
                                {user?.is_admin && (
                                    <>
                                        <Button
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            sx={{color: theme.palette.custom.textColor, fontSize: 16, padding: 0}}
                                        >
                                            <Box display='flex' alignItems='center' flexDirection={"column"}>
                                                <AdminPanelSettingsIcon sx={{color: theme.palette.primary.main, fontSize: 42}} />
                                                Administration
                                            </Box>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{'aria-labelledby': 'basic-button'}}
                                        >
                                            <MenuItem><Link to="/admin/users">Utilisateurs</Link></MenuItem>
                                            <MenuItem><Link to="">Annonces</Link></MenuItem>
                                            <MenuItem><Link to="/admin/categories">Catégories</Link></MenuItem>
                                        </Menu>
                                    </>
                                )}

                                <Link to="/offers">
                                    <Box display='flex' alignItems='center' flexDirection={"column"}
                                         color={theme.palette.custom.textColor}>
                                        <img src="/icons/offers.svg" width="48" alt="logo des annonces" />
                                        Les annonces
                                    </Box>
                                </Link>
                                <Link to="/conversations">
                                    <Box display='flex' alignItems='center' flexDirection={"column"}
                                         color={theme.palette.custom.textColor}>
                                        <MessageOutlinedIcon sx={{color: theme.palette.primary.main, fontSize: 42}}/>
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
                                                            sx={{color: theme.palette.secondary.main, fontSize: 42}}/>
                                        <FavoriteIcon className={'full-favorite-icon'}
                                                      sx={{color: theme.palette.secondary.main, display: 'none', fontSize: 42}}/>
                                        Mes favoris
                                    </Box>
                                </Link>

                                <Link to="/profile">
                                    <Box display='flex' alignItems='center' flexDirection={"column"}
                                         color={theme.palette.custom.textColor}>
                                        <AccountCircleIcon sx={{fontSize: 42}}/>
                                        Mon compte
                                    </Box>
                                </Link>
                            </>
                        )}
                </Box>
            </nav>
        </div>
    );
}

export default Header;
