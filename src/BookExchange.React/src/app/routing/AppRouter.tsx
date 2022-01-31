import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { appUrls } from "../appUrls";
import { Layout } from "../components/Layout/Layout";
import { AuthRoute } from "./AuthRoute/AuthRoute";

const SignIn = lazy(() => import("@Pages/Auth/SignIn"));
const SignUp = lazy(() => import("@Pages/Auth/SignUp"));
const Home = lazy(() => import("@Pages/Home"));
const UserProfile = lazy(() => import("@Pages/UserProfile"));
const NotFound = lazy(() => import("@Pages/NotFound"));

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route path={appUrls.rootPath} element={<Home />} />
        <Route path={appUrls.signIn} element={<SignIn />} />
        <Route path={appUrls.signUp} element={<SignUp />} />

        <Route path={appUrls.profile} element={<AuthRoute />}>
          <Route path={appUrls.profile} element={<UserProfile />} />
        </Route>
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
