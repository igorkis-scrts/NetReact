import { styled } from "@mui/material";

export const LoaderBlockRoot = styled("div")(() => ({
  backgroundColor: "rgba(255, 255, 255, 0.36)",
  display: "flex",
  height: "100%",
  position: "absolute",
  textAlign: "center",
  top: 0,
  left: 0,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

export const Holder = styled("div")(() => ({
  height: 64,
  width: 64,
}));