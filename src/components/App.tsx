import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import HeaderTop from "./HeaderTop";
import SidebarTop from "./SidebarTop";
import { Toaster } from "react-hot-toast";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";
import JobListSearchData from "./JobListSearchData";

function App() {
  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobListSearchData />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-center" />
    </>
  );
}

export default App;
