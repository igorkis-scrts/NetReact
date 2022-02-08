import { Reorder } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import Grid from "@mui/material/Grid";

export const FilterIconsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
}));

export const ReorderIcon = styled(Reorder)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

export const ViewComfyIconButton = styled(IconButton)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

