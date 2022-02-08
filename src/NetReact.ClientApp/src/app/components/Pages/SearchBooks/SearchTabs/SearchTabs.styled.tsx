import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";

export const RootPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  flexGrow: 1,
}));