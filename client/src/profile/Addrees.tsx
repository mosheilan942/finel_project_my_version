import { useEffect, useState, useContext } from 'react'
import { Typography, Box, Card } from '@mui/material';
import { Product } from '../types/Product';
import { UserContext } from '../UserContext';



export default function Addrees() {

  const [wishList, setWishList] = useState<Product[]>()
  const context = useContext(UserContext)!;
  const { userInfo } = context;
  const userId = userInfo?.id;

  async function getWishList(userId: string | undefined) {
    const response = await fetch(`http://localhost:5000/api/address/${userId}`);
    const data = await response.json();
    setWishList(data);
  }

  useEffect(() => {
    getWishList(userId)
  }, [])

  return (
    <>
      <div >
        <Card sx={{ margin: 2, padding: 1 }}>
          {wishList?.map((product: Product) => (
            <Box
              key={product.name}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <img src={product.image.url} alt={product.name} style={{ width: '100px' }} />
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="h5">{product.saleprice}</Typography>
              <Typography variant="h5">{product.quantity}</Typography>
            </Box>
          ))}
        </Card>
      </div>
    </>
  )
}
