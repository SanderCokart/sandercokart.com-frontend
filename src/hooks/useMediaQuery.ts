import { useEffect, useState } from 'react';

type BasicOptions = 'down' | 'up';

type MoreOptions = 'between';

interface BasicMediaQuery {
  from: keyof typeof sizes;
  option: BasicOptions;
}

interface AdvancedMediaQuery {
  from: keyof typeof sizes;
  option: MoreOptions;
  to: keyof typeof sizes;
}

const sizes = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2048px',
  '5xl': '2560px',
  '6xl': '3840px'
} as const;

function useMediaQuery(
  options: BasicMediaQuery | AdvancedMediaQuery = { from: 'sm', option: 'down' }
) {
  const [matches, setMatches] = useState(false);

  const getQuery = () => {
    switch (options.option) {
      case 'down':
        return `all and (max-width: ${sizes[options.from]})`;
      case 'between':
        return `all and (min-width: ${sizes[options.from]}) and (max-width: ${options.to})`;
      default:
        return `all and (min-width: ${sizes[options.from]})`;
    }
  };

  const setDefaults = () => {
    const mediaQuery = window.matchMedia(getQuery());
    setMatches(mediaQuery.matches);
  };

  useEffect(() => {
    window.addEventListener('resize', setDefaults);

    setDefaults();

    return () => {
      window.removeEventListener('resize', setDefaults);
    };
  }, []);

  return matches;
}

export default useMediaQuery;
