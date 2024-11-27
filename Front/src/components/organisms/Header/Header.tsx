import { Link } from "react-router-dom";

const Header: React.FC = () => {

    return (
        <>
            <nav className="main-navbar">
                <ul>
                    <li><Link to="/"><h3>Accueil</h3></Link></li>
                    <li><Link to="/form"><h3>Formulaire</h3></Link></li>
                </ul>
            </nav>
        </>
    );
}

export default Header;
