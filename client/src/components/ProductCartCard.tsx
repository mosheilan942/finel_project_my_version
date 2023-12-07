import { Typography, CardContent, Box, IconButton, Card } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import cartsAPI from "../api/cartsAPI";
import * as cartLocalStorageUtils from "../utils/cartLocalStorageUtils";
import { toastError } from "../utils/toastUtils";
import { UserContext } from "../UserContext";
// import ProductCart from "../types/ProductCart";

type Props = {
    product: any;
    quantity: number;
    removeFromCart: (productId: string) => Promise<void>;
    totalAmount: number;
    setTotalAmount: Dispatch<SetStateAction<number>>;
    updateCartItemQuantity: (productId: string, newQuantity: number) => void; // Add prop for updating quantity
};

const ProductCartCard = ({
    product,
    quantity,
    removeFromCart,
    totalAmount,
    setTotalAmount,
    updateCartItemQuantity,
}: Props) => {
    const [cartQuantity, setCartQuantity] = useState<number>(Number(quantity));
    const context = useContext(UserContext)!;
    const { userInfo } = context;

    const getPrice = () => {
        return userInfo ? product.price : product.saleprice;
    };

    const increaseQuantity = async (productId: string) => {
        if (userInfo) {
            try {
                if (cartQuantity < product.storequantity) {
                    await cartsAPI.updateQuantity(productId, "inc");
                    
                setCartQuantity(cartQuantity + 1);
                setTotalAmount(totalAmount + getPrice());
                console.log(
                    "hi from increaseQuantity, cartQuantity:",
                    cartQuantity + 1
                );

                updateCartItemQuantity(productId, cartQuantity + 1);
                } else {
                    toastError(
                        `There are only ${product.storequantity} items available for purchase`
                    );

            } }
            catch (error) {
                console.error("Error increasing quantity:", error);
            }
        } 
        else {
            if(cartQuantity < product.quantity){
                cartLocalStorageUtils.incQuantityOfProduct(productId);
                
                setCartQuantity(cartQuantity + 1);
                setTotalAmount(totalAmount + getPrice());
                console.log(
                    "hi from increaseQuantity, cartQuantity:",
                    cartQuantity + 1
                );

                updateCartItemQuantity(productId, cartQuantity + 1);

            }
            else{
                toastError(
                    `There are only ${product.storequantity} items available for purchase`
                );
            }
        }
    };







    const decreaseQuantity = async (productId: string) => {
        if (cartQuantity > 1) {
            try {
                if (userInfo) {
                    await cartsAPI.updateQuantity(productId, "dec");
                } else {
                    cartLocalStorageUtils.decQuantityOfProduct(productId);
                }
                setCartQuantity(cartQuantity - 1);
                setTotalAmount(totalAmount - Number(getPrice()));

                updateCartItemQuantity(productId, cartQuantity - 1);
            } catch (error) {
                console.error("Error decreasing quantity:", error);
            }
        } else {
            toastError("Quantity cannot be less than 1");
        }
    };

    const deleteFromCart = async (productId: string) => {
        await removeFromCart(productId);
    };

    return (
        <Card sx={{ margin: 2, padding: 1 }}>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
            >
                <Box>
                    {/* <img src={product.image.url} alt={product.name} style={{ width: '100px' }} /> */}
                </Box>

                <Box flexGrow={1}>
                    <CardContent>
                        <Typography variant="h5">{product.name}</Typography>
                        <Typography variant="body1">
                            {product.description}
                        </Typography>
                        <Typography variant="body2">{`Price: ${getPrice()}`}</Typography>
                    </CardContent>
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton
                        onClick={() => {
                            if (product.productid) {
                                increaseQuantity(product.productid);
                            } else {
                                console.log("product.id:", product.id);
                                increaseQuantity(product.id);
                            }
                        }}
                    >
                        +
                    </IconButton>
                    <Typography variant="body1">{cartQuantity}</Typography>
                    <IconButton
                        onClick={() => {
                            if (product.productid) {
                                // Your code when the condition is true
                                decreaseQuantity(product.productid);
                            } else {
                                console.log("product.id:", product.id);
                                decreaseQuantity(product.id);
                            }
                        }}
                    >
                        -
                    </IconButton>
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <IconButton
                        onClick={() => {
                            if (product.productid) {
                                // Your code when the condition is true
                                deleteFromCart(product.productid);
                            } else {
                                deleteFromCart(product.id);
                            }
                        }}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default ProductCartCard;
