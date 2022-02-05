import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { BorderLinearProgress, FileNameDiv, UploadButton } from "./UploadFile.styled";

interface IUploadFileProps {
  setCurrentFile: any;
  currentFile: any;
}

const UploadFile = ({ setCurrentFile, currentFile }: IUploadFileProps) => {
  const [selectedFiles, setSelectedFiles] = useState<any>();
  const [progress, setProgress] = useState(0);

  const selectFile = (e: any) => {
    setSelectedFiles(e.target.files);
  };

  const upload = (e: any) => {
    setProgress(0);
    setCurrentFile(selectedFiles[0]);
  };

  return (
    <div className="mg20">
      {currentFile && (
        <Box className="mb25" display="flex" alignItems="center">
          <Box width="100%" mr={1} mb={2}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">
              {`${progress}%`}
            </Typography>
          </Box>
        </Box>
      )}
      <label htmlFor="btn-upload">
        <input id="btn-upload" name="btn-upload" style={{ display: "none" }} type="file" onChange={selectFile} />
        <UploadButton variant="outlined">Choose Files</UploadButton>
        <Typography style={{ display: "inline-block" }}>Cover Photo</Typography>
      </label>
      <FileNameDiv>{selectedFiles && selectedFiles?.length > 0 ? selectedFiles[0].name : null}</FileNameDiv>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!selectedFiles}
        onClick={(e: any) => upload(e)}
      >
        Upload
      </Button>
    </div>
  );
};

export { UploadFile };
