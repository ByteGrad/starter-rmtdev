import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type Props = {
  direction: "previous" | "next";
  currentPage: number;
  onClick: (direction: "previous" | "next") => void;
};

export default function PaginationButton({
  direction,
  currentPage,
  onClick,
}: Props) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        onClick(direction);
        e.currentTarget.blur();
      }}
    >
      {direction === "previous" ? <ArrowLeftIcon /> : null}
      Page {direction === "previous" ? currentPage - 1 : currentPage + 1}
      {direction === "next" ? <ArrowRightIcon /> : null}
    </button>
  );
}
