import { Dialog } from "@mui/material";
import { ReactElement } from "react";
import { ContainerDialogContent } from "./DialogContainer.styled";

interface ISignInDialogProps {
  isOpen: boolean;
  toggle: () => void;

  children: ReactElement;
}

const DialogContainer = ({ isOpen, children, toggle }: ISignInDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={toggle}>
      <ContainerDialogContent>{children}</ContainerDialogContent>
    </Dialog>
  );
};

export { DialogContainer };
