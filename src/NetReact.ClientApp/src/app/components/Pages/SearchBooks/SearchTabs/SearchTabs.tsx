import { useTheme } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Book } from "@app/types";
import { RootPaper } from "./SearchTabs.styled";
import { SmartSearch } from "./SmartSearch/SmartSearch";
import { TabPanel } from "./TabPanel/TabPanel";

interface ISearchTabsProps {
  page: number;
  setTotalRecords: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setBooks: Dispatch<SetStateAction<Book[] | undefined>>;
  isActiveSmartSearch: boolean;
  setActiveSmartSearch: (value: boolean) => void;
}

const SearchTabs = (props: ISearchTabsProps) => {
  const theme = useTheme();

  const [ value, setValue ] = useState(0);

  const handleChange = (event: ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <RootPaper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Smart Search" />
        <Tab label="Filtered Search" />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SmartSearch
            {...props}
            isActiveSmartSearch={props.isActiveSmartSearch}
            setActiveSmartSearch={props.setActiveSmartSearch}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography>
            Under construction
          </Typography>
        </TabPanel>
      </SwipeableViews>
    </RootPaper>
  );
};

export { SearchTabs };