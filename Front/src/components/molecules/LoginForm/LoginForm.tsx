import { Box, CircularProgress, Container } from "@mui/material";
import { Button, TextField, Typography } from "../../atoms";
import { ChangeEvent, FC, useState } from "react";
import { LoginRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxiosService";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "@mui/material/styles";
import axios, { AxiosError } from "axios";


const LoginForm: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState('');
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const theme = useTheme();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const data: LoginRequestModel = {
			email: email,
			password: password
		}

		try {
			const response = await axiosService.post("/login", data);
			const reponseData = response?.data;
			if (reponseData?.user == null || reponseData?.user == null)
				throw new Error();

			login(reponseData.user, reponseData.token, () => {
				window.location.href = '/profile';
			});
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				setErrors('L\'email ou le mot de passe est incorrect');
			} else {
				setErrors('Une erreur à été retournée, veuillez-rééssayer.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="sm" style={{ marginTop: '50px' }}>
			<Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
				Connexion
			</Typography>
			<form onSubmit={handleSubmit}>
				<Box display="flex" flexDirection="column" alignItems='center'>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						type="email"
						value={email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
						required
						disabled={loading}
					/>

					<TextField
						label="Mot de passe"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						value={password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
						required
						disabled={loading}
					/>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						loading={loading}
						sx={{ marginTop: '20px', textTransform: 'none', width: 'fit-content', padding: '6px 4rem' }}
					>
						<Typography variant="h6" sx={{ fontWeight: 'bold' }}>Connecte-toi</Typography>
					</Button>
					{!!errors && (
						<Typography variant="body1" type={'error'} style={{ marginTop: '16px' }}>
							{errors}
						</Typography>
					)}
				</Box>
			</form>
		</Container>
	)
}

export default LoginForm;