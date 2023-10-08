export default function Pagination({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="pagination">{children}</section>;
}

type PaginationButtonProps = {
  direction: "back" | "next";
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function PaginationButton({
  direction,
  currentPage,
  onPageChange,
}: PaginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        direction === "back"
          ? onPageChange(currentPage - 1)
          : onPageChange(currentPage + 1);
        e.currentTarget.blur();
      }}
    >
      {direction === "back" ? (
        <>
          <i className="fa-solid fa-arrow-left pagination__icon"></i>
          Page{" "}
          <span className="pagination__number pagination__number--back">
            {currentPage - 1}
          </span>
        </>
      ) : (
        <>
          Page{" "}
          <span className="pagination__number pagination__number--next">
            {currentPage + 1}
          </span>
          <i className="fa-solid fa-arrow-right pagination__icon"></i>
        </>
      )}
    </button>
  );
}
