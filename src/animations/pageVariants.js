export const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" }, // 👈 faster enter
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.2, ease: "easeIn" },   // 👈 faster exit
    },
  };
  