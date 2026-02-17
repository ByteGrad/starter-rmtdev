import { useJobItemsContext } from "../lib/hooks";
import SortingButton from "./SortingButton";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      {/* <button
        className={`sorting__button sorting__button--relevant ${sortBy === "relevant" ? "sorting__button--active" : ""}`}
        onClick={() => onClick("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${sortBy === "recent" ? "sorting__button--active" : ""}`}
        onClick={() => onClick("recent")}
      >
        Recent
      </button> */}
      <SortingButton
        onClick={() => handleChangeSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => handleChangeSortBy("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}
