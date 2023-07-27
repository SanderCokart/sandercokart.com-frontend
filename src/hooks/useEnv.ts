const UseEnv = () => {
  const isTest = process.env.NODE_ENV === 'test';
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';

  return { isTest, isProduction, isDevelopment, env: process.env.NODE_ENV };
};

export default UseEnv;
