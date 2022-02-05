import { Typography, Button } from "@mui/material";
import { Post } from "@app/types";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { CardRoot, Details, Content, Cover, Controls } from "./PostListCard.styled";

const PostListCard = ({ cardItem }: ICardProps<Post>) => {
  return (
    <CardRoot>
      <Details>
        <Content>
          <Typography component="h5" variant="h5">
            {cardItem.book?.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Owner: {cardItem.postedBy?.username}
          </Typography>
          <Typography>ISBN: {cardItem.book?.isbn}</Typography>
          <Typography>Categories: {cardItem.book?.categories?.map((c: any) => c.name).join(", ")}</Typography>
          <Typography>Condition: {cardItem.condition}</Typography>
        </Content>
        <Controls>
          <Button size="small" variant="outlined" color="secondary">
            Cancel
          </Button>
        </Controls>
      </Details>
      <Cover
        image="https://images-na.ssl-images-amazon.com/images/I/41TVwg27ujL._SX331_BO1,204,203,200_.jpg"
        title="Live from space album cover"
      />
    </CardRoot>
  );
};

export { PostListCard };