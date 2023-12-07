import { useContext, useEffect, useState } from 'react';
import { Typography, Box, Card, CircularProgress } from '@mui/material';
import { GetOrderInterface, OrderInterface } from '../types/order';
import { Product } from '../types/Product';
import { UserContext } from '../UserContext';

const api = import.meta.env.VITE_API_URI


export default function Orders() {
  const [orders, setOrders] = useState<GetOrderInterface[]>(); 
  const [loading, setLoading] = useState<boolean>(false);  
  const context = useContext(UserContext)!;
  const { userInfo } = context;
  const userId = userInfo?.id;

  async function getOrders(userId: string | undefined) {
    try {
      const response = await fetch(`${api}/orders/allOrders/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setLoading(true);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]); 
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      getOrders(userId);
    }
  }, [userId]); 

  return (
    <>
      {loading ? (
        <CircularProgress /> 
      ) : orders && orders.length > 0 ? (
        <Card sx={{ margin: 2, padding: 1 }}>
          {orders.map((orderData: GetOrderInterface) =>
            orderData.orders.map((order: OrderInterface) => (
              <div key={order.orderTime.toString()}>
                {order.cartItems?.map((product: Product) => (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    key={product.name}
                  >
                    <img src={product.image.url} alt={product.name} style={{ width: '100px' }} />
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="h5">{product.saleprice}</Typography>
                    <Typography variant="h5">{product.quantity}</Typography>
                  </Box>
                ))}
              </div>
            ))
          )}
        </Card>
      ) : (
        <Typography variant="h6">No orders available</Typography>
      )}
    </>
  );
}
