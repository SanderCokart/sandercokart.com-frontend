'use client';

import type { ReactNode } from 'react';

import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import api from '@/functions/shared/api';

interface GlobalProvidersProps {
  children: ReactNode;
}
const fetcher = (url: string, config: object) =>
  api.simpleGet(url, config).then(({ data }) => {
    return data;
  });

const GlobalProviders = (props: GlobalProvidersProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider attribute="class">{props.children}</ThemeProvider>
    </SWRConfig>
  );
};

export default GlobalProviders;
