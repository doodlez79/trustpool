const configAnimation = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

export const optionsAnim = {
  transitionSpec: {
    open: {
      animation: 'spring' as const,
      config: configAnimation,
    },
    close: {
      animation: 'spring' as const,
      config: configAnimation,
    },
  },
};
