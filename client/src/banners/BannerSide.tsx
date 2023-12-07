import { useEffect, useState } from 'react';
import BannerInterface  from '../types/Banner';
import {useNavigate}  from 'react-router-dom';
const api = import.meta.env.VITE_API_URI

export default function BannerSide() {
  const [banner, setBanner] = useState<BannerInterface | null>(); 
  const [load, setLoad] = useState(false);
const Navigate = useNavigate()
  async function getProducts() {
    try {
        console.log(`this is url in banner: ${api}/banner/sideBanners`);
      const response = await fetch(`${api}/banner/sideBanners`);
      if (!response.ok) {
        throw new Error('Failed to fetch banner');
      }
      const data = await response.json();
      console.log('this is data of banner',data);
      console.log(data.message);
      setBanner(data.data[0]);
      setLoad(true);
    } catch (error) {
      console.error('Error fetching banner:', error);
      setBanner(null); 
    }
  }
  useEffect(() => {
    getProducts()
  }, []);

  return (
    <>
      {load && (
        <div  style={{ position: 'fixed', height: '500px', left: 0, top: 75, zIndex: 1000 }}>
         <button onClick={()=>{setLoad(false)}}>X</button>
          <img src={banner?.image.url} alt={banner?.image.alt} style={{ width: '100px' }}
           onClick={()=>{Navigate(`/store/product/${banner?.productID}`)}} />
         <button onClick={()=>{setLoad(false)}}>X</button>
        </div>
      ) 
      }
    </>
  );
}
