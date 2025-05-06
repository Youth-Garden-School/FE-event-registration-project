import axios, { AxiosRequestConfig, AxiosError } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://be-event-registration-project-jpv3.onrender.com/api";

export const getAccessToken = (): string => {
  return localStorage.getItem("ACCESS_TOKEN") || "";
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem("ACCESS_TOKEN", token);
};

export const getRefreshToken = (): string => {
  return localStorage.getItem("refresh_token") || "";
};

export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
        ...config?.headers,
      },
      ...config,
    });
    return response.data.result || response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      // Attempt to refresh token
      try {
        const refreshData = await axios.post(`${API_URL}/auths/refresh`, {
          refreshToken: getRefreshToken(),
        });
        const newAccessToken = refreshData.data.result.accessToken;
        setAccessToken(newAccessToken);
        localStorage.setItem(
          "refresh_token",
          refreshData.data.result.refreshToken,
        );

        // Retry original request with new token
        const retryResponse = await axios({
          method,
          url: `${API_URL}${endpoint}`,
          data,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            "Content-Type": "application/json",
            ...config?.headers,
          },
          ...config,
        });
        return retryResponse.data.result || retryResponse.data;
      } catch (refreshError) {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("refresh_token");
        throw new Error("Session expired. Please log in again.");
      }
    }
    throw new Error(`API request failed: ${axiosError.message}`);
  }
};
