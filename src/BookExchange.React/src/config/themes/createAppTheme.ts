import { Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { overrideMuiPalette } from "./overrides/overrideMuiPalette";

export function createAppTheme(): Theme {
  const overriddenPalette = overrideMuiPalette();

  return createTheme({
    palette: overriddenPalette,
  });
}
