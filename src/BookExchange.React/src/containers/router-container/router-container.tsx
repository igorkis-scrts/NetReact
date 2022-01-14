import React from "react";
import { Routes, Route} from "react-router-dom";

import { Navbar } from "../../components/navbar";
import { Userbar } from "../../components/userbar";
import { HomePage } from "../../modules/home-page/home-page";
import { SignInPage } from "../../modules/sign-in-page";
import { SignUpPage } from "../../modules/sign-up-page";
import { BookDetails } from "../../modules/book-page";
import { PostBooks } from "../../modules/post-books";
import { SearchBooks } from "../../modules/search-books";
import { AddBook } from "../../modules/add-book";
import { ProfilePage } from "../../modules/profile-page";
import { AddPost } from "../../modules/add-post";

import { PurchaseCoinsCallback, CancelPaymentCallback } from "../../callbacks";

const RouterContainer = () => {
  return (
    <>
      <Navbar />
      <h1>...</h1>
      <Userbar />
      <Routes>
        <Route
          path="/callbacks/single-payment/finish"
          element={<PurchaseCoinsCallback/>}
        />
        <Route
          path="/callbacks/single-payment/cancel"
          element={CancelPaymentCallback}
        />
        <Route path="/" element={<HomePage/>} />
        <Route path="/sign-in" element={<SignInPage/>} />
        <Route path="/sign-up" element={<SignUpPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/book/:id" element={<BookDetails/>} />
        <Route path="/post-book" element={<PostBooks/>} />

        <Route path="/add-book" element={<AddBook/>} />
        <Route path="/posts/add/:bookId" element={<AddPost/>} />
      </Routes>
    </>
  );
};

export { RouterContainer };
