// import { createAppTheme } from "@config/themes/createAppTheme";
import { SnackbarProvider, useSnackbar } from "notistack";
// import { LoaderBlock } from "@shared/Loaders/LoaderBlock";
import React, { useEffect, ReactNode } from "react";
// import { ToastContainer } from "react-toastify";
// import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
// import { CssBaseline } from "@mui/material";

import { useStores } from "@stores/useStores";
import { ThemeProvider } from "@material-ui/core";
import { Navbar } from "../components/navbar";
import { Userbar } from "../components/userbar";

// import "react-toastify/dist/ReactToastify.css";
// import { Layout } from "./components/Layout/Layout";

import { theme } from "../theme";

interface IAppProviderProps {
  children: ReactNode;
}

// const appTheme = createAppTheme();

const AppProvider = (props: IAppProviderProps) => {
  const { app, auth } = useStores();
  const { children } = props;

  useEffect(() => {
    if (app!.isAppInitialized) {
      return;
    }

    auth!.trySilentLogin();

    // Promise.all([
    //   auth!.trySilentLogin()
    // ]).then(() => {
    //   // notifications?.persistentNotify(message, "success");
    // }).catch((e: any) => {
    //   console.log(e);
    //   throw e;
    // });
  }, []);

  const render = () => {
    // if (!app.isAppInitialized) {
    //   return <LoaderBlock isLoading={true} />;
    // }

    // return <Layout>{children}</Layout>;

    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
          <Navbar />
          <h1>...</h1>
          <Userbar />
          {render()}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export { AppProvider };
