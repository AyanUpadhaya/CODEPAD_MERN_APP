import React, { useState } from "react";

export const useFilters = () => {

  //and filter by coursename
  const filterSearchTitle = (data, searchValue) => {
    if (searchValue.trim().length > 0) {
      return data?.title?.toLowerCase().startsWith(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };
  const filterByLanguage = (data, language) => {
    if (language.trim().length > 0) {
      return data?.language?.toLowerCase() == language?.toLowerCase();
    } else {
      return true;
    }
  };

  return {
    filterSearchTitle,
    filterByLanguage,
  };
};
