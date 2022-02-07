import { ApiResponse } from "@utils/api/ApiResponse";
import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";

const useFetch = <T>(api: (...args: any[]) => Promise<ApiResponse<T>>) => {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<T>();

  const fetch = useCallback(
    async (...fetchArgs: any[]) => {
      try {
        setLoading(true);

        const response = await api(...fetchArgs);

        if(response.data) {
          setData(response.data);
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" });
      } finally {
        setLoading(false);
      }
    },
    [api, enqueueSnackbar]
  );
  return { isLoading, data, fetch };
};
export { useFetch };
