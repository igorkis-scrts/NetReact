import { Typography, Grid, List, ListItem, Link } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Grid>
      <Typography variant={"h4"}>Hello!</Typography>
      <Typography variant={"body1"}>Welcome to your new single-page application, built with:</Typography>
      <List>
        <ListItem>
          <Link href="https://get.asp.net/">ASP.NET 6</Link>
        </ListItem>
        <ListItem>
          <Link href="https://facebook.github.io/react/">React</Link>
        </ListItem>
        <ListItem>
          <Link href="https://material-ui.com/"> Material UI</Link>
        </ListItem>
      </List>
      <Typography variant={"body1"}>
        The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open
        a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.
      </Typography>
    </Grid>
  );
};

export { Home };
