import { UserApi } from "@api/User.api";
import { BookListCard } from "@shared/Cards/BookListCard/BookListCard";
import { BookSquareCard } from "@shared/Cards/BookSquareCard/BookSquareCard";
import { IPanelProps } from "../models/IPanelProps";
import { PaginatedView } from "../PaginatedView/PaginatedView";


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