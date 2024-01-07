import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useActiveId, useJobItems } from "../lib/hooks";
import { BASE_URL } from "../lib/constant";

function App() {
  const [searchInputText, setSearchInputText] = useState("");
  const [jobItems, isLoading] = useJobItems(searchInputText);
  const activeId = useActiveId();

  useEffect(() => {
    if (!activeId) return;

    const fetchJobItemData = async () => {
      const response = await fetch(`${BASE_URL}/${activeId}`);
      const data = await response.json();
      console.log(data.jobItem);
    };

    fetchJobItemData();
  }, [activeId]);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm
          searchInputText={searchInputText}
          setSearchInputText={setSearchInputText}
        />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
