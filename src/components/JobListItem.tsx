import BookmarkIcon from "./BookmarkIcon";

export default function JobListItem() {
  return (
    <li className="job-item">
      <a className="job-item__link">
        <div className="job-item__badge">9T</div>

        <div className="job-item__middle">
          <h3 className="third-heading">Front End React Engineer</h3>
          <p className="job-item__company">9th Tech</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">2d</time>
        </div>
      </a>
    </li>
  );
}
