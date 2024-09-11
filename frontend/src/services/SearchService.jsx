// services/SearchService.js

import { useState } from "react";

/**
 * Custom hook to manage search functionality.
 */
export const SearchFunctionality = () => {
  const [searchTerm, setSearchTerm] = useState(""); // To track the input from the search field
  const [filteredData, setFilteredData] = useState([]); // Filtered data that will be displayed

  /**
   * Filters data based on the search term.
   * @param {Array} data - The array of spaces or items to filter.
   */
  const setData = (data) => {
    if (!searchTerm) {
      setFilteredData(data); // If no search term, return all data
    } else {
      const lowerCasedTerm = searchTerm.toLowerCase();
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(lowerCasedTerm)
      );
      setFilteredData(filtered);
    }
  };

  /**
   * Handles changes in the search input field.
   * @param {Event} e - The event object from the input field.
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };

  return {
    handleSearchChange,
    setData,
    setFilteredData,
    searchTerm,
    filteredData,
  };
};
