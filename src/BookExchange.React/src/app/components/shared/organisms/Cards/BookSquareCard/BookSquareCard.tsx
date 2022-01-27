import { Typography, Link } from "@mui/material";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { Book } from "@app/types";
import { SquareCardContainer } from "@shared/molecules/Containers/SquareCardContainer/SquareCardContainer";

const BookSquareCard = ({ cardItem: book, action, actionText }: ICardProps<Book.Book>) => {
  return (
    <SquareCardContainer
      action={() => {
        action?.(book.id);
      }}
      actionText={actionText}
      imagePath={book.thumbnailPath}
    >
      <Typography gutterBottom variant="h5" component="h2">
        <Link href={"book/" + book.id} style={{ textDecoration: "none" }} color="inherit">
          {book.title}
        </Link>
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        by {book.authors?.map((a) => a.name).join(", ")}
      </Typography>
      <Typography>ISBN: {book.isbn}</Typography>
      <Typography>Categories: {book.categories?.map((c) => c.label).join(", ")}</Typography>
    </SquareCardContainer>
  );
};

export { BookSquareCard };