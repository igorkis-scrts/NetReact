import { UserApi } from "@api/User.api";
import { RequestListCard } from "@shared/organisms/Cards/RequestListCard/RequestListCard";
import { PaginatedView } from "@shared/organisms/PaginatedView/PaginatedView";
import { IPanelProps } from "../../models/IPanelProps";

const RequestedBooksPanel = ({ index, displayIndex }: IPanelProps) => {
  return (
    <div hidden={displayIndex !== index}>
      <PaginatedView
        title="Requested Books"
        listCard={RequestListCard}
        squareCard={RequestListCard}
        service={UserApi.getRequestsFromUser}
      />
    </div>
  );
};

export { RequestedBooksPanel };