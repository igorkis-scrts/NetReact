import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { Book } from "@app/types";
import { SquareCardContainer } from "@shared/molecules/Containers/SquareCardContainer/SquareCardContainer";
import { LinkButton } from "@shared/Styles/LinkButton";

const BookSquareCard = ({ cardItem: book, action, actionText }: ICardProps<Book>) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/books/" + book.id);
  };

  return (
    <SquareCardContainer
      action={() => {
        action?.(book.id);
      }}
      actionText={actionText}
      imagePath={book.thumbnailPath}
    >
      <LinkButton color="inherit" style={{ textDecoration: "none" }} onClick={handleClick}>
        {book.title}
      </LinkButton>
      <Typography variant="subtitle1" color="textSecondary">
        by {book.authors?.map((a) => a.name).join(", ")}
      </Typography>
      <Typography>ISBN: {book.isbn}</Typography>
      <Typography>Categories: {book.categories?.map((c) => c.name).join(", ")}</Typography>
    </SquareCardContainer>
  );
};

export { BookSquareCard };
