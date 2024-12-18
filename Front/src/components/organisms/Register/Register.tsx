import { Link } from "react-router-dom";
import { RegisterForm } from "../../molecules"

const Register : React.FC = () => {
    return (<>
        <RegisterForm />
        <Link to="/auth?type=s"><h3>Me connecter</h3></Link>
    </>)
}

export default Register;