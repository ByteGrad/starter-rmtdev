import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

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
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={onSearchChange}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
