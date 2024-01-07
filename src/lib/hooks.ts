import { useEffect, useState } from "react";
import { jobItem, jobItemDescription } from "./types";
import { BASE_URL } from "./constant";

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<jobItemDescription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJobItemData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      setJobItem(data.jobItem);
      setIsLoading(false);
    };

    fetchJobItemData();
  }, [id]);

  return [jobItem, isLoading] as const;
}

export function useActiveId() {
  const [activeJobItemId, setActiveJobItemId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveJobItemId(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeJobItemId;
}

export function useJobItems(searchInputText: string) {
  const [jobItems, setJobItems] = useState<jobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchInputText) return;

    const fetchJobData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}?search=${searchInputText}`);

      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchJobData();
  }, [searchInputText]);

  return [jobItemsSliced, isLoading] as const;
}
