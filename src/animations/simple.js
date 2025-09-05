export const pageFade = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
    exit:    { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } },
  };
  
  export const riseIn = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.24, ease: "easeOut" } },
  };
  
  export const slideInLeft = {
    initial: { opacity: 0, x: -12 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.24, ease: "easeOut" } },
  };
  