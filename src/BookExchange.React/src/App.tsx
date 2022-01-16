import { AppProvider } from "@app/AppProvider";
import { AppRouter } from "@app/routing/AppRouter";
import React from "react";

import "./App.css";

function App() {
  return (
    <div>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </div>
  );
}

export default App;
