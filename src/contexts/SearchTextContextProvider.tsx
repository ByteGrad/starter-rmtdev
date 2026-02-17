import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "../lib/hooks";

type Props = {
  children: ReactNode;
};

type SearchTextContext = {
  searchText: string;
  originalSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

function SearchTextContextProvider({ children }: Props) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText: debouncedSearchText,
        originalSearchText: searchText,
        handleChangeSearchText: handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}

export default SearchTextContextProvider;
