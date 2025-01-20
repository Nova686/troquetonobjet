import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";
import { FC } from "react";

const Header: FC = () => {
	const { isConnected, user } = useAuth();

    return (
        <>
            <nav className="main-navbar">
                <ul>
                    <li><Link to="/"><h3>Accueil</h3></Link></li>
                    <li><Link to="/form"><h3>Formulaire</h3></Link></li>
                </ul>
				{!isConnected() ?
					<div className="header-auth-buttons">
						<Link to="/auth/login"><h3>Connexion</h3></Link>
					</div>
				:
				
					<Link to="/profile">
						<Box display='flex' alignItems='center'>
							<AccountCircleIcon style={{marginRight: '0.5rem'}}/>
							<h3>Bienvenue, {user?.name}</h3>
						</Box>
					</Link>
				}
            </nav>
        </>
    );
}

export default Header;
