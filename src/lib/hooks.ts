import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toast } from "react-hot-toast";
import { handleErrors } from "./utils";

type jobItemApiResponse = {
  public: boolean;
  jobItem: jobItemExpanded;
  jobItems: jobItemExpanded[];
}

const fetchJobItems = async (searchText: string): Promise<jobItemApiResponse> => {
  const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
}

const fetchJobItem = async (id: number): Promise<jobItemApiResponse> => {



  const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data/${id}`)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);

  }
  const data = await response.json();
  return data
}

export function useJobItem(id: number | null) {

  const { data: queryData, isInitialLoading } = useQuery(['jobItem', id], () => id ? fetchJobItem(id) : null,
    {
      staleTime: 1000,
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: !!id,
      onError: (error) => {
        console.error(error);
      }

    },

  );

  const jobItem = queryData?.jobItem;
  return [jobItem, isInitialLoading] as const;
}





export function useDeBounce<T>(value: T, delay: number): T {
  const [deBouncedValue, setDeBouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDeBouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [value, delay])

  return deBouncedValue;
}

export function useJobItems(searchText: string) {

  //Use the useQuery hook to fetch the job items from the API.

  const { data: data, loading } = useQuery(['jobItems', searchText], () => {

    if (!searchText) return null;
    return fetchJobItems(searchText);
  }, {
    staleTime: 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!searchText,
    onError: handleErrors,

  }
  )

  const jobItems = data?.jobItems ?? [];
  return [jobItems, loading] as const;
}
// const [jobItems, setJobItems] = useState<JobItem[]>([]);
// const [loading, setLoading] = useState(false);





// useEffect(() => {
//   if (!searchText) return;

//   const fetchJobs = async () => {
//     setLoading(true);

//     const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)

//     const data = await response.json();
//     setJobItems(data.jobItems);


//     setLoading(false);
//   }

//   fetchJobs();
// }, [searchText])

// return [jobItems, loading] as const;






export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +(window.location.hash.slice(1));
      setActiveId(id);
    }

    handleHashChange();

    window.addEventListener('hashchange', () => {
      handleHashChange();
    }
    )

    return () => {
      window.removeEventListener('hashchange', () => {
        handleHashChange();
      })
    }

  }
    , [])

  return activeId;
}
