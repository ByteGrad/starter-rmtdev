import { SortMethod } from "../lib/types";

export default function Sorting({
  currentSortMethod,
  onSortChange,
}: {
  currentSortMethod: SortMethod;
  onSortChange: (sortBy: SortMethod) => void;
}) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          currentSortMethod === "relevant" ? "sorting__button--active" : ""
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          onSortChange("relevant");
        }}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          currentSortMethod === "recent" ? "sorting__button--active" : ""
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          onSortChange("recent");
        }}
      >
        Recent
      </button>
    </section>
  );
}
