import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

type Props = {
  id: number;
  disabled?: boolean;
};

export default function BookmarkIcon({ id, disabled }: Props) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  return (
    <button
      className={`bookmark-btn ${disabled ? "bookmark-btn-disabled" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!disabled) {
          handleToggleBookmark(id);
        }
      }}
    >
      <BookmarkFilledIcon
        className={bookmarkedIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
