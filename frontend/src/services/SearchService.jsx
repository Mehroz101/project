// services/SearchService.js

import { useState, useEffect } from "react";

/**
 * Custom hook to manage search functionality.
 */
export const SearchFunctionality = () => {
  const [searchTerm, setSearchTerm] = useState(""); // To track the input from the search field
  const [data, setData] = useState([]); // All data fetched from the API
  const [filteredData, setFilteredData] = useState([]); // Filtered data that will be displayed

  /**
   * Filters data based on the search term.
   */
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data); // If no search term, return all data
    } else {
      const lowerCasedTerm = searchTerm.toLowerCase();
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(lowerCasedTerm)
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]); // Run when search term or data changes

  /**
   * Handles changes in the search input field.
   * @param {Event} e - The event object from the input field.
   */
  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value); // Update the search term state
  };

  return {
    handleSearchChange,
    setData,
    data,
    filteredData,
  };
};
