import { Mail } from "@mui/icons-material";
import { useRef, FormEvent } from 'react';
import emailjs from 'emailjs-com';
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import ChatIcon from '@mui/icons-material/Chat';
import { Link, TextField, Button, Typography, Container, Grid, Card, CardHeader, Divider } from '@mui/material';

export default function CustomerService() {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
        .then((result) => {
          console.log(result.text);
        })
        .catch((error) => {
          console.log(error.text);
        });
    }
  };


  return (
    <Container maxWidth="sm" style={{ marginTop: '5vh', textAlign: 'center' }}>
      <Card>
        <CardHeader title="contact us" />
        <Divider />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} >
            <Typography variant="h6" sx={{ margin: '10px' }}>
              <CallRoundedIcon />
            </Typography>
            <Typography variant="h6">
              Phone: 05347638796
            </Typography>
            <Typography variant="h6" sx={{ margin: '10px' }}>
              <ChatIcon />
            </Typography>
            <Typography variant="h6">
              Chat: <Link href="/store/chat">chat bot</Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              <Mail />
            </Typography>
            <Typography variant="h5" gutterBottom>
              Send Us An Email
            </Typography>
            <form ref={form} onSubmit={sendEmail} style={{ marginTop: 20 }}>
              <TextField label="Name" name="user_name" variant="outlined" margin="normal" fullWidth required />
              <TextField label="Email" name="email" type="email" variant="outlined" margin="normal" fullWidth required />
              <TextField label="Message" name="message" multiline rows={4} variant="outlined" margin="normal" fullWidth required />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20, marginRight: 10, marginBottom: 5 }}>
                Send
              </Button>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
