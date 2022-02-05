import { fetchApi } from "./fetchApi";
import { User, Post, PaginatedResult } from "app/types";

const GetCurrentUser = (): Promise<User> => {
  return fetchApi<User>("/user/current-user");
};

const CreateProfile = async () => {
  return fetchApi<User>("/user", {
    method: "POST",
  });
};
const GetUserBookshelf = async (userId: number, pageSize: number, page: number) => {
  return fetchApi<PaginatedResult<Post>>(
    `/user/${userId}/posts/owned?pageSize=${pageSize}&pageNumber=${page}`
  );
};

const AddBookToWishlist = async (userId: number, bookId: number) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookId: bookId,
    }),
  };

  return fetchApi(`/user/${userId}/books/wished`, requestOptions);
};

const RequestPost = async (userId: number, postId: number) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
    }),
  };

  return fetchApi(`/user/${userId}/requests`, requestOptions);
};

const UserService = {
  GetCurrentUser,
  CreateProfile,
  GetUserBookshelf,
  AddBookToWishlist,
  RequestPost
};

export { UserService };
