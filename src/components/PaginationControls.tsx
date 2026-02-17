import { useJobItemsContext } from "../lib/hooks";
import PaginationButton from "./PaginationButton";

export default function PaginationControls() {
  const { currentPage, totalNumberOfPages, handleChangePage } =
    useJobItemsContext();
  return (
    <section className="pagination">
      {currentPage > 1 ? (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={handleChangePage}
        />
      ) : null}
      {currentPage < totalNumberOfPages ? (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={handleChangePage}
        />
      ) : null}
    </section>
  );
}
