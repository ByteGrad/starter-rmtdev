type Props = {
  children: React.ReactNode;
};

function SidebarTop({ children }: Props) {
  return <div className="sidebar__top">{children}</div>;
}

export default SidebarTop;
