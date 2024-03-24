import { useState } from "react";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { useActiveId } from "../lib/hooks";

export function JobList({ jobItems, loading }) {
  const activeId = useActiveId();

  return <ul className="job-list">
    {loading && <Spinner />}



    {!loading && jobItems.map((jobItem) => {
      return <li key={jobItem.id}>
        <JobListItem jobItem={jobItem} isActive={jobItem.id === activeId} />
      </li>;

    }
    )}

  </ul>;
}

export default JobList;
