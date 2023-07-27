export const fade = {
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

export const fadeWithDelay = (delay = 0) => ({
  hidden: { opacity: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1, transition: { duration: 0.15, delay } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
});
