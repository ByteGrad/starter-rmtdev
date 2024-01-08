import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

{
  /* <Sidebar jobItems={jobItems} />
<JobItemContent /> */
}
