import React, { useState, useEffect } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import { useDebouncedCallback } from 'use-debounce';

const SearchCustomer = ({ setQuery }) => {
  const debounced = useDebouncedCallback((value) => setQuery(value), 1000);
  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        id="input-with-icon-textfield1"
        placeholder="جستجو"
        onChange={(e) => debounced(e.target.value)}
        className="w-100 mb-4"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
      />
    </>
  );
};

export default SearchCustomer;
