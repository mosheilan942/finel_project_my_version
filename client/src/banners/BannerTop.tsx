import { useEffect, useState } from 'react';
import  BannerInterface  from '../types/Banner';
import {useNavigate}  from 'react-router-dom';
const api = import.meta.env.VITE_API_URL 

export default function BannerTop() {
  const [banner, setBanner] = useState<BannerInterface | null>(null); 
  const Navigate = useNavigate()

  async function getProducts() {
    try {
      const response = await fetch(`${api}
      /banner/topBanners`);
      if (!response.ok) {
        throw new Error('Failed to fetch banner');
      }
      const data = await response.json();
      console.log(data);
      console.log(data.message);
      setBanner(data.data[0]);
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
      {banner ? (
        <div onClick={()=>{Navigate(`store/product/${banner.productID}`)}} style={{ position: 'fixed', height: '500px', left: 0, top: 75, zIndex: 1000 }}>
          <img  src={banner?.image.url} alt={banner?.image.alt} style={{ width: '100px' }} />
        </div>
      ) : (
        <p>Banner not available</p>
      )}
    </>
  );
}
