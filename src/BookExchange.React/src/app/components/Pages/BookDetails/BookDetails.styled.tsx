import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const BookPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  paddingLeft: theme.spacing(2),
}));

export const BookTitleTypography = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
}));

export const BookCoverImg = styled("img")(({ theme }) => ({
  width: "100%",
}));