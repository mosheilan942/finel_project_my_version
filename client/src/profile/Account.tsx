import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ContactsIcon from "@mui/icons-material/Contacts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "200px",
  minWidth: "250px",
  marginBottom: theme.spacing(2),
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

export default function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={"/store/address"} style={{ textDecoration: "none" }}>
            <Item>
              <ContactsIcon />
              <h3 style={{ color: "	#ADD8E6" }}> Addresses</h3>
              Mange your addresses
            </Item>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={"/store/orders"} style={{ textDecoration: "none" }}>
            <Item>
              <LocalShippingIcon />
              <h3 style={{ color: "	#ADD8E6" }}>Your Orders</h3>
              All of your past orders
            </Item>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={"/store/service"} style={{ textDecoration: "none" }}>
            <Item>
              <CallRoundedIcon />
              <h3 style={{ color: "	#ADD8E6" }}>Customer Services</h3>
              Stay in contact with us
            </Item>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={"/store/cart"} style={{ textDecoration: "none" }}>
            <Item>
              <ShoppingCartIcon />
              <h3 style={{ color: "	#ADD8E6" }}>Your Cart</h3>
            </Item>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to='/store/profile' style={{ textDecoration: "none" }}>
            <Item>
              <PersonIcon />
              <h3 style={{ color: "	#ADD8E6" }}>Profile</h3>
              Manage your profile information
            </Item>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={"/store/wishlist"} style={{ textDecoration: "none" }}>
            <Item>
              <FavoriteIcon />
              <h3 style={{ color: "	#ADD8E6" }}>Wishlist</h3>
              See all of your favorite items
            </Item>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={"/store/settings"} style={{ textDecoration: "none" }}>
            <Item>
              <SettingsIcon />
              <h3 style={{ color: "	#ADD8E6" }}>Account Settings</h3>
              Manage your account settings
            </Item>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={"/store"} style={{ textDecoration: "none" }}>
            <Item>
              <HomeIcon />
              <h3 style={{ color: "	#ADD8E6" }}>home page</h3>
              Go back to home page
            </Item>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
