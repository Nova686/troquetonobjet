import { Container } from "@mui/material";
import { Button, TextField, Typography } from "../../atoms";
import { ChangeEvent, useState } from "react";
import { LoginRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxioService";


const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = async (e: React.FormEvent)  => {
        e.preventDefault();
        
        const data: LoginRequestModel = {
            email: email,
            password: password
        }

        try {
            const response = await axiosService.post("/login", data);
        } catch(error) {
            setErrors('Une erreur à été retournée, veuillez-rééssayer.');
        }    
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h5" gutterBottom>
                Connexion
            </Typography>
            <form onSubmit={handleSubmit}>
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
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Se connecter
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

export default LoginForm;