import { AppProvider } from "./AppProvider";
import { AppRouter } from "./routing/AppRouter";
import React from "react";

import "./App.css";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export { App };
