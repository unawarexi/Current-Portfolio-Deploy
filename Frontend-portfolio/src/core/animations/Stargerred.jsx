export const Animation = {
  initial: {
    opacity: 0,
  },

  animate: {
    y: -30,
    opacity: 1,
    transition: {
      // duration: 2,
      // delay: 0.5,
      type: "spring",
      stiffness: 60,
      damping: 75,
    },
  },

  exit: {
    opacity: 0,
  },
};


{/** ================== the difference here is no y: =========== */}
export const Animating = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
    transition: {
      // duration: 2,
      // delay: 0.5,
      type: "spring",
      stiffness: 60,
      damping: 75,
    },
  },

  exit: {
    opacity: 0,
    y: 0,
  },
};
