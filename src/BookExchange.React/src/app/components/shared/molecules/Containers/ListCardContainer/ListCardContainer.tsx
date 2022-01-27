import { Button } from "@mui/material";
import { ImageUtils } from "@utils/image.utils";
import { ReactNode } from "react";
import { CardRoot, Details, ListCardContent, Controls, Cover } from "./ListCardContainer.styled";

interface IListCardContainerProps {
  action?: () => void;
  actionText?: string;
  imagePath: string;
  children: ReactNode;
}

const ListCardContainer = ({ children, action, actionText, imagePath }: IListCardContainerProps) => {
  return (
    <CardRoot>
      <Details>
        <ListCardContent>{children}</ListCardContent>
        <Controls>
          {action && actionText && (
            <Button variant="outlined" color="secondary" size="small" onClick={action}>
              {actionText}
            </Button>
          )}
        </Controls>
      </Details>
      <Cover image={ImageUtils.getAbsolutePath(imagePath)} />
    </CardRoot>
  );
};

export { ListCardContainer };
