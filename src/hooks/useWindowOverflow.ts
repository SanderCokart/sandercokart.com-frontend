import { useEffect, useState } from 'react';

const UseWindowOverflow = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOverflowing(document.body.scrollHeight > window.innerHeight);
    };

    setIsOverflowing(document.body.scrollHeight > window.innerHeight);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isOverflowing };
};

export default UseWindowOverflow;
