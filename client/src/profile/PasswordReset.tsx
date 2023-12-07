import { useState, FormEvent,useContext } from "react";
import { TextField, Button, Typography, Paper, Container } from "@mui/material";
import { UserContext } from '../UserContext'
import axios from "axios";
import usersAPI from "../api/usersAPI";

const api = import.meta.env.VITE_API_URI
const RESET_PASSWORD_ENDPOINT = `${api}/users/resetPassword/`;



const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailAuth, setEmailAuth] = useState(false);
  const context = useContext(UserContext)!;


  const checkEmail = async (email: string) => {
    try {
      const response = await usersAPI.checkEmail(`${email}`) 
      if (response.ok) {
        setEmailAuth(true);
      }
    } catch (error) {
      console.error("Error initiating password reset:", error);
    }
  };

  const sendNewPassword = async (password: string) => {
    try {
      const response = await axios.post(`${RESET_PASSWORD_ENDPOINT}${email}`, { password });
      if (response.status === 200) {
      }
    } catch (error) {
      console.error("Error sending new password:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      await checkEmail(email);
    }
  };

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password) {
      await sendNewPassword(password);
    }
  };


  return (
    <>
      {emailAuth ? (
        <Container maxWidth="sm" style={{ marginTop: "10vh", textAlign: "center" }}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Reset Password
            </Typography>
            <form onSubmit={handleReset} style={{ marginTop: 20 }}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
              >
                Reset
              </Button>
            </form>
          </Paper>
        </Container>
      ) : (
        <Container maxWidth="sm" style={{ marginTop: "10vh", textAlign: "center" }}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Verify Email
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
              >
                Verify
              </Button>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default PasswordReset;
