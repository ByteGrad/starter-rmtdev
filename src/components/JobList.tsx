import { useActiveId } from "../lib/hooks";
import { jobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type jobListProps = {
  jobItems: jobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: jobListProps) {
  const activeId = useActiveId();

  return (
    <ul className="job-list">
      {isLoading ? <Spinner /> : null}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            jobItem={jobItem}
            key={jobItem.id}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
