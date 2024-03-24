import { useEffect, useState } from "react";


type SearchTextProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export default function SearchForm({searchText, setSearchText} ) {









  return (
    <form  onSubmit={e =>{
      e.preventDefault();

    }} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
      onChange={e => {
        setSearchText(e.target.value);


      }
      }
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
