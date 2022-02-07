import { UserApi } from "@api/User.api";
import { Grid, Typography } from "@mui/material";
import { LinkButton } from "@shared/Styles/LinkButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFetch } from "@hooks/useFetch";
import { IStatisticsItem } from "./models/IStatisticsItem";
import { StatisticsRootGrid, StatisticsItemGrid } from "./Statistics.styled";

interface IStatisticsBarProps {
  setDisplayViewIndex: Dispatch<SetStateAction<number>>;
  userId: number | null | undefined;
}

const StatisticsBar = ({ setDisplayViewIndex, userId }: IStatisticsBarProps) => {
  const [statisticsData, setStatisticsData] = useState<IStatisticsItem[]>([]);

  const { data: userStats, fetch: fetchUserStats, isLoading } = useFetch(UserApi.getUserStats);

  useEffect(() => {
    fetchUserStats(userId);
  }, [fetchUserStats, userId]);

  useEffect(() => {
    if (isLoading || !userStats) {
      return;
    }

    setStatisticsData([
      {
        name: "Wishlist",
        onClick: () => {
          setDisplayViewIndex(1);
        },
        count: userStats.wishlist ? userStats.wishlist : 0,
      },
      {
        name: "Requested Books",
        onClick: () => {
          setDisplayViewIndex(2);
        },
        count: userStats.requested ? userStats.requested : 0,
      },
      {
        name: "Awaiting",
        onClick: () => {
          setDisplayViewIndex(3);
        },
        count: userStats.awaiting ? userStats.awaiting : 0,
      },
      {
        name: "BookShelf",
        onClick: () => {
          setDisplayViewIndex(4);
        },
        count: userStats.bookshelf ? userStats.bookshelf : 0,
      },
      {
        name: "Requests",
        onClick: () => {
          setDisplayViewIndex(5);
        },
        count: userStats.requests ? userStats.requests : 0,
      },
      {
        name: "Sent Books",
        onClick: () => {
          setDisplayViewIndex(6);
        },
        count: userStats.sent ? userStats.sent : 0,
      },
    ]);
  }, [userStats, isLoading, setDisplayViewIndex]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <StatisticsRootGrid container justifyContent="space-between">
      {statisticsData.map((item, index) => (
        <Grid item key={index} xs={2}>
          <Grid container direction="column" justifyContent="center" alignContent="center">
            <StatisticsItemGrid item xs={12}>
              <LinkButton onClick={item.onClick}>
                <Typography variant="h5" component="span">
                  {item.count}
                </Typography>
              </LinkButton>
            </StatisticsItemGrid>
            <Grid item xs={12}>
              <Typography align="center">{item.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </StatisticsRootGrid>
  );
};

export { StatisticsBar };
