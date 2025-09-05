// Row slides from its side
export const rowLeft = {
    hidden: { x: -32, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };
  export const rowRight = {
    hidden: { x: 32, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };
  
  // Pop for center node / bubble
  export const dotPop = {
    hidden: { scale: 0.6, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 280, damping: 18 } },
  };
  