// Grid: cards appear one by one
export const gridStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.08 }
    }
  };
  
  export const cardUp = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
    exit: { y: 24, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
  };
  
  // Sidebar filters: slide in from left
  export const filtersContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 }
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.25, ease: "easeIn" } } // all disappear
  };
  
  export const sectionTitle = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } }
  };
  
  export const filterItemLeft = {
    hidden: { x: -16, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.28, ease: "easeOut" } }
  };
  