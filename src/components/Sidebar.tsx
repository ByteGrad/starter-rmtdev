// React.ReactElement and JSX.Element are the same
// <p>Hello</p> is JSX.Element
// React.createElement("p", null, "Hello") is React.ReactElement
// Can also return createElement directly in component:
// return React.createElement("p", null, "Hello");
// instead of JSX:
// return <p>Hello</p>;
// React.ReactNode is wider (also allows string, number, boolean, null, undefined)

type SidebarProps = {
  children: React.ReactNode;
  // top?: React.ReactNode;
  top?: React.ReactElement;
};

export default function Sidebar({ children, top }: SidebarProps) {
  return (
    <div className="sidebar">
      {/* {top && <div className="sidebar__top">{top}</div>} */}
      {children}
    </div>
  );
}

export function SidebarTop({ children }: { children: React.ReactNode }) {
  return <div className="sidebar__top">{children}</div>;
}
