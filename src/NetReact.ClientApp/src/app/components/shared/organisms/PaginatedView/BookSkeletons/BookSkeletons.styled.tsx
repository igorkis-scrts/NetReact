import { styled, Typography, Card, CardContent } from "@mui/material";

export const LoadingSkeletonTypography = styled(Typography)(() => ({
  padding: "8px"
}));

export const SkeletonCard = styled(Card)(() => ({
  margin: "8px 0"
}));


export const LoadingSkeletonContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
}));
