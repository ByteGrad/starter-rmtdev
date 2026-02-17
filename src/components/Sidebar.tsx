type Props = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: Props) {
  return <div className="sidebar">{children}</div>;
}
