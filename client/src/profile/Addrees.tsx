import { useEffect, useState, useContext } from 'react';
import { Typography, Box, Card } from '@mui/material';
import { UserContext } from '../UserContext';
import { Address } from '../types/order';
import { v4 as uuidv4 } from 'uuid';

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [load, setLoad] = useState(false);
  const context = useContext(UserContext)!;
  const { userInfo } = context;
  const userId = userInfo?.id;

  async function getAddresses(userId: string | undefined) {
    try {
      setLoad(true);
      const response = await fetch(`http://localhost:5000/addresses/${userId}`);
      const data = await response.json();
      setAddresses(data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  }

  useEffect(() => {
    if (userId) {
      getAddresses(userId);
    }
  }, [userId]);

  return (
    <div>
        {load ?  (
          addresses?.map((address: Address) => (
            <Card sx={{ margin: 2, padding: 1 }}>
            <Box
              key={uuidv4()}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5">{address.country}</Typography>
              <Typography variant="h5">{address.city}</Typography>
              <Typography variant="h5">{address.street}</Typography>
            </Box>
      </Card>
          ))
        ):(
          <div style={{display:'flex', justifyContent:'center'}}>
          <h1>Address are not avilable</h1>   
             </div>
        )}
    </div>
  );
}
