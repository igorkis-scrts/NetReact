import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";

export const RootGrid = styled(Grid)(() => ({
  minHeight: "calc(100vh - 96px)"
}));


export const SadIcon = styled(SentimentVeryDissatisfiedIcon)(() => ({
  width: "48px",
  height: "48px"
}));
