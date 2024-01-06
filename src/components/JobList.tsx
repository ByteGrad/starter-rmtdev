import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
