import { UserApi } from "@api/User.api";
import { RequestListCard } from "@shared/Cards/RequestListCard/RequestListCard";
import { PaginatedView } from "../PaginatedView/PaginatedView";

interface IRequestedBooksPanelProps {
  index: number;
  displayIndex: number;
}

const RequestedBooksPanel = ({ index, displayIndex }: IRequestedBooksPanelProps) => {
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