import { styled, Grid, CardContent, Typography } from "@mui/material";

export const BottomListControls = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export const LoadingSkeletonTypography = styled(Typography)(() => ({
  padding: "8px"
}));

export const LoadingSkeletonContent = styled(CardContent)(() => ({
  // minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
}));
