import { useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import SideBar from '../../components/SideBar/SideBar';
import './Dashboard.css';
import { imagesDark, imagesLight } from './components/images/images';

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const images = colorMode === 'light' ? imagesLight : imagesDark;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SideBar>
      <div className="slideshow-container">
        <img
          className="slideshow-image"
          src={images[currentImageIndex]}
          alt="slideshow"
        />
        <div className="text-container">
          Rozpocznij przygodę i otwórz się na wydarzenia wokół siebie
        </div>
      </div>
    </SideBar>
  );
};

export default Dashboard;
