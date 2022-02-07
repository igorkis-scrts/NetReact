import { Box, ButtonBase } from "@mui/material";
import { MutableRefObject, useRef, useState } from "react";
import { useController, UseControllerProps, FieldValues } from "react-hook-form";
import { FileInputTextField } from "./FileInput.styled";

type RhfUploadFileProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> & {
  label: string;
};

const FileInput = <TFieldValues extends FieldValues>({
  label,
  ...props
}: RhfUploadFileProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>(props);
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const [attachment, setAttachment] = useState<File>();

  const handleChange = (event: any) => {
    const files: File[] = [...event.target.files];

    if (!files || files.length === 0) {
      return;
    }

    setAttachment(event.target.files[0]);
    field.onChange(event.target.files[0]);
  };

  return (
    <Box position="relative" height={96}>
      <Box position="absolute" top={0} bottom={0} left={0} right={0} mx={2}>
        <FileInputTextField
          variant="standard"
          margin="normal"
          fullWidth
          disabled
          label={label}
          value={attachment?.name || ""}
        />
      </Box>
      <ButtonBase
        sx={{ width: "100%", height: "100%", overflow: "hidden" }}
        component="label"
        onKeyDown={(e: any) => e.code === 32 && ref.current?.click()}
      >
        <input ref={ref} type="file" accept="image/*" hidden onChange={handleChange} name={field.name} />
      </ButtonBase>
    </Box>
  );
};

export { FileInput };
