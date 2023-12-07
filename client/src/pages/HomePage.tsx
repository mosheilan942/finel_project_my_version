import Top5Products from '../components/Top5Products'
import Top5Categories from '../components/Top5Categories'
import BannerSide from '../banners/BannerSide';

const HomePage = () => {

  return (
    <>
    <BannerSide/>
    <Top5Categories/>
    <Top5Products/>
    </>
  )
}

export default HomePage;