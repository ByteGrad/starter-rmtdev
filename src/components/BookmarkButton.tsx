import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";
import { JobItemDetailed } from "../lib/types";

type BookmarkButtonProps = {
  jobItemDetailed: JobItemDetailed;
};

export default function BookmarkButton({
  jobItemDetailed,
}: BookmarkButtonProps) {
  const { bookmarkedJobItems, setBookmarkedJobItems } = useBookmarksContext();

  const handleBookmark = () => {
    setBookmarkedJobItems((prevBookmarkedJobItems) => {
      const isBookmarked = prevBookmarkedJobItems.some(
        (bookmarkedJobItem) => bookmarkedJobItem.id === jobItemDetailed?.id
      );

      if (isBookmarked) {
        return prevBookmarkedJobItems.filter(
          (bookmarkedJobItem) => bookmarkedJobItem.id !== jobItemDetailed?.id
        );
      } else {
        return [...prevBookmarkedJobItems, jobItemDetailed];
      }
    });
  };

  return (
    <button onClick={handleBookmark} className="bookmark-btn">
      <BookmarkFilledIcon
        className={`${
          bookmarkedJobItems.some(
            (bookmarkedJobItem) => bookmarkedJobItem.id === jobItemDetailed?.id
          )
            ? "filled"
            : ""
        }`}
      />
    </button>
  );
}
