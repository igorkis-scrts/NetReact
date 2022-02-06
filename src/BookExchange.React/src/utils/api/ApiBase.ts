import { API_BASE_URL } from "@config/Constants";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "./ApiResponse";

export class ApiBase {
  protected static async get<TResponseData = any>(
    url: string,
    resolveError = false
  ): Promise<ApiResponse<TResponseData>> {
    const apiResponse = new ApiResponse<TResponseData>();

    await axios
      .get<TResponseData>(`${API_BASE_URL}/api${url}`, {
        headers: {
          Authorization: this.getUserToken(),
        },
      })
      .then((response: any) => {
        apiResponse.data = response.data;
      })
      .catch((reason: AxiosError) => {
        this.resolveError(reason, apiResponse, resolveError);
      });

    return apiResponse;
  }

  protected static async post<TResponseData = any>(
    url: string,
    request?: unknown,
    resolveError = false
  ): Promise<ApiResponse<TResponseData>> {
    const apiResponse = new ApiResponse<TResponseData>();

    await axios
      .post<TResponseData>(`${API_BASE_URL}/api${url}`, request, {
        headers: {
          Authorization: this.getUserToken(),
        },
      })
      .then((response: any) => {
        apiResponse.data = response.data;
      })
      .catch((reason: AxiosError) => {
        this.resolveError(reason, apiResponse, resolveError);
      });

    return apiResponse;
  }

  protected static async put<TResponseData = any>(
    url: string,
    resolveError = false
  ): Promise<ApiResponse<TResponseData>> {
    const apiResponse = new ApiResponse<TResponseData>();

    await axios
      .put<TResponseData>(`${API_BASE_URL}/api${url}`, {
        headers: {
          Authorization: this.getUserToken(),
          "Content-Type": "application/json",
        },
      })
      .then((response: any) => {
        apiResponse.data = response.data;
      })
      .catch((reason: AxiosError) => {
        this.resolveError(reason, apiResponse, resolveError);
      });

    return apiResponse;
  }

  private static resolveError(reason: AxiosError, apiResponse: ApiResponse, resolveError: boolean): void {
    if (resolveError) {
      apiResponse.error = reason.message;
      apiResponse.statusCode = reason.response!.status;
    } else {
      throw new Error(reason.message);
    }
  }

  private static getUserToken(): string {
    return "Bearer " + localStorage.getItem("token");
  }
}
