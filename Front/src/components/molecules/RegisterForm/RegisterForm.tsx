import { Button, CircularProgress, Container } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TextField, Typography } from "../../atoms";
import { RegisterRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxiosService";
import { AxiosError } from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const RegisterForm: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [nameErr, setNameErr] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const [errors, setErrors] = useState('');
	const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	const validateForm = (): boolean => {
		const isPasswordValid = validatePassword();
		const isConfirmPasswordValid = validateConfirmPassword();

		return isConfirmPasswordValid && isPasswordValid;
	}

	const validatePassword = (): boolean => {
		const isPasswordValid = password.length >= 8;
		setPasswordErr(isPasswordValid ? "" : "Le texte mot de passe doit contenir au moins 8 caractères.")

		return isPasswordValid;
	}

	const validateConfirmPassword = (): boolean => {
		const arePasswordsIdentical = password === confirmPassword;
		setConfirmPasswordErr(arePasswordsIdentical ? "" : "La confirmation doit être identique au mot de passe");

		return arePasswordsIdentical;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		setNameErr("");
		setEmailErr("");
		setPasswordErr("");
		setErrors("");

		if (!validateForm())
			return;

		const data: RegisterRequestModel = {
			name,
			email,
			password
		}

		try {
			const response = await axiosService.post("/register", data);
			const reponseData = response?.data;
			if (reponseData?.user == null || reponseData?.user == null)
				throw new Error();

			login(reponseData.user, reponseData.token, () => {
				window.location.href = '/profile';
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				const aError = error.response?.data.errors ?? error.message;

				for (const key in aError) {
					switch (key) {
						case 'name':
							setNameErr(aError[key].join("<br />"));
							break;
						case 'email':
							setEmailErr(aError[key].join("<br />"));
							break;
						case 'password':
							setPasswordErr(aError[key].join("<br />"));
							break;
						default:
							setErrors('Une erreur à été retournée, veuillez-rééssayer.');
							break;
					}
				}
			} else {
				console.error('Erreur inconnue:', error);
				setErrors('Une erreur à été retournée, veuillez-rééssayer.');
			}
		} finally {
			setLoading(false);
		}
	};

	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setConfirmPassword(value);
		if (value === password && confirmPasswordErr !== "")
			setConfirmPasswordErr("");
	}

	return (
		<Container maxWidth="sm" style={{ marginTop: '50px' }}>
			<Typography variant="h5" gutterBottom>
				Créer mon compte
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Nom"
					variant="outlined"
					fullWidth
					margin="normal"
					type="text"
					value={name}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
					required
					errorText={nameErr}
					disabled={loading}
				/>

				<TextField
					label="Email"
					variant="outlined"
					fullWidth
					margin="normal"
					type="email"
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					required
					errorText={emailErr}
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
					errorText={passwordErr}
					disabled={loading}
				/>

				<TextField
					label="Confirmation du mot de passe"
					variant="outlined"
					fullWidth
					margin="normal"
					type="password"
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					required
					errorText={confirmPasswordErr}
					disabled={loading}
				/>

				<Button
					variant="contained"
					color="primary"
					type="submit"
					fullWidth
					style={{ marginTop: '20px' }}
					disabled={loading}
				>
					{loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
				</Button>
				{!!errors && (
					<Typography variant="body1" type={'error'} style={{ marginTop: '16px' }}>
						{errors}
					</Typography>
				)}
			</form>
		</Container>
	)
}

export default RegisterForm;