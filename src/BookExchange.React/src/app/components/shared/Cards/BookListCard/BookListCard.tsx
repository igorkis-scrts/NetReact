import { Typography, Link } from "@mui/material";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { ListCardContainer } from "../../Containers/ListCardContainer/ListCardContainer";
import { Book } from "@app/types";

const BookListCard = ({ cardItem: book, action, actionText }: ICardProps<Book.Book>) => {
  return (
    <ListCardContainer
      action={() => {
        action?.(book.id);
      }}
      actionText={actionText}
      imagePath={`${book.thumbnailPath}`}
    >
      <Typography component="h5" variant="h5">
        <Link href={"book/" + book.id} style={{ textDecoration: "none" }} color="inherit">
          {book.title}
        </Link>
      </Typography>
      {book.authors?.length !== 0 && (
        <Typography variant="subtitle1" color="textSecondary">
          by {book.authors.map((a) => a.name).join(", ")}
        </Typography>
      )}

      <Typography>ISBN: {book.isbn}</Typography>
      {book.categories.length !== 0 && (
        <Typography>Categories: {book.categories?.map((c) => c.label).join(", ")}</Typography>
      )}
    </ListCardContainer>
  );
};

export { BookListCard };
