import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
interface Props {
    rating: number
}
export default function BasicRating({rating}: Props) {
    console.log('this is rating',rating)
const value = Number(rating)
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
     
      <Typography component="legend">Rating</Typography>
      <Rating name="read-only" value={value} readOnly />
     
    </Box>
  );
}
