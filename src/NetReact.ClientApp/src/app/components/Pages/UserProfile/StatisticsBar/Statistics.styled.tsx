import { styled, Grid } from "@mui/material";

export const StatisticsRootGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StatisticsItemGrid = styled(Grid)(() => ({
  alignSelf: "center",
}));