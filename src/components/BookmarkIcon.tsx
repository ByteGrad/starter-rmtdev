import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { bookmarksContext } from "../contexts/bookmarkContextProvider";



export default function BookmarkIcon({ id }) {
  const { isBookmarked, handleAddBookMark } = useContext(bookmarksContext);

  return (
    <button
      onClick={(e) => {
        handleAddBookMark(id);
        e.stopPropagation();
        e.preventDefault();
        console.log(id)
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`
        ${isBookmarked.includes(id) ? "filled" : ""}
      `}
      />
    </button>
  );
}
