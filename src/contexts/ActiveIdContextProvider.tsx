import React, { createContext } from "react";
import { JobItem } from "../lib/types";
import { useActiveJobItemId } from "../lib/hooks";

type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

type ActiveIdContext = {
  activeJobItemId: JobItem["id"] | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

export default function ActiveIdContextProvider({
  children,
}: ActiveIdContextProviderProps) {
  const activeJobItemId = useActiveJobItemId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeJobItemId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
