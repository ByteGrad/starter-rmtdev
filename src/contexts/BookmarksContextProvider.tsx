import React, { createContext, useState, useEffect } from "react";
import { JobItem } from "../lib/types";

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

type BookmarksContext = {
  bookmarkedJobItems: JobItem[];
  setBookmarkedJobItems: React.Dispatch<React.SetStateAction<JobItem[]>>;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const [bookmarkedJobItems, setBookmarkedJobItems] = useState<JobItem[]>(() =>
    JSON.parse(localStorage.getItem("bookmarkedJobItems") || "[]")
  );

  useEffect(() => {
    localStorage.setItem(
      "bookmarkedJobItems",
      JSON.stringify(bookmarkedJobItems)
    );
  }, [bookmarkedJobItems]);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedJobItems,
        setBookmarkedJobItems,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
