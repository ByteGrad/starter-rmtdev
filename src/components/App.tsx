import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { Toaster } from "react-hot-toast";
import { useActiveId, useDeBounce, useJobItem, useJobItems } from '../lib/hooks';


type sortBy = 'relevant' | 'recent';
function App() {
  const [searchText, setSearchText] = useState("");


  const activeId = useActiveId();
  const deBouncedSearchText = useDeBounce(searchText, 500);

  const [jobItems, loading,] = useJobItems(deBouncedSearchText);

  const [jobItem, isLoading] = useJobItem(activeId);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<sortBy>('relevant');
  const [bookMarkId, setBookMarkId] = useState<number[]>([]);
  const totalNumberOfResults = jobItems?.length;




  const handleChangePage = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);

    }
    if (direction === 'prev') {
      setCurrentPage((prev) => prev - 1);
    }
  }

  const handleSortBy = (newSortBy: sortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
    console.log(newSortBy)
  }







  const totalNumberOfPages = Math.ceil(totalNumberOfResults / 7);

  const jobItemsSorted = [...jobItems || []]?.sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore;
    }
    if (sortBy === 'recent') {
      return a.daysAgo - b.daysAgo

    }

    return 0;
  }

  )



  const jobItemsSliced = jobItemsSorted?.slice((currentPage - 1) * 7, currentPage * 7);



  return (
    <>
      <Background />
      <Header className='header'>
        <HeaderTop>

          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container jobItems={jobItemsSliced} loading={loading} jobItem={jobItem} totalNumberOfResults={totalNumberOfResults}
        onChangePage={handleChangePage}
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        handleSortBy={handleSortBy}
        sortBy={sortBy}


      />
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
