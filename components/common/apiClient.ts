export const apiClient = {
  async request<T>({
    method,
    url,
    data,
    token,
  }: {
    method: string;
    url: string;
    data?: any;
    token?: string;
  }): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`,
      );
    }

    return response.json();
  },

  get<T>(url: string, token?: string): Promise<T> {
    return this.request<T>({ method: "GET", url, token });
  },

  post<T>(url: string, data: any, token?: string): Promise<T> {
    return this.request<T>({ method: "POST", url, data, token });
  },

  put<T>(url: string, data: any, token?: string): Promise<T> {
    return this.request<T>({ method: "PUT", url, data, token });
  },

  delete<T>(url: string, token?: string): Promise<T> {
    return this.request<T>({ method: "DELETE", url, token });
  },
};

// Base URL from environment variable
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://be-event-registration-project-jpv3.onrender.com/api";
