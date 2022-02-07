import { Grid, Skeleton } from "@mui/material";
import { LoadingSkeletonTypography, SkeletonCard, LoadingSkeletonContent } from "./BookSkeletons.styled";

interface IBookSkeletonsProps {
  title: string;
}

const BookSkeletons = ({ title }: IBookSkeletonsProps) => {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <LoadingSkeletonTypography variant="h5">{title}</LoadingSkeletonTypography>
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between" flexDirection="column">
        <SkeletonCard>
          <LoadingSkeletonContent>
            <Skeleton />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation={false} />
          </LoadingSkeletonContent>
        </SkeletonCard>

        <SkeletonCard>
          <LoadingSkeletonContent>
            <Skeleton />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation={false} />
          </LoadingSkeletonContent>
        </SkeletonCard>

        <SkeletonCard>
          <LoadingSkeletonContent>
            <Skeleton />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation={false} />
          </LoadingSkeletonContent>
        </SkeletonCard>
      </Grid>
    </>
  );
};

export { BookSkeletons };