import { styled, Card, CardContent, CardMedia } from "@mui/material";

export const CardRoot = styled(Card)(() => ({
  display: "flex",
  justifyContent: "space-between",
  minHeight: 200,
}));

export const Details = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const ListCardContent = styled(CardContent)(() => ({
  flex: "1 0 auto",
}));

export const Controls = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
}));

export const Cover = styled(CardMedia)(() => ({
  width: 150,
}));