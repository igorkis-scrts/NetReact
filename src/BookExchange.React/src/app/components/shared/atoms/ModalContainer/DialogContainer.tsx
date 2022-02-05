import { EventKey } from "@config/EventRegistry";
import Emitter from "@utils/Emitter";
import { Dialog } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { ContainerDialogContent } from "./DialogContainer.styled";

interface ISignInDialogProps<T extends EventKey> {
  dialogName: T;
  children: ReactElement;
}

const DialogContainer = <T extends EventKey>({ dialogName, children }: ISignInDialogProps<T>) => {
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
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <ContainerDialogContent>{children}</ContainerDialogContent>
    </Dialog>
  );
};

export { DialogContainer };
