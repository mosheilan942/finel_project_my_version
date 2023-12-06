import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroupRating from './RadioGroupRating';
import { Typography } from '@mui/material';
import productsAPI from '../api/productsAPI';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

interface DialogReviewProps {
  pid: string | undefined;
  updateReviews: () => void; // New prop for updating reviews
}

const DialogReview: React.FC<DialogReviewProps> = ({ pid, updateReviews }: DialogReviewProps) => {
  const name = localStorage.getItem('name');
  const context = useContext(UserContext)!;
  const { userInfo } = context;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setOpen(false);
      const userReview = await productsAPI.sendReviewToDB(pid || '', title, review, rating, name || '', userInfo?.id || '');
      console.log('this is user review', userReview);
      updateReviews(); // Call the updateReviews function to trigger a re-render in ProductPage
    } catch (error) {
      console.log('this is error', error);
    }
  };

  console.log('this is rating', rating);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Review Product
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="review"
            label="Your review"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={review}
            onChange={handleReviewChange}
          />
          <br />
          <br />
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            Rating
          </Typography>
          <RadioGroupRating setRating={setRating} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogReview;
