import { CircularProgress, CircularProgressProps } from "@mui/material";
import React from "react";

interface ILoaderBlockOwnProps {
  isLoading: boolean;
}

type Props = ILoaderBlockOwnProps & CircularProgressProps;

const Loader = (props: Props) => {
  const { isLoading, ...rest } = props;

  return <CircularProgress sx={{ visibility: isLoading ? "visible" : "hidden" }} color={"primary"} {...rest} />;
};

export { Loader };
