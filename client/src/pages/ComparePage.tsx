import  { useContext, useEffect, useState } from 'react';
import productsAPI from '../api/productsAPI';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import {Product} from '../types/Product';
import cartsAPI from '../api/cartsAPI';
import * as cartLocalStorageUtils from '../utils/cartLocalStorageUtils';
import CartItem from '../types/CartItem';
import { toastError, toastSuccess } from '../utils/toastUtils';
import { UserContext } from '../UserContext';

const ComparePage = () => {
    const { pid1, pid2 } = useParams();
    const [products, setProducts] = useState<Product[] | null>(null);
    const context = useContext(UserContext)!;
    const { userInfo, setProductsInCart} = context
    const handleAddClick = async (product: Product) => {
        if (product.quantity < 1) {
            toastError('No items in stock');
        };
        if (userInfo) {
            try {
                console.log('userInfo.id:', userInfo.id, 'product:', product)
                const cart = await cartsAPI.addToCart(userInfo.id ,product, '1');
                console.log('cart:', cart)
                // setProductsInCart(cart.items.length);
                toastSuccess('Added to cart!');
            } catch (error) {
                console.error('Failed to fetch', error);
                toastError('Failed to add to cart, from ComparePage');
            }
        } else {
            const productToAdd: CartItem = { product_id: product, quantity: 1 };
            cartLocalStorageUtils.addToCart(productToAdd);
            setProductsInCart(cartLocalStorageUtils.getCart().length);
            toastSuccess('Added to cart!');
        };
    };
    const fetchProductsData = async (pid1: string, pid2: string) => {
        try {
            const product1:Product = await productsAPI.getProductById(pid1);
            const product2:Product = await productsAPI.getProductById(pid2);
            console.log('product1:', product1)
            setProducts([product1, product2]);
        } catch (error) {
            console.error('Failed to fetch');
        };
    };
    useEffect(() => {
        fetchProductsData(pid1!, pid2!);
    }, []);
    if (!products) {
        return (
            <>
                <div>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                </div>
            </>
        );
    };
    return (
        <>
            <Paper style={{ margin: 50 }} elevation={12}>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell align='center'>
                                Name
                            </TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'>{product!.name}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'><img src={product.image.url} alt={`${product.name} picture`} /></TableCell>)}
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Description</TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'>{product!.description}</TableCell>)}
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Popularity</TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'>{product!.click}</TableCell>)}
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>Price</TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'>{product!.saleprice}</TableCell>)}
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            {products.map((product, index) => <TableCell key={index} align='center'><Button variant='contained' onClick={() => handleAddClick(product)}>Add to cart</Button></TableCell>)}
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
};
export default ComparePage;