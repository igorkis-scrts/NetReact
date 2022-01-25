import { Typography } from "@mui/material";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { Deal } from "@app/types";
import { ListCardContainer } from "../../Containers/ListCardContainer/ListCardContainer";

const DealsListCard = ({ cardItem: deal, action, actionText }: ICardProps<Deal.Deal>) => {
  return (
    <ListCardContainer
      action={() => {
        action?.(deal.id);
      }}
      actionText={actionText}
      imagePath={deal?.post?.book?.thumbnailPath || ""}
    >
      <Typography component="h5" variant="h5">
        {deal?.post?.book?.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Book Condition: {deal?.post?.condition}
      </Typography>
      <Typography>Deal Status: {deal.dealStatus}</Typography>
      <Typography>Book Giver: {deal?.post?.postedBy?.username}</Typography>
      <Typography>Book Taker: {deal?.bookTaker?.username}</Typography>
    </ListCardContainer>
  );
};

export { DealsListCard };