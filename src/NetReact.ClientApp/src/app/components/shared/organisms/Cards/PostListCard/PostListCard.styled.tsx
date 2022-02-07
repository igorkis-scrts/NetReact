import { styled, Card, CardContent, CardMedia } from "@mui/material";

export const CardRoot = styled(Card)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const Details = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const Content = styled(CardContent)(() => ({
  flex: "1 0 auto",
}));

export const Cover = styled(CardMedia)(() => ({
  width: 151,
}));

export const Controls = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
}));