import { useEffect } from 'react';

import useEnv from '@/hooks/useEnv';

const UseDev = (callback: () => void) => {
  const { isDevelopment } = useEnv();

  useEffect(() => {
    if (isDevelopment) callback();
  }, []);

  return;
};

export default UseDev;
