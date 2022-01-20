import { Home } from "@Pages/Home/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { appUrls } from "../appUrls";
import { SignIn } from "../components/Auth/SignIn/SignIn";
import { SignUp } from "../components/Auth/SignUp/SignUp";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={appUrls.rootPath} element={<Home />} />
      {/*<Route path="/" element={<HomePage />} />*/}
      <Route path={appUrls.signIn} element={<SignIn />} />
      <Route path={appUrls.signUp} element={<SignUp />} />
      {/*<Route path="/profile" element={<ProfilePage />} />*/}
      {/*<Route path="/search" element={<SearchBooks />} />*/}
      {/*<Route path="/book/:id" element={<BookDetails />} />*/}
      {/*<Route path="/post-book" element={<PostBooks />} />*/}

      {/*<Route path="/add-book" element={<AddBook />} />*/}
      {/*<Route path="/posts/add/:bookId" element={<AddPost />} />*/}
    </Routes>
  );
};

export { AppRouter };
