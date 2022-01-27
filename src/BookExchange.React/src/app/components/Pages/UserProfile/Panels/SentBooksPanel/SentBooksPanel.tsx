import { UserApi } from "@api/User.api";
import { DealsListCard } from "@shared/organisms/Cards/DealsListCard/DealsListCard";
import { PaginatedView } from "@shared/organisms/PaginatedView/PaginatedView";
import { IPanelProps } from "../../models/IPanelProps";


const SentBooksPanel = ({ index, displayIndex }: IPanelProps) => {
  return (
    <div hidden={displayIndex !== index}>
      <PaginatedView
        title="Sent Books"
        listCard={DealsListCard}
        squareCard={DealsListCard}
        service={UserApi.getDealsFromUser}
      />
    </div>
  );
};

export { SentBooksPanel };