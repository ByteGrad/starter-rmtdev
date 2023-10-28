import toast from "react-hot-toast";
import { BASE_API_URL } from "./constants";
import { JobItem } from "./types";

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

export const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(
    `${BASE_API_URL}/rmtdev/api/data?search=${searchText}`
  );
  if (!response.ok) {
    // 4xx or 5xx response
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  return await response.json();
};

export const urlContainsHashId = () => {
  const id = +window.location.hash.slice(1);
  return Boolean(id);
};

export const handleError = (error: unknown) => {
  let message = "Fetching data failed.";

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  toast.error(message);
};
