import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },

  btnChoose: {
    marginBottom: theme.spacing(2),
  },
}));

export const FileNameDiv = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));