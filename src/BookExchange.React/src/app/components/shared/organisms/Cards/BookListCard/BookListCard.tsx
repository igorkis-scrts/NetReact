import { Typography } from "@mui/material";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { Book } from "@app/types";
import { ListCardContainer } from "@shared/molecules/Containers/ListCardContainer/ListCardContainer";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../../../Styles/LinkButton";

const BookListCard = ({ cardItem: book, action, actionText }: ICardProps<Book>) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/books/" + book.id);
  };

  return (
    <ListCardContainer
      action={() => {
        action?.(book.id);
      }}
      actionText={actionText}
      imagePath={`${book.thumbnailPath}`}
    >
      <Typography component="h5" variant="h5">
        <LinkButton color="inherit" style={{ textDecoration: "none" }} onClick={handleClick}>
          {book.title}
        </LinkButton>
      </Typography>
      {book.authors?.length !== 0 && (
        <Typography variant="subtitle1" color="textSecondary">
          by {book.authors.map((a) => a.name).join(", ")}
        </Typography>
      )}

      <Typography>ISBN: {book.isbn}</Typography>
      {book.categories.length !== 0 && (
        <Typography>Categories: {book.categories?.map((c) => c.name).join(", ")}</Typography>
      )}
    </ListCardContainer>
  );
};

export { BookListCard };
