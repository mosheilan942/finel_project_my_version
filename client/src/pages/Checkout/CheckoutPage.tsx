import * as React from "react";
import { useContext} from "react";

import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ShippingDetails from "./ShippingDetails";
import PaymentDetails from "./PaymentDetails";
import OrderSummary from "./OrderSummary";
import { CreditCardDetails } from "../../types/creditCard";
import { sendOrder } from "../../api/ordersApi";
import ErrorIcon from "@mui/icons-material/Error";
import { Box } from "@mui/material";
import {
    Address,
    OrderEnum,
    OrderInterface,
    OrderStatusEnum,
} from "../../types/order";
import { OrderInPayPal } from "../../types/orderDataPayPal";
import { UserContext } from "../../UserContext";

// Interface for the response from the API
interface ApiResponse {
    message: string;
}

// Component for copyright information
function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

// Checkout page component
const CheckoutPage = () => {
    const context = useContext(UserContext)!;
    const { userInfo } = context;
    // Get the total amount from URL params
    const { totalAmount } = useParams();
    const totalPrice = (totalAmount && parseFloat(totalAmount)) || 1.0;

    // State variables for checkout process management
    const [activeStep, setActiveStep] = React.useState(0);
    const [isChecking, setIsChecking] = React.useState(false);
    const [error, setError] = React.useState("");
    const [deliveryMethod, setDeliveryMethod] =
        React.useState<string>("pickup");
    const [res, setRes] = React.useState<string>("");
    const [isExpressDelivery, setIsExpressDelivery] = React.useState(false);
    const [orderID, setOrderID] = React.useState("");
    console.log(res);


    // Function to determine order type based on delivery method and express option
    const orderTypeReturn = () => {
        if (deliveryMethod === "pickup") return OrderEnum.SelfCollection;
        if (isExpressDelivery) return OrderEnum.Express;
        return OrderEnum.Regular;
    };

    // State for shipping details
    const [shippingDetails, setShippingDetails] = React.useState<Address>({
        country: "",
        city: "",
        street: "",
        cellPhone: "",
        zipCode: "",
        saveAddress: false,
    });

    // State for credit card details
    const [creditCardDetails, setCreditCardDetails] =
        React.useState<CreditCardDetails>({
            cardholderId: "",
            cardNumber: "",
            expDate: "",
            cvv: "",
            saveCard: false,
        });

    // Function to prepare order data before sending to the server
    const prepareOrderData = (orderInPayPal: OrderInPayPal | null = null) => {
        const orderData: OrderInterface = {
            orderTime: new Date(),
            userId: userInfo?.id || "",
            status: OrderStatusEnum.Waiting,
            totalPrice: totalPrice,
            shippingDetails: {
                address: {
                    country: shippingDetails.country,
                    city: shippingDetails.city,
                    street: shippingDetails.street,
                    zipCode: shippingDetails.zipCode,
                    saveAddress: shippingDetails.saveAddress,
                },
                orderType: orderTypeReturn(),
                contactNumber: shippingDetails.cellPhone || "",
            },
            paymentPayPal: orderInPayPal,
        };

        return orderData;
    };

    // Function to handle placing the order
    const handlePlaceOrder = async (orderData: OrderInterface) => {
        setIsChecking(true);
        try {
            const response = await sendOrder(orderData);
            setIsChecking(false);

            if (
                typeof response === "object" &&
                "message" in response &&
                "orderID" in response
            ) {
                setRes(response.message as string);
                setOrderID(response.orderID as string);
                setActiveStep(steps.length);
            } else {
                setError("Unknown error occurred !!!");
            }
        } catch (error) {
            setIsChecking(false);
            if (
                typeof error === "object" &&
                error !== null &&
                "message" in error
            ) {
                const errorMessage =
                    (error as ApiResponse).message || "Unknown error occurred";
                setError(errorMessage);
            } else {
                setError("Unknown error occurred !!!");
            }
        }
    };

    // Function to handle order placement
    const handleOrderPlacement = (
        orderInPayPal: OrderInPayPal | null = null
    ) => {
        const orderData = prepareOrderData(orderInPayPal);
        handlePlaceOrder(orderData);
    };

    // Function to proceed to the next step in the checkout process
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    // Function to go back to the previous step in the checkout process
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    // Array of steps in the checkout process with corresponding components and labels
    const steps = [
        {
            component: (
                <ShippingDetails
                    deliveryMethod={{
                        data: deliveryMethod,
                        setData: setDeliveryMethod,
                    }}
                    shippingDetails={{
                        data: shippingDetails,
                        setData: setShippingDetails,
                    }}
                    isExpressDelivery={{
                        data: isExpressDelivery,
                        setData: setIsExpressDelivery,
                    }}
                    onNext={handleNext}
                />
            ),
            label: "Shipping address",
        },
        {
            component: (
                <PaymentDetails
                    totalAmount={totalPrice}
                    onPlaceOrder={handleOrderPlacement}
                    creditCard={{
                        data: creditCardDetails,
                        setData: setCreditCardDetails,
                    }}
                    setOrderId={setOrderID}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            ),
            label: "Payment method",
        },
        {
            component: (
                <OrderSummary
                    totalAmount={totalPrice}
                    shippingDetails={shippingDetails}
                    creditCardDetails={creditCardDetails}
                    onBack={handleBack}
                    onPlaceOrder={handleOrderPlacement}
                />
            ),
            label: "Summary of order details",
        },
    ];

    return (
        <React.Fragment>
            {/* Set up base CSS */}
            <CssBaseline />

            {/* Main container for the checkout page */}
            <Container component="main" maxWidth="sm" sx={{ mb: 20 }}>
                {/* Paper component for layout */}
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    {/* Heading for the checkout process */}
                    <Typography component="h1" variant="h4" align="center">
                        Just before the product is with you
                    </Typography>

                    {/* Stepper component to show current step */}
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((step) => (
                            <Step key={step.label}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {/* Show content based on the current step */}
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            {/* Thank you message after completing the checkout */}
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="h6">
                                Your order number is: {orderID} .
                            </Typography>
                            <Typography variant="h6">
                                We have emailed your order confirmation, and
                                will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* Show the current step's component */}
                            {steps[activeStep].component}

                            {/* Show a message while checking the order */}
                            {isChecking && (
                                <Typography variant="body1">
                                    The order is placed...
                                </Typography>
                            )}

                            {/* Show error message if there's an error */}
                            {error && (
                                <Box>
                                    <ErrorIcon
                                        sx={{ color: "red", fontSize: 40 }}
                                    />
                                    <Typography variant="body1" color="error">
                                        {error}
                                    </Typography>
                                </Box>
                            )}
                        </React.Fragment>
                    )}
                </Paper>

                {/* Copyright information */}
                <Copyright />
            </Container>
        </React.Fragment>
    );
};

export default CheckoutPage;
