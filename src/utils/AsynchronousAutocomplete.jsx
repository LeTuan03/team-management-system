import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AsynchronousAutocomplete(props) {
  return (
    <Autocomplete
        autoComplete
        options={props?.options || []}
        noOptionsText={"No option"}
        renderInput={(params) => <TextField {...params} label="Loại hình thi đấu"/>}
        getOptionLabel={(option) =>
            option
            ? option?.label
            : ''}
    />
  );
}