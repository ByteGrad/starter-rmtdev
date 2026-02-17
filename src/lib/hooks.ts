import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within a ActiveIdContextProvider",
    );
  }
  const { activeId } = context;

  return {
    activeId,
  } as const;
}

export function useActiveJobItem() {
  const { activeId } = useActiveIdContext();
  const { jobItem, isLoading } = useJobItem(activeId);
  return { jobItem, isLoading } as const;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "BookmarkIcon must be used within a BookmarksContextProvider",
    );
  }
  const { bookmarkedIds, handleToggleBookmark, bookmarkedJobItems, isLoading } =
    context;

  return {
    bookmarkedIds,
    handleToggleBookmark,
    bookmarkedJobItems,
    isLoading,
  } as const;
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${id}`);
  // 4xx or 5xx
  if (!res.ok) {
    const errData = await res.json();
    toast.error(errData.description);
    throw new Error(errData.description);
  }

  const data = await res.json();
  return data;
};

const fetchJobItems = async (
  searchText: string,
): Promise<JobItemsApiResponse> => {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
  // 4xx or 5xx
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.description || JSON.stringify(errData));
  }
  const data = await res.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => (id ? fetchJobItem(id) : null),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const jobItem = data?.jobItem;
  return { jobItem, isLoading } as const;
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: (err: Error) => {
        throw new Error(err.message);
      },
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);
  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading } as const;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider",
    );
  }
  const {
    jobItems,
    isLoading,
    totalNumberOfPages,
    totalNumberOfResults,
    currentPage,
    sortBy,
    handleChangePage,
    handleChangeSortBy,
  } = context;

  return {
    jobItems,
    isLoading,
    totalNumberOfPages,
    totalNumberOfResults,
    currentPage,
    sortBy,
    handleChangePage,
    handleChangeSortBy,
  } as const;
}

export function useLocalStorage<T>(key: string) {
  const valueFromLocalStorage = JSON.parse(localStorage.getItem(key) || "[]");

  const [value, setValue] = useState<T>(valueFromLocalStorage);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void,
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}

export function useSearchQuery(searchText: string) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchJobItems(searchText),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!searchText,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return { jobItems: data?.jobItems, isLoading } as const;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider",
    );
  }
  const { searchText, originalSearchText, handleChangeSearchText } = context;

  return {
    searchText,
    originalSearchText,
    handleChangeSearchText,
  } as const;
}
