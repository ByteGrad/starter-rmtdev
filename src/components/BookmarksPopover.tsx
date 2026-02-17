import BookmarkIcon from "./BookmarkIcon";

import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";
import Spinner from "./Spinner";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
      {!bookmarkedJobItems && isLoading ? <Spinner /> : null}
      {!bookmarkedJobItems && !isLoading ? (
        <div className="bookmarks__start-view">
          <p>Your Bookmarks</p>
          <p>
            Add bookmarks by clicking the bookmark icon (
            <BookmarkIcon id={1} disabled />) on the job cards.
          </p>
        </div>
      ) : null}
    </div>,
    document.body,
  );
});

export default BookmarksPopover;
