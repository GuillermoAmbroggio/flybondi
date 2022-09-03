import { useEffect, useState } from 'react';

const useSizeScreen = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return isMobile ? 'small' : 'big';
};

export default useSizeScreen;
