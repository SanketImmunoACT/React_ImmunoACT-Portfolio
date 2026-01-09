import { useState, useEffect } from 'react';

/**
 * Custom hook for debounced search functionality
 * @param {number} delay - Debounce delay in milliseconds (default: 500)
 * @returns {object} - { searchInput, debouncedSearch, isSearching, setSearchInput, clearSearch }
 */
export const useDebounceSearch = (delay = 500) => {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Set searching state when input changes
    if (searchInput !== debouncedSearch) {
      setIsSearching(true);
    }

    // Create debounce timeout
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setIsSearching(false);
    }, delay);

    // Cleanup timeout on input change
    return () => clearTimeout(timeoutId);
  }, [searchInput, delay]);

  // Clear search function
  const clearSearch = () => {
    setSearchInput('');
    setDebouncedSearch('');
    setIsSearching(false);
  };

  return {
    searchInput,
    debouncedSearch,
    isSearching,
    setSearchInput,
    clearSearch
  };
};