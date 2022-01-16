import React from "react";
import { Route, Routes } from "react-router-dom";

import { AddBook } from "../../modules/add-book";
import { AddPost } from "../../modules/add-post";
import { BookDetails } from "../../modules/book-page";
import { HomePage } from "../../modules/home-page/home-page";
import { PostBooks } from "../../modules/post-books";
import { ProfilePage } from "../../modules/profile-page";
import { SearchBooks } from "../../modules/search-books";
import { SignInPage } from "../../modules/sign-in-page";
import { SignUpPage } from "../../modules/sign-up-page";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/search" element={<SearchBooks />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/post-book" element={<PostBooks />} />

      <Route path="/add-book" element={<AddBook />} />
      <Route path="/posts/add/:bookId" element={<AddPost />} />
    </Routes>
  );
};

export { AppRouter };
