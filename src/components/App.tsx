import { useState, useMemo } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import { useDebounce, useJobItems } from "../lib/hooks";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import Search from "./Search";
import { Toaster } from "react-hot-toast";
import ResultsCount from "./ResultsCount";
import Sorting from "./Sorting";
import Pagination, { PaginationButton } from "./Pagination";
import { SortMethod } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Logo from "./Logo";
import Bookmarks from "./Bookmarks";

const RESULTS_PER_PAGE = 7;

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const [allJobItems, isLoading] = useJobItems(debouncedSearchText);
  const [sortMethod, setSortMethod] = useState<SortMethod>("relevant");
  const [currentPage, setCurrentPage] = useState(1);

  const totalNumberOfPages = Math.ceil(
    (allJobItems?.length || 0) / RESULTS_PER_PAGE
  );
  // sort job items based on the current sort by value
  // how [].sort works: return positive number to sort b higher than a, return negative number to sort a higher than b, return 0 to stay same
  const sortedAllJobItems = useMemo(() => {
    if (sortMethod === "relevant") {
      return allJobItems?.sort((a, b) => {
        return b.relevanceScore - a.relevanceScore;
      });
    } else {
      return allJobItems?.sort((a, b) => {
        return a.daysAgo - b.daysAgo;
      });
    }
  }, [allJobItems, sortMethod]);

  // slice off job items based on the current page
  const jobItemsOnCurrentPage = useMemo(
    () =>
      sortedAllJobItems?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortedAllJobItems, currentPage, sortMethod]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSortChange = (newSortMethod: SortMethod) => {
    setCurrentPage(1);
    setSortMethod(newSortMethod);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <Bookmarks />
        </HeaderTop>

        <Search searchText={searchText} onSearchChange={handleSearchChange} />
      </Header>

      <Container>
        <Sidebar
        // top={
        //   <>
        //     <ResultsCount />
        //     <Sorting />
        //   </>
        // }
        >
          <SidebarTop>
            <ResultsCount count={allJobItems?.length || 0} />
            <Sorting
              currentSortMethod={sortMethod}
              onSortChange={handleSortChange}
            />
          </SidebarTop>

          {/* on every render now, we are rendering the entire job list */}
          {/* so refactor and memo + useCallback */}
          {/* <JobList>
            {isLoading && searchText.length > 0 && <Spinner />}

            {jobItemsOnCurrentPage?.map((jobItem) => (
              // <JobListItem key={jobItem.id} jobItem={jobItem} />
              <JobListItem
                key={jobItem.id}
                {...jobItem}
                isActive={jobItem.id === activeJobItemId}
                isBookmarked={bookmarkedJobItems.some(
                  (bookmarkedJobItem) => bookmarkedJobItem.id === jobItem.id
                )}
              />
            ))}
          </JobList> */}
          <JobList
            jobItems={jobItemsOnCurrentPage}
            isLoading={isLoading && searchText.length > 0}
          />

          <Pagination>
            {
              // display previous page button if current page is greater than 1
              currentPage > 1 && (
                <PaginationButton
                  direction="back"
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )
            }
            {
              // display next button if there are more job items on next page
              currentPage < totalNumberOfPages && (
                <PaginationButton
                  direction="next"
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )
            }
          </Pagination>
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
