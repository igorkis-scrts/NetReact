import { Book, PaginationFilter, User } from "@app/types";

export type Post = {
  id: number;
  bookId: number;
  postedById: number;
  condition: string;
  status: string;
  timeAdded: Date;

  book: Book | null;
  postedBy: User | null;
};

export type CreatePost = {
  bookId: number;
  postedById: number;
  condition: string;
};

export type PostsFilter = PaginationFilter & {
  [key: string]: any;

  includePostedBy?: boolean;
  includeCondition?: boolean;
  includeBook?: boolean;
  status?: string;
  bookId?: number;
  condition?: string;
  timeAdded?: Date;
};
