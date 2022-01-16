import React, { useEffect } from "react";

import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { useStyles } from "./leaderboard.styles";
import { UserService } from "services";
import { useFetch } from "hooks";

const Leaderboard = () => {
  const classes = useStyles();

  const {
    data: users,
    fetch: fetchTopUsers,
    isLoading,
  } = useFetch(UserService.GetTopUsers);

  useEffect(() => {
    fetchTopUsers(3);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Leaderboard
      </Typography>

      <List dense>
        <Grid container justifyContent="space-between" className={classes.header}>
          <Grid item>
            <Typography variant="h6">Username</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Book Points</Typography>
          </Grid>
        </Grid>

        {users?.map((user, index) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          return (
            <ListItem key={index} button>
              <ListItemAvatar>
                <Avatar
                // alt={`Avatar n°${value + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${user.username}`} />
              <ListItemSecondaryAction className={classes.score}>
                <Typography variant="h6">{user.points}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}

      </List>
    </div>
  );
};

export { Leaderboard };
