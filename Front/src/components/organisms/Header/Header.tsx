import { Link } from "react-router-dom";

const Header: React.FC = () => {

    return (
        <>
            <nav className="main-navbar">
                <ul>
                    <li><Link to="/"><h3>Accueil</h3></Link></li>
                    <li><Link to="/form"><h3>Formulaire</h3></Link></li>
                </ul>
                <div className="header-auth-buttons">
                    <Link to="/auth?type=s"><h3>Se connecter</h3></Link>
                    <h3>/</h3>
                    <Link to="/auth?type=r"><h3>Créer un compte</h3></Link>
                </div>
            </nav>
        </>
    );
}

export default Header;
