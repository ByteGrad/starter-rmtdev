type SearchProps = {
  searchText: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ searchText, onSearchChange }: SearchProps) {
  return (
    <form
      action="#"
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button type="submit" className="search__submit-btn">
        <i className="fa-solid fa-magnifying-glass search__icon"></i>
      </button>

      <input
        value={searchText}
        onChange={onSearchChange}
        className="search__input"
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
