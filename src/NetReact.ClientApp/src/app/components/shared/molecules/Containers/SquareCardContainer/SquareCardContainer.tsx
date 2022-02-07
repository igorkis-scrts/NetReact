import { CardActionArea, CardActions, Button } from "@mui/material";
import { ImageUtils } from "@utils/image.utils";
import { ReactNode } from "react";
import { CardRoot, Media, CardContentSquare } from "./SquareCardContainer.styled";

interface ISquareCardContainerProps {
  action?: () => void;
  actionText?: string;
  imagePath: string | undefined;
  children: ReactNode;

  contentSquareAction?: () => void;
}

const SquareCardContainer = ({
  action,
  actionText,
  imagePath,
  children,
  contentSquareAction,
}: ISquareCardContainerProps) => {
  return (
    <CardRoot>
      <CardActionArea>
        {imagePath && <Media image={ImageUtils.getAbsolutePath(imagePath)} title="Contemplative Reptile" />}

        <CardContentSquare onClick={contentSquareAction}>{children}</CardContentSquare>
      </CardActionArea>
      <CardActions>
        {action && actionText && (
          <Button variant="outlined" color="secondary" size="small" onClick={action}>
            {actionText}
          </Button>
        )}
      </CardActions>
    </CardRoot>
  );
};

export { SquareCardContainer };