import { createContext, useState } from "react";


 export const bookmarksContext = createContext(null)



export default function BookmarksContextProvider({ children }) {

  const [isBookmarked, setIsBookmarked] = useState<number[]>([]);

  const handleAddBookMark = (id: number) => {
    if (isBookmarked.includes(id)) {
      setIsBookmarked((prev) => prev.filter((item) => item !== id));
    }
    else {
      setIsBookmarked((prev) => [...prev, id]);
    }
  }

  return (
    <bookmarksContext.Provider value={{ isBookmarked, handleAddBookMark }}>
      {children}
    </bookmarksContext.Provider>

  );
}
