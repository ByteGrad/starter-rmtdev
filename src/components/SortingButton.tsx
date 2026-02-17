import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
};

function SortingButton({ children, onClick, isActive }: Props) {
  return (
    <button
      className={`sorting__button sorting__button--relevant ${isActive ? "sorting__button--active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SortingButton;
