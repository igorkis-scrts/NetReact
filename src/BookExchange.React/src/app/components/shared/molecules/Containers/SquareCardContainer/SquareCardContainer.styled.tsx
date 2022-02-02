import { styled, Card, CardContent, CardMedia } from "@mui/material";

export const CardRoot = styled(Card)(() => ({
  maxWidth: 345,
}));

export const CardContentSquare = styled(CardContent)(() => ({
  height: 160,
  overflow: "hidden",
}));

export const Media = styled(CardMedia)(() => ({
  height: 200,
}));

