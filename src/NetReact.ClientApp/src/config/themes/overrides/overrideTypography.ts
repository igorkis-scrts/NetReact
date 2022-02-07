import { TypographyOptions } from "@mui/material/styles/createTypography";

export function overrideTypography(): TypographyOptions {
  return {
    fontFamily: [
      "-apple-system",
      "'Merriweather'",
      "'Alice'",
      "normal",
    ].join(","),
  };
}
