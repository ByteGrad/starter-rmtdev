import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return <div className="sidebar">{children}</div>;
}

export function SidebarTop({ children }: { children: React.ReactNode }) {
  return <div className="sidebar__top">{children}</div>;
}
