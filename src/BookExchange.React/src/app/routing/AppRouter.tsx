import { UserProfile } from "@Pages/UserProfile/UserProfile";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { appUrls } from "../appUrls";
import { SignIn } from "@Pages/Auth/SignIn/SignIn";
import { SignUp } from "@Pages/Auth/SignUp/SignUp";
import { Home } from "@Pages/Home/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={appUrls.rootPath} element={<Home />} />
      <Route path={appUrls.signIn} element={<SignIn />} />
      <Route path={appUrls.signUp} element={<SignUp />} />
      <Route path={appUrls.profile} element={<UserProfile />} />
      {/*<Route path="/search" element={<SearchBooks />} />*/}
      {/*<Route path="/book/:id" element={<BookDetails />} />*/}
      {/*<Route path="/post-book" element={<PostBooks />} />*/}

      {/*<Route path="/add-book" element={<AddBook />} />*/}
      {/*<Route path="/posts/add/:bookId" element={<AddPost />} />*/}
    </Routes>
  );
};

export { AppRouter };
