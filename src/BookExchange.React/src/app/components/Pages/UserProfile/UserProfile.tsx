import { Container, Grid, CardMedia, Typography, Divider } from "@mui/material";
import { useStores } from "@stores/useStores";
import { observer } from "mobx-react";
import { useState } from "react";
import { AwaitedBooksPanel } from "./Panels/AwaitedBooksPanel/AwaitedBooksPanel";
import { BookRequestsPanel } from "./Panels/BookRequestsPanel/BookRequestsPanel";
import { BookShelfPanel } from "./Panels/BookShelfPanel/BookShelfPanel";
import { RequestedBooksPanel } from "./Panels/RequestedBooksPanel/RequestedBooksPanel";
import { SentBooksPanel } from "./Panels/SentBooksPanel/SentBooksPanel";
import { StatisticsBar } from "./StatisticsBar/StatisticsBar";
import { ProfileTopCard, ProfileRootGrid } from "./UserProfile.styled";
import { WishlistPanel } from "./Panels/WishlistPanel/WishlistPanel";

const UserProfile = observer(() => {
  const [displayViewIndex, setDisplayViewIndex] = useState<number>(1);

  const { auth } = useStores();
  const user = auth!.user;

  return (
    <div>
      <Container>
        <ProfileTopCard>
          <ProfileRootGrid container spacing={2}>
            <Grid item xs={1}>
              <CardMedia
                component="img"
                sx={{ width: "100%", height: "100%" }}
                title="Live from space album cover"
                image="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
              />
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h5">{user?.username}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </ProfileRootGrid>

          <Divider />
          <StatisticsBar setDisplayViewIndex={setDisplayViewIndex} userId={user?.id} />
        </ProfileTopCard>

        <WishlistPanel index={1} displayIndex={displayViewIndex} />
        <RequestedBooksPanel index={2} displayIndex={displayViewIndex} />
        <AwaitedBooksPanel index={3} displayIndex={displayViewIndex} />
        <BookShelfPanel index={4} displayIndex={displayViewIndex} />
        <BookRequestsPanel index={5} displayIndex={displayViewIndex} />
        <SentBooksPanel index={6} displayIndex={displayViewIndex} />
      </Container>
    </div>
  );
});

export { UserProfile };
