import { CircularProgress, styled } from "@mui/material";
import React from "react";

interface ILoaderBlockProps {
  isLoading: boolean;
  testId?: string;
}

const LoaderBlockRoot = styled("div")(() => ({
  backgroundColor: "rgba(255, 255, 255, 0.36)",
  display: "flex",
  height: "100%",
  position: "absolute",
  textAlign: "center",
  top: 0,
  left: 0,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

const Holder = styled("div")(() => ({
  height: 64,
  width: 64,
}));

const LoaderBlock = (props: ILoaderBlockProps) => {
  const { isLoading } = props;

  return (
    <LoaderBlockRoot sx={{ visibility: isLoading ? "visible" : "hidden" }}>
      <Holder>
        <CircularProgress color={"primary"} />
      </Holder>
    </LoaderBlockRoot>
  );
};

export { LoaderBlock };
