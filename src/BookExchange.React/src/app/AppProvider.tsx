import { observer } from "mobx-react";
import { SnackbarProvider } from "notistack";
import React, { useEffect, ReactNode } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { createAppTheme } from "@config/themes/createAppTheme";
import { LoaderBlock } from "./components/shared/Loaders/LoaderBlock";
import { useStores } from "@stores/useStores";
import { Layout } from "./components/Layout/Layout";

interface IAppProviderProps {
  children: ReactNode;
}

const appTheme = createAppTheme();

const AppProvider = observer((props: IAppProviderProps) => {
  const { app, auth } = useStores();
  const { children } = props;

  useEffect(() => {
    if (app!.isAppInitialized) {
      return;
    }

    auth!.trySilentLogin();

    Promise.all([
      auth!.trySilentLogin(),
      app!.initialize()
    ]).then(() => {
      // notifications?.persistentNotify(message, "success");
    }).catch((e: any) => {
      console.log(e);
      throw e;
    });
  }, []);

  const render = () => {
    if (!app!.isAppInitialized) {
      return <LoaderBlock isLoading={true} />;
    }

    return <Layout>{children}</Layout>;
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <CssBaseline />
          {render()}
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
});

export { AppProvider };
