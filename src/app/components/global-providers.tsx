'use client';

import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import type { ReactNode } from 'react';

import api from '@/functions/shared/api';

interface GlobalProvidersProps {
  children: ReactNode;
}

const fetcher = (url: string, config: object) =>
  api.simpleGet(url, config).then(({ data }) => {
    return data;
  });

export const GlobalProviders = (props: GlobalProvidersProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider enableSystem attribute="class">
        {props.children}
      </ThemeProvider>
    </SWRConfig>
  );
};
