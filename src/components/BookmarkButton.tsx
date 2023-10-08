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
    <button onClick={handleBookmark} className="job-info__bookmark-btn">
      <i
        className={`fa-solid fa-bookmark job-info__bookmark-icon ${
          bookmarkedJobItems.some(
            (bookmarkedJobItem) => bookmarkedJobItem.id === jobItemDetailed?.id
          )
            ? "job-info__bookmark-icon--bookmarked"
            : ""
        }`}
      ></i>
    </button>
  );
}
