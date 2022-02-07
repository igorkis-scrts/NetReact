import { styled, Card, Grid } from "@mui/material";

export const ProfileTopCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const ProfileRootGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));
