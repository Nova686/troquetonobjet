import { Box, CircularProgress, Container } from "@mui/material";
import { Button, TextField, Typography } from "../../atoms";
import { ChangeEvent, FC, useState } from "react";
import { LoginRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxiosService";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";


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
				window.location.href = "/";
			});
		} catch (error) {
			setErrors('Une erreur à été retournée, veuillez-rééssayer.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth="md" style={{ marginTop: '32px', marginBottom: '64px' }}>
			<div style={{ marginBottom: '48px' }}>
				<div style={{
					color: theme.palette.primary.main,
					fontSize: '32px',
					textTransform: 'uppercase',
					fontWeight: 800
				}}>
					Connecte-toi
				</div>
				<div style={{
					color: theme.palette.primary.main,
					fontSize: '32px',
					textTransform: 'uppercase',
					fontWeight: 800
				}}>
					ou Crée ton compte Troc ton Objet
				</div>
			</div>
			<Box display={'flex'} gap={8}>
				<form onSubmit={handleSubmit} style={{ width: '80%' }}>
					<Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
						Connecte-toi pour mettre une annonce !
					</Typography>
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
					<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', marginTop: '16px' }}>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							sx={{ minWidth: '200px' }}
							disabled={loading}
						>
							{loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
						</Button>
					</div>
					<span style={{ color: "white" }}>
						Tu n'as pas encore de compte ?
						<Link to="/auth/register">
							<span style={{ color: theme.palette.primary.main, marginLeft: '4px' }}>
								Crée le ici
							</span>
						</Link>
					</span>
					{!!errors && (
						<Typography variant="body1" type={'error'} style={{ marginTop: '16px' }}>
							{errors}
						</Typography>
					)}
				</form>
				<div style={{ width: '20%', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'end', justifyContent: 'center' }}>
					<img src="/Images/logo_part_square.svg" width="125" alt="square" />
					<img src="/Images/logo_part_circle.svg" width="125" alt="circle" />
				</div>
			</Box>
		</Container>
	)
}

export default LoginForm;