import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

export const FileInputTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root.Mui-disabled": {
    color: theme.palette.text.secondary,
  },
}));