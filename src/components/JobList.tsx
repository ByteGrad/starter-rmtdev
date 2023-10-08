import { memo } from "react";
import { useActiveIdContext, useBookmarksContext } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

const JobList = ({ jobItems, isLoading }: JobListProps) => {
  console.log("JobList rendering...");
  const { bookmarkedJobItems } = useBookmarksContext();
  const { activeJobItemId } = useActiveIdContext();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {jobItems.map((jobItem) => (
        <JobListItem
          key={jobItem.id}
          {...jobItem}
          isActive={jobItem.id === activeJobItemId}
          isBookmarked={bookmarkedJobItems.some(
            (bookmarkedJobItem) => bookmarkedJobItem.id === jobItem.id
          )}
        />
      ))}
    </ul>
  );
};

export default JobList;
