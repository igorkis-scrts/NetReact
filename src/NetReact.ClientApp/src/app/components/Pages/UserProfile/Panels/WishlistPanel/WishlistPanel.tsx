import { UserApi } from "@api/User.api";
import { BookListCard } from "@shared/organisms/Cards/BookListCard/BookListCard";
import { BookSquareCard } from "@shared/organisms/Cards/BookSquareCard/BookSquareCard";
import { PaginatedView } from "@shared/organisms/PaginatedView/PaginatedView";
import { IPanelProps } from "../../models/IPanelProps";


const WishlistPanel = ({ index, displayIndex }: IPanelProps) => {
  return (
    <div hidden={displayIndex !== index}>
      <PaginatedView
        title="Wishlist"
        listCard={BookListCard}
        squareCard={BookSquareCard}
        service={UserApi.getWishedBooks}
      />
    </div>
  );
};

export { WishlistPanel };