import { useEffect, useState } from "react";

export function useJobItems(searchInputText: string) {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchInputText) return;

    const fetchJobData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchInputText}`
      );

      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchJobData();
  }, [searchInputText]);

  return { jobItemsSliced, isLoading };
}
