import React, { createContext, useState } from "react";
import { JobItem } from "../lib/types";

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

type JobItemsContext = {
  jobItems: JobItem[];
  setJobItems: React.Dispatch<React.SetStateAction<JobItem[]>>;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        setJobItems,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
