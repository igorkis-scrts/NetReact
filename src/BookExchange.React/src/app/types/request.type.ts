import { User, Post } from "./index";

export type Request = {
  id: number;
  postId: number;
  useId: number;
  status: string;

  post: Post;
  user: User;
};