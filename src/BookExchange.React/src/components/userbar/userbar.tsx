import { Container } from "@material-ui/core";
import { Link as RouterLink } from "@material-ui/core";
import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import React from "react";
import { useStyles } from "./userbar.styles";

interface NavData {
  label: string;
  href: string;
}

const navData: NavData[] = [
  {
    label: "Sign In",
    href: "/sign-in",
  },
  {
    label: "Sign Up",
    href: "/sign-up",
  },
];

const navDataLoggedIn: NavData[] = [
  {
    label: "Post",
    href: "/add-book",
  },
];

const Userbar = observer(() => {
  const classes = useStyles();
  const { auth } = useStores();
  const { user, isLoggedIn } = auth!;

  const getNavItems = (data: NavData[]) => {
    return data.map(({ label, href }) => {
      return (
        <RouterLink key={label} href={href} className={classes.linkItem}>
          {label}
        </RouterLink>
      );
    });
  };

  const handleOnClick = () => {
    auth!.signOut();
  }

  return (
    <>
      <Container className={classes.root}>
        {!isLoggedIn ? (
          <>{getNavItems(navData)}</>
        ) : (
          <>
            <RouterLink href="/profile"> Hello, {user?.username}!</RouterLink>

            {getNavItems(navDataLoggedIn)}
            <RouterLink href="/" className={classes.linkItem} onClick={handleOnClick}>
              Sign Out
            </RouterLink>
          </>
        )}
      </Container>
    </>
  );
});

export { Userbar };
