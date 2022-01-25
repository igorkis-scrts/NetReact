import { UserApi } from "@api/User.api";
import { DealsListCard } from "@shared/Cards/DealsListCard/DealsListCard";
import { IPanelProps } from "../models/IPanelProps";
import { PaginatedView } from "../PaginatedView/PaginatedView";

const AwaitedBooksPanel = ({ index, displayIndex }: IPanelProps) => {
  return (
    <div hidden={displayIndex !== index}>
      <PaginatedView
        title="Requested Books"
        listCard={DealsListCard}
        squareCard={DealsListCard}
        service={UserApi.getDealsToUser}
      />
    </div>
  );
};

export { AwaitedBooksPanel };