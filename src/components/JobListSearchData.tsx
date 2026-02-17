import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

function JobListSearchData() {
  const { jobItems, isLoading } = useJobItemsContext();
  return (
    <>
      <JobList jobItems={jobItems} isLoading={isLoading} />
    </>
  );
}

export default JobListSearchData;
