import { BookApi } from "@api/Book.api";
import { Dispatch, SetStateAction } from "react";
import { Book } from "../../../../../types";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSnackbar } from "notistack";

interface ISmartSearchProps {
  page: number;
  setTotalRecords: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setBooks: Dispatch<SetStateAction<Book[] | undefined>>;
  isActiveSmartSearch: boolean;
  setActiveSmartSearch: (value: boolean) => void;
}

const SmartSearch = (props: ISmartSearchProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = async (searchTerm: string) => {
    try {
      props.setActiveSmartSearch(true);
      const books = await BookApi.getBooksBySearch(searchTerm);

      if (!books.hasError()) {
        props.setBooks(books.data?.data);
      }
    }
    catch (e: any) {
      enqueueSnackbar(e);
    }
  };

  return <SearchBar handleSearch={handleSearch} />;
};

export { SmartSearch };