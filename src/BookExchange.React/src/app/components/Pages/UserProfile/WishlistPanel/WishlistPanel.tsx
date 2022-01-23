import { UserApi } from "@api/User.api";
import { BookListCard } from "@shared/Cards/BookListCard/BookListCard";
import { BookSquareCard } from "@shared/Cards/BookSquareCard/BookSquareCard";
import { PaginatedView } from "../PaginatedView/PaginatedView";

interface IWishlistPanelProps {
  index: number;
  displayIndex: number;
}

const WishlistPanel = ({ index, displayIndex }: IWishlistPanelProps) => {
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