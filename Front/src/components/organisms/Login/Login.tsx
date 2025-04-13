import {LoginForm} from "../../molecules"
import {LinkButton} from "../../atoms";
import {Box} from "@mui/material";
import {FC} from "react";
import {useTheme} from "@mui/material/styles";

const Login: FC = () => {
    const theme = useTheme();

    return (<>
		<div style={{border: '3px solid #0005', borderRadius: '5px', padding: '1rem 1rem 3rem 1rem'}}>
			<LoginForm/>
			<Box display="flex" justifyContent="center">
				<LinkButton to="/auth/register" color="secondary" variant="outlined" size="small"
							style={{padding: '0.5rem 1rem', marginTop: '1rem', width: '25%', backgroundColor: theme.palette.secondary.main}}>
					Créer un compte
				</LinkButton>
			</Box>
		</div>
    </>)
}

export default Login;