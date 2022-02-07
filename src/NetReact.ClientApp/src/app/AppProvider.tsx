import { observer } from "mobx-react";
import { SnackbarProvider } from "notistack";
import React, { Suspense, useEffect, ReactNode } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { createAppTheme } from "@config/themes/createAppTheme";
import LoaderBlock from "@shared/atoms/Loaders/LoaderBlock";
import { useStores } from "@stores/useStores";

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

    Promise.all([auth!.trySilentLogin(), app!.initialize()]).catch((e: any) => {
      throw e;
    });
  }, []);

  const render = () => {
    if (!app!.isAppInitialized) {
      return <LoaderBlock />;
    }

    return children;
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
          <Suspense fallback={<LoaderBlock />}>
            {render()}
          </Suspense>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
});

export { AppProvider };
