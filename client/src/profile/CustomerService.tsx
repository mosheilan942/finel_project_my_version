import { Mail } from "@mui/icons-material";
import { useRef, FormEvent, useState } from 'react';
import emailjs from 'emailjs-com';
import { TextField, Button, Typography, Paper, Container, Grid, Card, CardHeader } from '@mui/material';

export default function CustomerService() {
  const [sentEmail, setSentEmail] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
        .then((result) => {
          console.log(result.text);
          setSentEmail(true);
        })
        .catch((error) => {
          console.log(error.text);
        });
    }
  };

  const handleCancel = () => {
    setSentEmail(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '5vh', textAlign: 'center' }}>
      <Card>
        <CardHeader title="contact us" />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">
              Phone: 05347638796
            </Typography>
            <Typography variant="h6">
              Chat: 35976
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setSentEmail(true)}>
              Send Email
            </Button>
          </Grid>

          {sentEmail && (
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="h5" gutterBottom>
                  <Mail/> Send Us An Email
                </Typography>
                <form ref={form} onSubmit={sendEmail} style={{ marginTop: 20 }}>
                  <TextField label="Name" name="user_name" variant="outlined" margin="normal" fullWidth required />
                  <TextField label="Email" name="email" type="email" variant="outlined" margin="normal" fullWidth required />
                  <TextField label="Message" name="message" multiline rows={4} variant="outlined" margin="normal" fullWidth required />
                  <Button  type="submit" variant="contained" color="primary" style={{ marginTop: 20, marginRight: 10 }}>
                    Send
                  </Button>
                  <Button onClick={handleCancel} variant="contained" color="secondary" style={{ marginTop: 20 }}>
                    Cancel
                  </Button>
                </form>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Card>
    </Container>
  );
}
