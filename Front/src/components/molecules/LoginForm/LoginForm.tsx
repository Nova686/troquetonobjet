import { Container } from "@mui/material";
import { Button, TextField, Typography } from "../../atoms";
import { useState } from "react";

interface LoginFormProps {
    formSubmitCallback: (email: string, password: string) => Promise<any>
}

const LoginForm: React.FC<LoginFormProps> = ({formSubmitCallback}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        formSubmitCallback(email, password);
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <TextField
                    label="Mot de passe"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            </form>
        </Container>
    )
}

export default LoginForm;