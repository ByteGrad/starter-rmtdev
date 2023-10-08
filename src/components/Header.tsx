import Bookmarks from "./Bookmarks";
import Logo from "./Logo";

export default function Header({ children }) {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />

        <Bookmarks />
      </div>

      <div className="intro">{children}</div>
    </header>
  );
}
