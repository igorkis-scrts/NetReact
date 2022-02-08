import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { appUrls } from "../appUrls";
import { Layout } from "../components/Layout/Layout";
import { AuthProtection } from "./AuthRoute/AuthProtection";

const SignIn = lazy(() => import("@Pages/Auth/SignIn"));
const SignUp = lazy(() => import("@Pages/Auth/SignUp"));
const Home = lazy(() => import("@Pages/Home"));
const UserProfile = lazy(() => import("@Pages/UserProfile"));
const Books = lazy(() => import("@Pages/Books"));
const BookDetails = lazy(() => import("@Pages/BookDetails"));
const SearchBooks = lazy(() => import("@Pages/SearchBooks"));
const NotFound = lazy(() => import("@Pages/NotFound"));

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route path={appUrls.rootPath} element={<Home />} />
        <Route path={appUrls.signIn} element={<SignIn />} />
        <Route path={appUrls.signUp} element={<SignUp />} />

        <Route path={appUrls.profile} element={<AuthProtection />}>
          <Route path={appUrls.profile} element={<UserProfile />} />
        </Route>
        <Route path={appUrls.books} element={<AuthProtection />}>
          <Route path={appUrls.books} element={<Books />} />
          <Route path=":id" element={<BookDetails />} />
        </Route>
        <Route path={appUrls.searchBooks} element={<AuthProtection />}>
          <Route path={appUrls.searchBooks} element={<SearchBooks />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { AppRouter };
