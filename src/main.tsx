import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import ActiveIdContextProvider from "./contexts/ActiveIdContextProvider.tsx";
import SearchTextContextProvider from "./contexts/SearchTextContextProvider.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContextProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveIdContextProvider>
        <BookmarksContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </BookmarksContextProvider>
      </ActiveIdContextProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>,
);
