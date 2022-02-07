import { UserApi } from "@api/User.api";
import { DealsListCard } from "@shared/organisms/Cards/DealsListCard/DealsListCard";
import { IPanelProps } from "../../models/IPanelProps";
import { PaginatedView } from "@shared/organisms/PaginatedView/PaginatedView";

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