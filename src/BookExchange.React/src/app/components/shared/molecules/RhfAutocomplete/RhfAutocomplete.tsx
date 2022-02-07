import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ApiResponse } from "@utils/api/ApiResponse";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Controller, UseControllerProps, FieldValues, useController } from "react-hook-form";

type RhfAutocompleteProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> & {
  getOptions: () => Promise<ApiResponse<any[]>>;
  label: string;
};

const RhfAutocomplete = <TFieldValues extends FieldValues>({
  getOptions,
  label,
  ...props
}: RhfAutocompleteProps<TFieldValues>) => {
  const { field, formState } = useController<TFieldValues>(props);
  const [options, setOptions] = useState<TFieldValues[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getOptions();

        if (!apiResponse.hasError() && apiResponse?.data) {
          setOptions(apiResponse.data);
        }
      } catch (e) {
        enqueueSnackbar("Something wrong happened while fetching data.");
      }
    };

    fetchData();
  }, []);

  return (
    <Controller
      name={field.name}
      control={props.control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Autocomplete
          multiple
          filterSelectedOptions
          options={options}
          getOptionLabel={(option: TFieldValues) => option.name}
          onChange={(e, data) => onChange(data.map((i) => i.id))}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={label}
              error={!!formState.errors[field.name]}
              helperText={formState.errors[field.name]}
            />
          )}
        />
      )}
    />
  );
};

export { RhfAutocomplete };
