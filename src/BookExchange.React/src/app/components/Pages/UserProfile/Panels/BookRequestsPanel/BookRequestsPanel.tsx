import { UserApi } from "@api/User.api";
import { RequestListCard } from "@shared/organisms/Cards/RequestListCard/RequestListCard";
import { PaginatedView } from "@shared/organisms/PaginatedView/PaginatedView";
import { IPanelProps } from "../../models/IPanelProps";

const BookRequestsPanel = ({ index, displayIndex }: IPanelProps) => {
  return (
    <div hidden={displayIndex !== index}>
      <PaginatedView
        title="Requests"
        listCard={RequestListCard}
        squareCard={RequestListCard}
        service={UserApi.getRequestsToUser}
      />
    </div>
  );
};

export { BookRequestsPanel };
