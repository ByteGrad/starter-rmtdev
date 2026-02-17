import { createContext, ReactNode } from "react";
import { useActiveId } from "../lib/hooks";

type Props = {
  children: ReactNode;
};

type ActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

function ActiveIdContextProvider({ children }: Props) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}

export default ActiveIdContextProvider;
