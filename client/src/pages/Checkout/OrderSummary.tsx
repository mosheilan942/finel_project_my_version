import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { CreditCardDetails } from '../../types/creditCard';
import { Address } from '../../types/order';
import { UserContext } from '../../UserContext';
import cartsAPI from '../../api/cartsAPI';
import * as cartLocalStorageUtils from "../../utils/cartLocalStorageUtils";

type Props = {
    totalAmount: number;
    shippingDetails: Address;
    creditCardDetails: CreditCardDetails;
    onBack: Function;
    onPlaceOrder: Function;
}


function getLastFourDigits(creditCardNumber: string): string {
    if (creditCardNumber.length < 4) {
        throw new Error("Credit card number should have at least 4 digits");
    }

    return creditCardNumber.slice(-4);
}

export default function OrderSummary(props: Props) {
    const [cartItems, setCartItems] = React.useState<any[]>([]);
    const context = React.useContext(UserContext)!;
    const { userInfo } = context;
    const { totalAmount } = props;
    const creditCardDetails = props.creditCardDetails;
    const address = props.shippingDetails;

    React.useEffect(() => {
        const fetchCart = async () => {
            try {
                if (userInfo) {
                    console.log("hi from cartpage this is userinfo", userInfo);

                    const cartData = await cartsAPI.getCart(userInfo.id);
                    console.log("hi from cartData in cartpage:", cartData[0]);

                    setCartItems(cartData);
                } else {
                    const localCart = cartLocalStorageUtils.getCart();
                    console.log(
                        "hi from cartpage this is localCart",
                        localCart
                    );
                    if (localCart) {
                        setCartItems(localCart);
                    } else {
                        setCartItems([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, [userInfo]);

    const addresses = [
        { name: 'Country:', detail: address.country },
        { name: 'City:', detail: address.city },
        { name: 'Street:', detail: address.street },
        { name: 'Zip code:', detail: address.zipCode },
        { name: 'Cell phone:', detail: address.cellPhone },
    ];

    const payments = [
        { name: 'Card type:', detail: 'Visa' },
        { name: 'Card holder ID:', detail: creditCardDetails.cardholderId },
        { name: 'Card number:', detail: `xxxx-xxxx-xxxx-${getLastFourDigits(creditCardDetails.cardNumber)}` },
        { name: 'Expiry date:', detail: creditCardDetails.expDate },
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography component="h1" variant="h5" align="center">
                Order summary
            </Typography>

            <hr style={{ width: '90%', color: 'gray', marginBottom: '40px' }} />

            <Typography component="h1" variant="h6" align="center">
                Your products
            </Typography>

            <List disablePadding>
                {cartItems.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            primary={product.name}
                            secondary={`Quantity: ${product.quantityofproduct} .`}
                        />
                        <Typography variant="body2">$ {product.price.toFixed(2)}</Typography>
                    </ListItem>
                ))}

                <hr style={{ width: '100%', color: 'gray', marginBottom: '40px' }} />

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        $ {totalAmount.toFixed(2)}
                    </Typography>
                </ListItem>
            </List>

            <hr style={{ width: '100%', color: 'gray', marginBottom: '40px' }} />

            <Grid container spacing={2}>

                <Grid item xs={12} >
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Grid container>
                        {addresses.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>

                <Grid item container direction="column" xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => props.onBack()} sx={{ mt: 3, ml: 1 }}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={() => props.onPlaceOrder()}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Place order
                </Button>
            </Box>
        </React.Fragment>
    );
}