type Props = {
  children: React.ReactNode;
};

function HeaderTop({ children }: Props) {
  return <div className="header__top">{children}</div>;
}

export default HeaderTop;
