import { User, Post } from "@app/types";

export type Deal = {
  id: number;
  postId: number;
  bookTakerId: number;
  dealStatus: string;

  bookTaker: User | null;
  post: Post | null;
};
