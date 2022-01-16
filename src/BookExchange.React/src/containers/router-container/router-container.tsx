import React from "react";
import { AppRouter } from "../../app/routing/AppRouter";

import { Navbar } from "../../components/navbar";
import { Userbar } from "../../components/userbar";

const RouterContainer = () => {
  return (
    <>
      <Navbar />
      <h1>...</h1>
      <Userbar />
      <AppRouter />
    </>
  );
};

export { RouterContainer };
