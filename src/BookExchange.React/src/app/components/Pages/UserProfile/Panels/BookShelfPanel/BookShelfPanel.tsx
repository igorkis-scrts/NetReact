import { UserApi } from "@api/User.api";
import { PostListCard } from "@shared/organisms/Cards/PostListCard/PostListCard";
import { PostSquareCard } from "@shared/organisms/Cards/PostSquareCard/PostSquareCard";
import { PaginatedView } from "@shared/organisms/PaginatedView/PaginatedView";
import { IPanelProps } from "../../models/IPanelProps";

const BookShelfPanel = ({ displayIndex, index }: IPanelProps) => {
  return (
    <div hidden={displayIndex !== index}>
      <PaginatedView
        title="Requested Books"
        listCard={PostListCard}
        squareCard={PostSquareCard}
        service={UserApi.getUserBookshelf}
      />
    </div>
  );
};

export { BookShelfPanel };