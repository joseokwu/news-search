import React from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { handleInput, searchInput } = useGlobalContext();
  return (
    <div>
      <form className='search-form' onSubmit={(e) => e.preventDefault()}>
        <h1>Search Tech News</h1>
        <input
          value={searchInput}
          type='text'
          className='form-input'
          onChange={(e) => handleInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchForm;
