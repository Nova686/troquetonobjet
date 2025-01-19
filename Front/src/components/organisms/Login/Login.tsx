import { LoginForm } from "../../molecules"
import { LinkButton } from "../../atoms";
import { Box } from "@mui/material";

const Login : React.FC = () => {
    return (<>
        <LoginForm />
		<Box display="flex" justifyContent="center">
        	<LinkButton to="/auth?type=r" color="secondary" variant="outlined" size="small" style={{padding: '0.5rem 1rem', marginTop: '1rem', width: '25%'}}>Créer un compte</LinkButton>
    	</Box>
    </>)
}

export default Login;