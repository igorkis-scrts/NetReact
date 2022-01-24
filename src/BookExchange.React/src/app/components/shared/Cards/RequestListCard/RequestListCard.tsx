import { Typography } from "@mui/material";
import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { Request } from "@app/types";
import { ListCardContainer } from "../../Containers/ListCardContainer/ListCardContainer";

const RequestListCard = ({ cardItem: request, action, actionText }: ICardProps<Request.Request>) => {
  if (request == null) {
    return <p>No request data</p>;
  }

  return (
    <ListCardContainer
      action={() => {
        action?.(request.id);
      }}
      actionText={actionText}
      imagePath={request.post?.book?.thumbnailPath || ""}
    >
      <Typography component="h5" variant="h5">
        {request.post?.book?.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        by {request.post?.book?.authors?.map((a) => a.name).join(", ")}
      </Typography>
      <Typography>ISBN: {request.post?.book?.isbn}</Typography>
      <Typography>Categories: {request.post?.book?.categories?.map((c) => c.label).join(", ")}</Typography>
      <Typography>Status: {request.status}</Typography>
      <Typography>Book Owner: {request.post?.postedBy?.username}</Typography>
      <Typography>Requested by: {request.user.username}</Typography>
    </ListCardContainer>
  );
};

export { RequestListCard };