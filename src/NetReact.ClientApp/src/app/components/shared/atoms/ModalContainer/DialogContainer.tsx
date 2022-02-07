import { EventKey } from "@config/EventRegistry";
import { Close } from "@mui/icons-material";
import Emitter from "@utils/Emitter";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

import React, { ReactElement, useEffect, useState } from "react";
import { ContainerDialogContent } from "./DialogContainer.styled";

interface ISignInDialogProps<T extends EventKey> {
  dialogTitle?: string;
  dialogName: T;
  children: ReactElement;

  disableBackdropClick?: boolean;
}

const DialogContainer = <T extends EventKey>({
  dialogTitle,
  dialogName,
  children,
  disableBackdropClick,
}: ISignInDialogProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const action = (open: boolean) => {
      setIsOpen(open);
    };

    Emitter.subscribe(dialogName, action);

    return () => {
      Emitter.unsubscribe(dialogName, action);
    };
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={(event, reason) => {
        if (disableBackdropClick && reason === "backdropClick") {
          return;
        }

        setIsOpen(false);
      }}
    >
      {dialogTitle && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {dialogTitle}
          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
      )}
      <ContainerDialogContent>{children}</ContainerDialogContent>
    </Dialog>
  );
};

export { DialogContainer };
