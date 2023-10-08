import { useBookmarksContext, useJobItemDetailed } from "../lib/hooks";
import { urlContainsHashId } from "../lib/utils";
import BookmarkButton from "./BookmarkButton";
import Spinner from "./Spinner";

export default function JobItemContent() {
  const [jobItemDetailed, isLoading] = useJobItemDetailed();

  let content;
  if (isLoading && !urlContainsHashId()) {
    content = <EmptyJobContent />;
  } else if (isLoading && urlContainsHashId()) {
    content = <Spinner />;
  } else if (jobItemDetailed) {
    const {
      title,
      company,
      description,
      qualifications,
      reviews,
      duration,
      salary,
      location,
      daysAgo,
      companyURL,
      coverImgURL,
      badgeLetters,
    } = jobItemDetailed;

    content = (
      <>
        <img src={coverImgURL} alt="#" className="job-details__cover-img" />

        <a className="apply-btn" href={companyURL} target="_blank">
          Apply{" "}
          <i className="fa-solid fa-square-arrow-up-right apply-btn__icon"></i>
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{daysAgo}d</time>

              <BookmarkButton jobItemDetailed={jobItemDetailed} />
            </div>
          </div>
          <div className="job-info__right">
            <h2 className="second-heading">{title}</h2>
            <p className="job-info__company">{company}</p>
            <p className="job-info__description">{description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                {location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">
                Other qualifications may apply
              </p>
            </div>
            <ul className="qualifications__list">
              {qualifications?.map((qualificationText, index) => (
                // careful with key=index, it's not recommended
                <li key={index} className="qualifications__item">
                  {qualificationText}
                </li>
              ))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">
                Recent things people are saying
              </p>
            </div>
            <ul className="reviews__list">
              {reviews?.map((reviewText, index) => (
                // careful with key=index, it's not recommended
                <li key={index} className="reviews__item">
                  {reviewText}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{" "}
            <span className="u-bold">rmtDev</span>, we would really appreciate
            it!
          </p>
        </footer>
      </>
    );
  }

  return (
    <section className="job-details">
      <div className="job-details__content">{content}</div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <div className="job-details__start-view">
      <p className="job-details__start-text job-details__start-text--big">
        What are you looking for?
      </p>
      <p className="job-details__start-text job-details__start-text">
        Start by searching for any technology your ideal job is working with
      </p>
    </div>
  );
}
