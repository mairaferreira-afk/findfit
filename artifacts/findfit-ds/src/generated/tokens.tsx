/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#ffffff",
      "foreground": "#171614",
      "card": "#f5f2ef",
      "cardForeground": "#171614",
      "popover": "#ffffff",
      "popoverForeground": "#171614",
      "primary": "#171614",
      "primaryForeground": "#ffffff",
      "secondary": "#faf9f7",
      "secondaryForeground": "#171614",
      "muted": "#eee9e4",
      "mutedForeground": "#9a938d",
      "accent": "#c9b6a1",
      "accentForeground": "#171614",
      "destructive": "#b91c1c",
      "destructiveForeground": "#ffffff",
      "border": "#d9d4cf",
      "input": "#20201e",
      "ring": "#c9b6a1",
      "chart1": "#171614",
      "chart2": "#9a938d",
      "chart3": "#c9b6a1",
      "chart4": "#77716b",
      "chart5": "#e7e2de",
      "sidebar": "#faf9f7",
      "sidebarForeground": "#171614",
      "sidebarBorder": "#e7e2de",
      "sidebarPrimary": "#171614",
      "sidebarPrimaryForeground": "#ffffff",
      "sidebarAccent": "#f5f2ef",
      "sidebarAccentForeground": "#171614",
      "sidebarRing": "#c9b6a1"
    },
    "dark": {
      "background": "#0e0d0c",
      "foreground": "#f0ede9",
      "card": "#1a1917",
      "cardForeground": "#f0ede9",
      "popover": "#1a1917",
      "popoverForeground": "#f0ede9",
      "primary": "#f0ede9",
      "primaryForeground": "#0e0d0c",
      "secondary": "#262421",
      "secondaryForeground": "#f0ede9",
      "muted": "#201f1d",
      "mutedForeground": "#9a938d",
      "accent": "#c9b6a1",
      "accentForeground": "#0e0d0c",
      "destructive": "#ef4444",
      "destructiveForeground": "#ffffff",
      "border": "#2e2c2a",
      "input": "#3d3b38",
      "ring": "#c9b6a1",
      "chart1": "#f0ede9",
      "chart2": "#9a938d",
      "chart3": "#c9b6a1",
      "chart4": "#77716b",
      "chart5": "#2e2c2a",
      "sidebar": "#0e0d0c",
      "sidebarForeground": "#f0ede9",
      "sidebarBorder": "#2e2c2a",
      "sidebarPrimary": "#c9b6a1",
      "sidebarPrimaryForeground": "#0e0d0c",
      "sidebarAccent": "#1a1917",
      "sidebarAccentForeground": "#f0ede9",
      "sidebarRing": "#c9b6a1"
    }
  },
  "fontFamily": {
    "sans": [
      "DM Sans",
      "sans-serif"
    ],
    "serif": [
      "Georgia",
      "serif"
    ],
    "mono": [
      "ui-monospace",
      "monospace"
    ]
  },
  "radius": "0rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
