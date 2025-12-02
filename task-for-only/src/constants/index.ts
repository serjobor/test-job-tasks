// Animation constants
export const ANIMATION_DURATION = 600;
export const TRANSITION_FAST = 150;
export const TRANSITION_SLOW = 1000;

// Circle rotation angles for different periods
export const ROTATION_ANGLES: Record<number, number> = {
  1: -60,
  2: -120,
  3: -180,
  4: -240,
  5: -300,
  6: 0
};

// Circle positioning
export const CIRCLE_RADIUS = 265;
export const ANGLE_STEP = 60; // 360 / 6 periods

// CSS custom properties
export const CSS_VARS = {
  CIRCLE_SIZE: '530px',
  DOT_SIZE: '6px',
  DOT_SIZE_HOVER: '56px',
  DOT_SIZE_ACTIVE: '56px'
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024
} as const;
