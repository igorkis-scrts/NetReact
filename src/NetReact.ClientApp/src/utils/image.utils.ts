import { API_BASE_URL } from "@config/Constants";

const getAbsolutePath = (relativePath: string) => {
  return `${API_BASE_URL}/${relativePath}`.replace(/\\/g, "/");
};

const ImageUtils = {
  getAbsolutePath,
};

export { ImageUtils };
