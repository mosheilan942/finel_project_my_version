import { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useNavigate, useParams } from 'react-router-dom';
import productsAPI from '../api/productsAPI';
import { Product } from '../types/Product.ts';
import StoreMap from '../components/StoreMap.tsx';
import cartsAPI from '../api/cartsAPI.ts';
import * as localstorage from '../utils/cartLocalStorageUtils.ts';
import CartItem from '../types/CartItem.ts';
import { toastError, toastSuccess } from '../utils/toastUtils.ts';
import { UserContext } from '../UserContext.tsx';
import Rating from '../components/Rating.tsx';
import DialogReview from '../mui/DialogReview.tsx';
import ProductReviews from "../components/ProductReviews .tsx";
import BannerSide from '../banners/BannerSide.tsx';

const ProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<null | Product | any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [reviews, setReviews] = useState<any>([]);
  const context = useContext(UserContext)!;
  const { userInfo, setProductsInCart } = context;
  const { pid } = useParams();

  const getProductAndReview = async (pid: string) => {
    try {
      const data = await productsAPI.getProductById(pid!);
      const reviews = await productsAPI.getReviewsByProductIdFromDB(pid!);
      setProduct(data);
      setReviews(reviews);
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  const updateReviews = async () => {
    const updatedReviews = await productsAPI.getReviewsByProductIdFromDB(pid!);
    setReviews(updatedReviews);
  };

  useEffect(() => {
    getProductAndReview(pid!);
  }, [pid]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  const handleAddToCart = async () => {
    if (quantity > product!.quantity) {
      toastError(`Only ${product!.quantity} in stock`);
      return;
    }
    if (userInfo) {
      const userId = userInfo.id;
      try {
        const cart = await cartsAPI.addToCart(userId, product, quantity.toString());
        console.log(cart);
        toastSuccess('Added to cart!');
        setQuantity(1);
      } catch (error) {
        console.error('failed to add to cart, from ProductPage', error);
        toastError('Failed to add');
      }
    } else {
      const itemForCart: CartItem = {
        product_id: product!,
        quantity: quantity,
      };
      localstorage.addToCart(itemForCart);
      setProductsInCart(localstorage.getCart().length);
      toastSuccess('Added to cart!');
      setQuantity(1);
    }
  };

  const handleCompareProducts = () => {
    navigate(`/store/category/${product!.category}`, { state: product });
  };

  if (!product) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <BannerSide />
      <Paper style={{ margin: 50 }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={6} justifyContent="center" alignItems="center">
            <img src={product?.image.url} alt={product?.name} height={200} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">{product?.name}</Typography>
            <Typography variant="body1">{product?.description}</Typography>
            <Typography variant="h6">${product?.saleprice}</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={decrementQuantity}>
                <RemoveCircleRoundedIcon />
              </IconButton>
              <Box>{quantity}</Box>
              <IconButton onClick={() => setQuantity(quantity + 1)}>
                <AddCircleRoundedIcon />
              </IconButton>
            </div>
            <div style={{ margin: '5px', alignItems: 'space-around' }}>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={handleCompareProducts}
              >
                Compare similar products
              </Button>
              <div
                style={{
                  display: 'flex',
                  marginTop: 10,
                  alignItems: 'center',
                }}
              >
                <DialogReview pid={pid} updateReviews={updateReviews} />
                <div style={{ margin: '20px' }}>
                  <Rating rating = {product.rating}/>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        style={{
          margin: '10px 50px',
          height: 'auto',
          maxHeight: 500,
          overflowY: 'auto',
          padding: '20px',
        }}
      >
        <ProductReviews reviews={reviews} pid={pid} />
        <br />
      </Paper>

      <br />
      <Paper
        style={{
          margin: '10px 50px',
          height: 'auto',
          position: 'relative',
          padding: '20px',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Store Location
        </Typography>
        <div style={{ height: '400px' }}>
          <StoreMap />
        </div>
      </Paper>
    </>
  );
};

export default ProductPage;
