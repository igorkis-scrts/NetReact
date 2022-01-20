import { PaletteOptions } from "@mui/material";

export function overrideMuiPalette(): PaletteOptions {
  return {
    primary: {
      main: "#103d72",
    },
    secondary: {
      main: "#f78481",
    },
    error: {
      main: "#fd1b14",
    },
    background: {
      default: "#ffffff",
    },
  };
}
