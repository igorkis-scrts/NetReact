import { CircularProgress } from "@mui/material";
import React from "react";
import { LoaderBlockRoot, Holder } from "./LoaderBlock.styled";


const LoaderBlock = () => {
  return (
    <LoaderBlockRoot>
      <Holder>
        <CircularProgress color={"primary"} />
      </Holder>
    </LoaderBlockRoot>
  );
};

export { LoaderBlock };
