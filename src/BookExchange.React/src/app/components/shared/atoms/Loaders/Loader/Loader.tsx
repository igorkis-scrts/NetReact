import { CircularProgress, CircularProgressProps } from "@mui/material";
import React from "react";

interface ILoaderProps {
  isLoading: boolean;
}

type Props = ILoaderProps & CircularProgressProps;

const Loader = (props: Props) => {
  const { isLoading, ...rest } = props;

  return <CircularProgress sx={{ visibility: isLoading ? "visible" : "hidden" }} color={"primary"} {...rest} />;
};

export { Loader };
