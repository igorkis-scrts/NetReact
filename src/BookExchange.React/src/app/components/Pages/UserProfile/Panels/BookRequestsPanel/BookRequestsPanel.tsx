import { RequestApi } from "@api/Request.api";
import { UserApi } from "@api/User.api";
import { RequestListCard } from "@shared/organisms/Cards/RequestListCard/RequestListCard";
import { PaginatedView } from "@shared/organisms/PaginatedView/PaginatedView";
import { useSnackbar } from "notistack";
import { IPanelProps } from "../../models/IPanelProps";

const BookRequestsPanel = ({ index, displayIndex }: IPanelProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const approveRequest = async (requestId: number) => {
    try {
      await RequestApi.acceptRequest(requestId);
      enqueueSnackbar("Request approved successfully! Book awaiting delivery", {
        variant: "success",
      });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  return (
    <div hidden={displayIndex !== index}>
      <PaginatedView
        title="Requests"
        listCard={RequestListCard}
        squareCard={RequestListCard}
        service={UserApi.getRequestsToUser}
        cardAction={approveRequest}
        cardActionText="Approve"
      />
    </div>
  );
};

export { BookRequestsPanel };