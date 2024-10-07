import { useState, useCallback } from 'react';

function useSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchValue(value);

      if (value === '') {
        setSearchQuery('');
      }
    },
    [],
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setSearchQuery(searchValue);
      }
    },
    [searchValue],
  );

  return { searchValue, searchQuery, handleSearchChange, handleKeyPress };
}

export default useSearch;
