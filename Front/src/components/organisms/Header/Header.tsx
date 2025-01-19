import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";

const Header: React.FC = () => {
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
						<Link to="/auth?type=s"><h3>Se connecter</h3></Link>
						<h3>/</h3>
						<Link to="/auth?type=r"><h3>Créer un compte</h3></Link>
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
