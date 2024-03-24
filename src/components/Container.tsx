import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({ jobItems, loading, jobItem, totalNumberOfResults, onChangePage, currentPage, totalNumberOfPages, handleSortBy, sortBy }) {
  return <div className="container">
    <Sidebar jobItems={jobItems} loading={loading} totalNumberOfResults={totalNumberOfResults}
      onChangePage={onChangePage}
      totalNumberOfPages={totalNumberOfPages}
      currentPage={currentPage}
      handleSortBy={handleSortBy}
      sortBy={sortBy}

    />


    <JobItemContent jobItem={jobItem} />
  </div>;
}
