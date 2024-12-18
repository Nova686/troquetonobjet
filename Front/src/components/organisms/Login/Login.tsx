import { Link } from "react-router-dom";
import { LoginForm } from "../../molecules"
import { LoginRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/ApiServiceBase";

const Login : React.FC = () => {
    const sendLoginRequest = async (email: string, password: string) => {
        const data: LoginRequestModel = {
            email: email,
            password: password
        }

        try {
            const response = await axiosService.post("/login", data);
            console.log(response);
        } catch(error) {
            console.error(error)
        }
    }

    return (<>
        <LoginForm formSubmitCallback={sendLoginRequest} />
        <Link to="/auth?type=r"><h3>Créer un compte</h3></Link>
    </>)
}

export default Login;