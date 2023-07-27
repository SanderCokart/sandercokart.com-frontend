export const ascendVariant = {
  hidden: { opacity: 0, y: 100, transition: { duration: 0.25, y: { duration: 0.5 } } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, y: { duration: 0.5 } } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.25, y: { duration: 0.5 } } }
};

export const descendVariant = {
  hidden: { opacity: 0, y: -100, transition: { duration: 0.25, y: { duration: 0.5 } } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, y: { duration: 0.5 } } },
  exit: { opacity: 0, y: -100, transition: { duration: 0.25, y: { duration: 0.5 } } }
};
