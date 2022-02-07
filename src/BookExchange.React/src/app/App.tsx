import { AppProvider } from "./AppProvider";
import { AppRouter } from "./routing/AppRouter";
import React from "react";

import "./assets/styles/fonts.scss";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export { App };

