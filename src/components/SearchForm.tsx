export default function SearchForm({ searchInputText, setSearchInputText }) {
  return (
    <form
      action="#"
      className="search"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        value={searchInputText}
        onChange={(event) => {
          setSearchInputText(event.target.value);
        }}
      />
    </form>
  );
}
