import axios, { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string | undefined => {
  const isAxiosError = axios.isAxiosError(error);

  if (isAxiosError) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.data) {
      return axiosError.response.data;
    } else {
      return "An unknown error has occured.";
    }
  }
};
