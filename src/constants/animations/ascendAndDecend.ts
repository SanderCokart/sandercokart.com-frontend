export const descendVariant = {
  hidden: { opacity: 0, y: 100, transition: { duration: 0.25, y: { duration: 0.5, ease: 'easeIn' } } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, y: { duration: 0.5, ease: 'easeIn' } } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.25, y: { duration: 0.5, ease: 'easeIn' } } },
};

export const ascendVariant = {
  hidden: { opacity: 0, y: -100, transition: { duration: 0.25, y: { duration: 0.5, ease: 'easeIn' } } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, y: { duration: 0.5, ease: 'easeIn' } } },
  exit: { opacity: 0, y: -100, transition: { duration: 0.25, y: { duration: 0.5, ease: 'easeIn' } } },
};
