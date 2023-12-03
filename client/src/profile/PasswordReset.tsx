import { useState, FormEvent } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailAuth, setEmailAuth] = useState(false);

  async function checkEmail(email: string) {
    try {
      const response = await fetch(`api/users/resetPassword/${email}`);
      const data = await response.json();
      console.log(data);
      if (response.status >= 200 && response.status < 400) {
        setEmailAuth(true);
      }
    } catch (error) {
      console.error('Error initiating password reset:', error);
    }
  }
  async function sendNewPassword(email: string) {
    try {
      const response = await fetch(`api/users/resetPassword/${email}`);
      const data = await response.json();
      console.log(data);
      if (response.status >= 200 && response.status < 400) {
        
      }
    } catch (error) {
      console.error('Error initiating password reset:', error);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await setPassword(email);
  };

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendNewPassword(password);
  };

  return (
    <>
      {emailAuth ? (
        <Container maxWidth="sm" style={{ marginTop: '10vh', textAlign: 'center' }}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Reset Password
            </Typography>
            <form onSubmit={handleReset} style={{ marginTop: 20 }}>
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
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                Reset
              </Button>
            </form>
          </Paper>
        </Container>
      ) : (
        <Container maxWidth="sm" style={{ marginTop: '10vh', textAlign: 'center' }}>
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
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
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
