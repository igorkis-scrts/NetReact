import { styled, Avatar, Paper } from "@mui/material";

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

export const MainPaper = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));