import { Button, Container } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TextField, Typography } from "../../atoms";
import { RegisterRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxioService";

const RegisterForm : React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

    const validateForm = (): boolean => {
        const isConfirmPasswordErr = validateConfirmPassword();

        return isConfirmPasswordErr;
    }

    const validateConfirmPassword = (): boolean => {
        const arePasswordsIdentical = password === confirmPassword;
        setConfirmPasswordErr(arePasswordsIdentical ? '' : "La confirmation doit être identique au mot de passe");

        return arePasswordsIdentical;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm())
            return;

        const data: RegisterRequestModel = {
            name,
            email,
            password
        }

        try {
            const response = await axiosService.post("/register", data);
            console.log("response");
        } catch(error) {
            console.error(error)
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
                />

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Créer mon compte
                </Button>
            </form>
        </Container>
    )
}

export default RegisterForm;