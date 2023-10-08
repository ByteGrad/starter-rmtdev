// use portal so that the bookmarks list is not affected by the z-index of the header

export default function Bookmarks() {
  return (
    <section>
      <button className="bookmarks-btn">
        Bookmarks <i className="fa-solid fa-caret-down bookmarks-btn__icon"></i>
      </button>

      <ul className="job-list job-list--bookmarks"></ul>
    </section>
  );
}
