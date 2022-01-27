import { Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { overrideMuiPalette } from "./overrides/overrideMuiPalette";
import { overrideTypography } from "./overrides/overrideTypography";

export function createAppTheme(): Theme {
  return createTheme({
    palette: overrideMuiPalette(),
    typography: overrideTypography()
  });
}
