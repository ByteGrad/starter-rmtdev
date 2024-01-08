import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

export default function Header({ children }: { children: React.ReactNode }) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: { children: React.ReactNode }) {
  return <div className="header__top">{children}</div>;
}

{
  /* <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>

      <SearchForm
        searchInputText={searchInputText}
        setSearchInputText={setSearchInputText}
      /> */
}
