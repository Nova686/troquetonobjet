import { Box, Button, CircularProgress, Container } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { TextField, Typography } from "../../atoms";
import { RegisterRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxiosService";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const RegisterForm: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const theme = useTheme();

  const validateForm = (): boolean => {
    return validatePassword() && validateConfirmPassword();
  };

  const validatePassword = (): boolean => {
    const isPasswordValid = password.length >= 8;
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: isPasswordValid
        ? ""
        : "Le texte mot de passe doit contenir au moins 8 caractères.",
    }));
    return isPasswordValid;
  };

  const validateConfirmPassword = (): boolean => {
    const arePasswordsIdentical = password === confirmPassword;
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: arePasswordsIdentical
        ? ""
        : "La confirmation doit être identique au mot de passe",
    }));
    return arePasswordsIdentical;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const data: RegisterRequestModel = {
      username,
      email,
      password,
      language_iso: window.navigator.language.split("-")[0],
    };

    try {
      const response = await axiosService.post("/register", data);
      const responseData = response?.data;
      if (!responseData?.user || !responseData?.token) throw new Error();

      login(responseData.user, responseData.token, () => {
        window.location.href = "/profile";
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiErrors = error.response?.data.errors ?? {
          general: error.message,
        };
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: apiErrors.username ? apiErrors.username[0] : "",
          email: apiErrors.email ? apiErrors.email[0] : "",
          password: apiErrors.password ? apiErrors.password[0] : "",
        }));
      } else {
        console.error("Erreur inconnue:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Une erreur à été retournée, veuillez-rééssayer.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value === password && errors.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{ marginTop: "32px", marginBottom: "64px" }}
    >
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{
            color: theme.palette.primary.main,
            fontSize: "32px",
            textTransform: "uppercase",
            fontWeight: 800,
          }}
        >
          Connecte-toi
        </div>
        <div
          style={{
            color: theme.palette.primary.main,
            fontSize: "32px",
            textTransform: "uppercase",
            fontWeight: 800,
          }}
        >
          ou Créer ton compte Troc ton Objet
        </div>
      </div>
      <Box
        display={"flex"}
        gap={8}
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: "80%" }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            Créer ton compte gratuitement !
          </Typography>
          <TextField
            label="Nom"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
            errorText={errors.username}
            disabled={loading}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            errorText={errors.email}
            disabled={loading}
          />
          <TextField
            label="Mot de passe"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            errorText={errors.password}
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
            errorText={errors.confirmPassword}
            disabled={loading}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ minWidth: "200px" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Créer mon compte"
              )}
            </Button>
          </div>
          <span style={{ color: "white" }}>
            Tu as déjà un compte ?
            <Link to="/auth/login">
              <span
                style={{ color: theme.palette.primary.main, marginLeft: "4px" }}
              >
                Connecte-toi ici
              </span>
            </Link>
          </span>
          {errors.general && (
            <Typography
              variant="body1"
              style={{ marginTop: "16px", color: "red" }}
            >
              {errors.general}
            </Typography>
          )}
        </form>
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <img
            src="/Images/logo_part_square.svg"
            width="125"
            alt="square"
          />
          <img
            src="/Images/logo_part_circle.svg"
            width="125"
            alt="circle"
          />
        </div>
      </Box>
    </Container>
  );
};

export default RegisterForm;
