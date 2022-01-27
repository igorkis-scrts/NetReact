import { ICardProps } from "@Pages/UserProfile/models/ICardProps";
import { Post } from "@app/types";
import { SquareCardContainer } from "@shared/molecules/Containers/SquareCardContainer/SquareCardContainer";

const PostSquareCard = ({ cardItem: post, action, actionText }: ICardProps<Post.Post>) => {
  return (
    <SquareCardContainer
      action={() => {
        action?.(post.id);
      }}
      actionText={actionText}
      imagePath={post.book?.thumbnailPath}
    >
      body
    </SquareCardContainer>
  );
};

export { PostSquareCard };
