import type { IconType } from 'react-icons';

import { IoPlanetSharp } from 'react-icons/io5';

interface Routes {
  href: string;
  label: string;
  Icon: IconType;
}

export const routes: Routes[] = [
  {
    href: '/#discover',
    label: 'Discover',
    Icon: IoPlanetSharp
  }
];
