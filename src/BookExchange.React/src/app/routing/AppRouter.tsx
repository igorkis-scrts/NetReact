import { SignIn } from "@Pages/Auth/SignIn/SignIn";
import { SignUp } from "@Pages/Auth/SignUp/SignUp";
import { UserProfile } from "@Pages/UserProfile/UserProfile";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { appUrls } from "../appUrls";
import { Home } from "@Pages/Home/Home";
import { Layout } from "../components/Layout/Layout";
import { AuthRoute } from "./AuthRoute/AuthRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={appUrls.rootPath} element={<Home />} />
        <Route path={appUrls.signIn} element={<SignIn />} />
        <Route path={appUrls.signUp} element={<SignUp />} />

        <Route path={appUrls.profile} element={<AuthRoute />}>
          <Route path={appUrls.profile} element={<UserProfile />} />
        </Route>
        {/*<AuthRoute path={appUrls.addBook} element={<Home />} />*/}
        {/*<Route path="/search" element={<SearchBooks />} />*/}
        {/*<Route path="/book/:id" element={<BookDetails />} />*/}
        {/*<Route path="/post-book" element={<PostBooks />} />*/}

        {/*<Route path="/add-book" element={<AddBook />} />*/}
        {/*<Route path="/posts/add/:bookId" element={<AddPost />} />*/}
      </Route>
    </Routes>
  );
};

export { AppRouter };
