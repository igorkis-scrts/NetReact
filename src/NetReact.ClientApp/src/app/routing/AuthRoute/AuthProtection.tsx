import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { appUrls } from "../../appUrls";

const AuthProtection = observer(() => {
  const { auth } = useStores();
  const location = useLocation();

  if (!auth!.isLoggedIn) {
    return <Navigate to={appUrls.signIn} replace state={{ from: location }} />;
  }

  return <Outlet />;
});

export { AuthProtection };
