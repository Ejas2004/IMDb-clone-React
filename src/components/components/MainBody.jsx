import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import WatchList from "./WatchList";
import Pro from "./Pro";
import Banner from "./Banner";
import MBdNav from "./MBdNav";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <MBdNav />}
      {children}
    </>
  );
}

function MainBody() {
  const [watchlist, setWatchList] = useState([]);

  const handleremove = (movie) => {
    let filterwatchlist = watchlist.filter((newMovie) => {
      return newMovie.id !== movie.id;
    });
    setWatchList(filterwatchlist);
  };

  const handleAddWatchList = (movie) => {
    let newList = [...watchlist, movie];
    setWatchList(newList);
  };

  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Banner
                  handleAddWatchList={handleAddWatchList}
                  handleremove={handleremove}
                  watchlist={watchlist}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <WatchList
                  watchlist={watchlist}
                  handleremove={handleremove}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/pro" element={<Pro />} />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}

export default MainBody;
