import { createFilterOptions } from "@mui/material";

const filterAutocomplete = createFilterOptions();
export const filterOptions = (options, params, isNew, displayLable) => {
    params.inputValue = params.inputValue?.trim();
    let filtered = filterAutocomplete(options, params);
  
    if (isNew && filtered?.length === 0) {
      filtered.push({[displayLable]: "Thêm mới", code: "New"});
    }
  
    return filtered;
  };