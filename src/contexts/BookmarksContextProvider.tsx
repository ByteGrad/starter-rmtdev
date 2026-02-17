import { createContext, ReactNode } from "react";
import { useLocalStorage, useJobItems } from "../lib/hooks";
import { JobItemExpanded } from "../lib/types";

type Props = {
  children: ReactNode;
};

type BookmarksContext = {
  bookmarkedIds: number[];
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
  handleToggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

function BookmarksContextProvider({ children }: Props) {
  const [bookmarkedIds, setBookmarkedIds] =
    useLocalStorage<number[]>("bookmarkedIds");

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksContextProvider;
