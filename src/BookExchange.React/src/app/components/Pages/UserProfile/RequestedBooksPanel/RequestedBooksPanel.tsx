import { UserApi } from "@api/User.api";
import { RequestListCard } from "@shared/Cards/RequestListCard/RequestListCard";
import { IPanelProps } from "../models/IPanelProps";
import { PaginatedView } from "../PaginatedView/PaginatedView";

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