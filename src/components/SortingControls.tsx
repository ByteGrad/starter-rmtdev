export default function Sorting({ onClick, sortBy }) {
  const SortingButton = ({ sortType }) => (
    <button
      className={`sorting__button sorting__button--${sortType} ${sortBy === sortType ? 'sorting__button--active' : ''}`}
      onClick={() => onClick(sortType)}
    >
      {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
    </button>
  );

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton sortType="relevant" />
      <SortingButton sortType="recent" />
    </section>
  );
}
