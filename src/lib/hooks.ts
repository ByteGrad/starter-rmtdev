import { useContext, useEffect, useState } from "react";
import { JobItemsContext } from "../contexts/SearchResultsContextProvider";
import { useQuery } from "@tanstack/react-query";
import { JobItem } from "./types";
import toast from "react-hot-toast";

type ApiResponseData = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchData = async (searchText: string): Promise<ApiResponseData> => {
  const response = await fetch(
    `https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`
  );
  if (!response.ok) {
    // 4xx or 5xx response
    throw new Error("Something went wrong");
  }
  return await response.json();
};

export function useJobItems(searchText: string) {
  const { data, isLoading } = useQuery(
    ["job-items", searchText],
    () => fetchData(searchText),
    {
      enabled: Boolean(searchText),
      staleTime: 1000 * 20,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Fetching job items failed."
        ),
    }
  );

  // return {
  //   data,
  //   isFetching,
  //   error,
  // };
  // return array for easier renaming
  return [data?.jobItems, isLoading] as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "JobItemsContext must be used within a JobItemsContextProvider"
    );
  }
  return context;
}
