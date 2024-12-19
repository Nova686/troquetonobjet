import { Link } from "react-router-dom";
import { LoginForm } from "../../molecules"

const Login : React.FC = () => {
    return (<>
        <LoginForm />
        <Link to="/auth?type=r"><h3>Créer un compte</h3></Link>
    </>)
}

export default Login;