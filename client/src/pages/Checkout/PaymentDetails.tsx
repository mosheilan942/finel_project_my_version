import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paypal from '../../components/Paypal';
import { Box, Button, Collapse, Divider, List, ListItem, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { CreditCardDetails } from '../../types/creditCard';
import { checkDebitCard } from '../../api/ordersApi';
import { OrderInPayPal } from '../../types/orderDataPayPal';

interface ApiResponse {
    message: string;
}

type Props = {
    totalAmount: number;
    onPlaceOrder: Function;
    creditCard: { data: CreditCardDetails, setData: Function };
    setOrderId: Function;
    onNext: Function;
    onBack: Function;
}

const PaymentDetails = (props: Props) => {
    const [payCurrentOpen, setPayCurrentOpen] = useState(false);

    // PayPal.
    const handlePayPalSuccess = async (orderData: OrderInPayPal) => {
        console.log("order from PayPal :", orderData);
        props.onPlaceOrder(orderData)
    };


    const handlePayPalCancel = () => {
        setError('PayPal cancel !!!');
    };

    const handlePayPalError = () => {
        setError("PayPal error !!!");
    };

    // CreditCardDetails.
    const creditCardDetails: CreditCardDetails = props.creditCard.data;
    const setCreditCardDetails: Function = props.creditCard.setData;

    const [errors, setErrors] = useState<Partial<CreditCardDetails>>({});

    const [isChecking, setIsChecking] = React.useState(false);
    const [serverResponse, setServerResponse] = React.useState('');
    const [error, setError] = React.useState('');

    const isCreditCardValid = (cardNumber: string) => {
        return /^\d{16}$/.test(cardNumber);
    };

    const isCVVValid = (cvv: string) => {
        return /^\d{3}$/.test(cvv);
    };

    const isIdValid = (id: string) => {
        return /^\d{9}$/.test(id);
    };

    const isExpirationValid = (expDate: string) => {
        const currentDate = new Date();
        const [expMonth, expYear] = expDate.split('/').map((item) => parseInt(item));

        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        return (
            expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth)
        );
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServerResponse('');
        setError('');

        const { name, value, checked, type } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setCreditCardDetails({
            ...creditCardDetails,
            [name]: newValue,
        });

        const newErrors = { ...errors };
        switch (name) {
            case 'cardholderId':
                newErrors.cardholderId = !isIdValid(value.trim()) ? 'Please enter a valid ID (9 digits).' : '';
                break;
            case 'cardNumber':
                newErrors.cardNumber = !isCreditCardValid(value.trim()) ? 'Please enter a valid 16-digit credit card number.' : '';
                break;
            case 'expDate':
                newErrors.expDate = !isExpirationValid(value.trim()) ? 'Please enter a valid expiration date.' : '';
                break;
            case 'cvv':
                newErrors.cvv = !isCVVValid(value.trim()) ? 'Please enter a valid 3-digit CVV.' : '';
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleNext = async () => {
        setServerResponse('');
        setError('');

        const formErrors: Partial<CreditCardDetails> = {};
        if (!isIdValid(creditCardDetails.cardholderId.trim())) {
            formErrors.cardholderId = 'Please enter a valid ID (9 digits).';
        }
        if (!isCreditCardValid(creditCardDetails.cardNumber.trim())) {
            formErrors.cardNumber = 'Please enter a valid 16-digit credit card number.';
        }
        if (!isExpirationValid(creditCardDetails.expDate.trim())) {
            formErrors.expDate = 'Please enter a valid expiration date.';
        }
        if (!isCVVValid(creditCardDetails.cvv.trim())) {
            formErrors.cvv = 'Please enter a valid 3-digit CVV.';
        }

        setErrors(formErrors);

        const isValid = Object.keys(formErrors).length === 0;

        if (isValid) {

            setIsChecking(true);

            try {
                const data = await checkDebitCard(creditCardDetails);

                console.log('Response from server:', data);

                setIsChecking(false);

                if (typeof data === 'object' && 'message' in data) {
                    setServerResponse((data as ApiResponse).message);

                    setTimeout(() => {
                        props.onNext()
                    }, 3000);
                } else {
                    setError('Unknown error occurred !!!');
                }
            } catch (error) {

                setIsChecking(false);
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    const errorMessage = (error as ApiResponse).message || 'Unknown error occurred';
                    setError(`Error checking card details: ${errorMessage}`);
                    console.log(error.message);
                } else {
                    setError('Unknown error occurred !!!');
                }
            }
            console.log("Form data :", creditCardDetails);
        } else {
            setError('Form has errors or empty/invalid fields !!!');
            console.log(error);
        }

    };

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5" align="center">
                Choose a payment method
            </Typography>

            <hr style={{ width: '90%', color: 'gray', marginBottom: '40px' }} />

            <Paypal
                product={{ description: 'Payment', price: `${props.totalAmount}` }}
                onPayPalSuccess={handlePayPalSuccess}
                onPayPalCancel={handlePayPalCancel}
                onPayPalError={handlePayPalError}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                <Divider sx={{ flex: 1, margin: 0 }} />
                <Typography sx={{ padding: '0 10px' }}>or</Typography>
                <Divider sx={{ flex: 1, margin: 0 }} />
            </Box>

            <List>
                <ListItem sx={{ width: '100%', background: '#f0f0f0' }} onClick={() => setPayCurrentOpen(!payCurrentOpen)}>
                    <ListItemText primary="Enter credit information" />
                    {payCurrentOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={payCurrentOpen} timeout="auto" unmountOnExit>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="idCardholder"
                                name="cardholderId"
                                label="ID card of the cardholder"
                                fullWidth
                                autoComplete="cc-name"
                                variant="standard"
                                value={creditCardDetails.cardholderId}
                                onChange={handleFormChange}
                                error={!!errors.cardholderId}
                                helperText={errors.cardholderId}
                                inputProps={{
                                    type: 'number'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardNumber"
                                name="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                variant="standard"
                                value={creditCardDetails.cardNumber}
                                onChange={handleFormChange}
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber}
                                inputProps={{
                                    type: 'number'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="expDate"
                                name="expDate"
                                label="Expiry date"
                                fullWidth
                                autoComplete="cc-exp"
                                variant="standard"
                                value={creditCardDetails.expDate}
                                onChange={handleFormChange}
                                error={!!errors.expDate}
                                helperText={errors.expDate}
                                inputProps={{
                                    type: 'text',
                                    pattern: '([0-9]{2}[/]?[0-9]{2})',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvv"
                                name="cvv"
                                label="CVV"
                                fullWidth
                                autoComplete="cc-csc"
                                variant="standard"
                                value={creditCardDetails.cvv}
                                onChange={handleFormChange}
                                error={!!errors.cvv}
                                helperText={errors.cvv}
                                inputProps={{
                                    type: 'number'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="secondary"
                                        name="saveCard"
                                        checked={creditCardDetails.saveCard}
                                        onChange={handleFormChange} />}
                                label="Remember credit card details for next time"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ color: "red" }}>
                                warning!!!
                            </Typography>

                            <Typography variant="body1">
                                The site is not secure,
                            </Typography>

                            <Typography variant="body1">
                                You can temporarily pay via PayPal.
                            </Typography>

                            <Typography variant="body1">
                                Forgiveness is with you.
                            </Typography>
                        </Grid>
                    </Grid>
                </Collapse>
            </List>

            {isChecking && (
                <Typography variant="body1">
                    Sent for testing...
                </Typography>
            )}

            {serverResponse && (
                <Box>
                    <CheckCircleIcon sx={{ color: 'green', fontSize: 40 }} />
                    <Typography variant="body1">
                        {serverResponse}
                    </Typography>
                </Box>
            )}

            {error && (
                <Box>
                    <ErrorIcon sx={{ color: 'red', fontSize: 40 }} />
                    <Typography variant="body1" color="error">
                        {error}
                    </Typography>
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => props.onBack()} sx={{ mt: 3, ml: 1 }}>
                    Back
                </Button>

                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
}

export default PaymentDetails;

