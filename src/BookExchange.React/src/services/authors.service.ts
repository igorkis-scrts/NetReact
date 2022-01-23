import { fetchApi } from "./fetchApi";
import { Author } from "app/types";

const GetAll = async () => {
  return fetchApi<Author.Author[]>("/author");
};

const AuthorsService = {
  GetAll,
};
export { AuthorsService };
