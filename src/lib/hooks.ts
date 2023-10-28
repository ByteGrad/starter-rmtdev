import { useContext, useEffect, useState } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { useQuery } from "@tanstack/react-query";
import { JobItem, JobItemDetailed } from "./types";
import { BASE_API_URL } from "./constants";
import { fetchJobItems, handleError } from "./utils";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";

// ------------------------------

export function useJobItems(searchText: string) {
  const { data, isLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      enabled: Boolean(searchText),
      staleTime: 1000 * 20,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );

  // return {
  //   data,
  //   isFetching,
  //   error,
  // };
  // return array for easier renaming
  return [data?.jobItems || [], isLoading] as const;
}

// ------------------------------

type JobItemDetailedApiResponse = {
  public: boolean;
  jobItem: JobItemDetailed;
};

const fetchJobItemDetailed = async (
  id: number
): Promise<JobItemDetailedApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/rmtdev/api/data/${id}`);
  if (!response.ok) {
    // 4xx or 5xx response
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  return await response.json();
};

export function useJobItemDetailed() {
  const [id, setId] = useState<number | null>(null);
  const { data, isLoading } = useQuery(
    ["job-item", id],
    () => fetchJobItemDetailed(id!),
    {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  useEffect(() => {
    // set up listener for hash change in url
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setId(id);
    };

    window.addEventListener("hashchange", handleHashChange);
    // for initial load
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return [data?.jobItem, isLoading] as const;
}

// ------------------------------

export function useActiveJobItemId() {
  const [activeJobItemId, setActiveJobItemId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveJobItemId(id);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeJobItemId;
}

// ------------------------------

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

// ------------------------------

// ------------------------------

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "BookmarksContext must be used within a BookmarksContextProvider"
    );
  }
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error(
      "ActiveIdContext must be used within an ActiveIdContextProvider"
    );
  }
  return context;
}
