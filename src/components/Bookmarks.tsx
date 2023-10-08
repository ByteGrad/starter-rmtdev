// use portal so that the bookmarks list is not affected by the z-index of the header

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import JobListItem from "./JobListItem";
import { useActiveIdContext, useBookmarksContext } from "../lib/hooks";

export default function Bookmarks() {
  const [isOpen, setIsOpen] = useState(false);
  const { bookmarkedJobItems } = useBookmarksContext();
  const { activeJobItemId } = useActiveIdContext();

  useEffect(() => {
    // detect click outside of the bookmarks list
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".job-list--bookmarks") &&
        !target.closest(".bookmarks-btn")
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <section>
      <button onClick={() => setIsOpen(!isOpen)} className="bookmarks-btn">
        Bookmarks <i className="fa-solid fa-caret-down bookmarks-btn__icon"></i>
      </button>

      {isOpen &&
        createPortal(
          <ul className="job-list job-list--bookmarks">
            {bookmarkedJobItems.length === 0 ? (
              <p className="bookmarks__empty">No bookmarks yet</p>
            ) : (
              bookmarkedJobItems.map((jobItem) => (
                <JobListItem
                  key={jobItem.id}
                  {...jobItem}
                  isActive={jobItem.id === activeJobItemId}
                  isBookmarked
                />
              ))
            )}
          </ul>,
          document.body
        )}
    </section>
  );
}
