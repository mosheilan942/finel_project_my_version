import { useState, useEffect, useContext } from "react";
import {
    Typography,
    Button,
    Box,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Container,
} from "@mui/material";
import ProductCartCard from "../components/ProductCartCard";
import cartsAPI from "../api/cartsAPI";
import CircularProgress from "@mui/material/CircularProgress";
import * as cartLocalStorageUtils from "../utils/cartLocalStorageUtils";
// import CartItem from "../types/CartItem";
import { toastError, toastSuccess } from "../utils/toastUtils";
import { UserContext } from "../UserContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
// import ProductCart from "../types/ProductCart";

const totalProducts = (products: any[]) => {
    let total = 0;
    products.forEach((product) => {
        total += product.quantityofproduct
    });
    return total;
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(UserContext)!;
    const { userInfo, setProductsInCart } = context;
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
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
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [userInfo]);
    useEffect(() => {
        if (cartItems.length !== 0 && userInfo) {
            const total = cartItems.reduce((sum: any, item: any) => {
                return sum + item.quantityofproduct * item.price;
            }, 0);
            setTotalAmount(total);
        } else {
            const total = cartItems.reduce((sum: any, item: any) => {
                return sum + item.quantity * item.product_id.saleprice;
            }, 0);
            setTotalAmount(total);
        }
    }, [cartItems]);
    const removeFromCart = async (productId: string) => {
        console.log("hi from removeFromCart productId:", productId)
        try {
            if (userInfo) {
                console.log(
                    "hi from remove from cart this product id",
                    productId
                );
                await cartsAPI.deleteProductFromCart(productId);

                const newCart = await cartsAPI.getCart(userInfo.id);
                setProductsInCart(newCart.length);
                setCartItems(newCart);
            } else {
                console.log('hi from remove from cart this product id', productId);
                cartLocalStorageUtils.removeFromCart(productId);
                const newCart = cartLocalStorageUtils.getCart();
                setProductsInCart(newCart.length);
                setCartItems(newCart);
            }
            toastSuccess("Product removed from cart");
        } catch (error) {
            console.error("Error removing from cart:", error);
            toastError("Error removing product from cart");
        }
    };

    const buyNow = async () => {
        if (userInfo) {
            console.log("Product purchased!");
            navigate(`/store/checkout/${totalAmount.toFixed(2) || 0}`);
        } else {
            navigate(ROUTES.LOGIN);
        }
    };

    const updateCartItemQuantity = (productId: string, newQuantity: number) => {
        setCartItems((prevCartItems: any) =>
            prevCartItems.map((item: any) => {
                if (userInfo) {
                    return item.productid === productId
                        ? { ...item, quantityofproduct: newQuantity }
                        : item;
                } else {
                    return item.product_id.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item;
                }
            })
        );
    };
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (cartItems.length === 0) {
        return <Typography variant="h2">No items in the cart</Typography>;
    }
    return (
        <Grid
            container
            spacing={3}
            style={{ display: "flex", alignItems: "start" }}
        >
            <Grid item xs={8}>
                {cartItems.map((item: any) => {
                    if (userInfo) {
                        return (
                            <ProductCartCard
                                key={"ProductCartCard-" + uuidv4()}
                                product={item}
                                quantity={item.quantityofproduct}
                                removeFromCart={removeFromCart}
                                totalAmount={totalAmount}
                                setTotalAmount={setTotalAmount}
                                updateCartItemQuantity={updateCartItemQuantity}
                            />
                        );
                    } else {
                        return (
                            <ProductCartCard
                                key={"ProductCartCard-" + uuidv4()}
                                product={item.product_id}
                                quantity={item.quantity}
                                removeFromCart={removeFromCart}
                                totalAmount={totalAmount}
                                setTotalAmount={setTotalAmount}
                                updateCartItemQuantity={updateCartItemQuantity}
                            />
                        );
                    }
                })}
            </Grid>
            <Grid item xs={4}>
                <Paper
                    sx={{
                        padding: "16px",
                        position: "sticky",
                        right: "0",
                        transform: "translateY(20px)",
                    }}
                >
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={`Number of Items: ${cartItems.length}`}
                            />
                        </ListItem>
                        {cartItems.map((item: any) =>
                            userInfo ? (
                                <ListItem key={`ListItem-${uuidv4()}`}>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`Quantity: ${item.quantityofproduct
                                            } | Total Price: $ ${(
                                                item.quantityofproduct *
                                                item.price
                                            ).toFixed(2) || 0
                                            }`}
                                    />
                                </ListItem>
                            ) : (
                                <ListItem key={`ListItem-${uuidv4()}`}>
                                    <ListItemText
                                        primary={item.product_id.name}
                                        secondary={`Quantity: ${item.quantity} | Total Price: $${(item.quantity * item.product_id.saleprice).toFixed(2) || 0}`}
                                    />

                                </ListItem>


                            )
                        )}

                        <ListItem>
                            <ListItemText primary={`Subtotal (items: ${totalProducts(cartItems)}):`} />
                            <Typography
                                variant="h5"
                                sx={{ marginLeft: "1rem" }}
                            >
                                $ {totalAmount.toFixed(2) || 0}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Container>
                                <Button
                                    sx={{ width: "100%", marginBottom: 1 }}
                                    variant="contained"
                                    onClick={buyNow}
                                >
                                    Go to the payment page
                                </Button>
                            </Container>
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default CartPage;