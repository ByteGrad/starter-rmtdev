import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

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
      {direction === "back" && (
        <>
          <ArrowLeftIcon />
          Page <span>{currentPage - 1}</span>
        </>
      )}
      {direction === "next" && (
        <>
          Page <span>{currentPage + 1}</span>
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
