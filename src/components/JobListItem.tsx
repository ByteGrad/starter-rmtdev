import { JobItem } from "../lib/types";

// type JobListItemProps = {
//   jobItem: JobItem;
// };

type JobListItemProps = {
  badgeLetters: string;
  title: string;
  company: string;
  duration: string;
  salary: string;
  location: string;
  daysAgo: number;
};

// export default function JobListItem({ jobItem }: JobListItemProps) {
export default function JobListItem({
  badgeLetters,
  title,
  company,
  duration,
  salary,
  location,
  daysAgo,
}: JobListItemProps) {
  return (
    <li className="job-item ${state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''}">
      <a className="job-item__link" href="${jobItem.id}">
        <div className="job-item__badge">{badgeLetters}</div>
        <div className="job-item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="job-item__company">{company}</p>
          <div className="job-item__extras">
            <p className="job-item__extra">
              <i className="fa-solid fa-clock job-item__extra-icon"></i>
              {duration}
            </p>
            <p className="job-item__extra">
              <i className="fa-solid fa-money-bill job-item__extra-icon"></i>
              {salary}
            </p>
            <p className="job-item__extra">
              <i className="fa-solid fa-location-dot job-item__extra-icon"></i>{" "}
              {location}
            </p>
          </div>
        </div>
        <div className="job-item__right">
          <i className="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
          <time className="job-item__time">{daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
