import React, { useEffect, useReducer } from 'react';
import reducer from './reducer';

const AppContext = React.createContext();
const api = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  isLoading: false,
  news: [],
  page: 0,
  nbPages: 0,
  searchInput: 'REACT',
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Fetch data
  const fetchData = async (url) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      dispatch({
        type: 'SET_NEWS',
        payload: {
          ...state,
          news: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(`${api}query=${state.searchInput}&page=${state.page}`);
  }, [state.searchInput, state.page]);

  //Handle search box input
  const handleInput = (prop) => {
    dispatch({ type: 'HANDLE_INPUT', payload: prop });
  };

  //Remove specific news from list of news
  const remove = (prop) => {
    dispatch({ type: 'REMOVE', payload: prop });
  };

  //Handle switching of pages
  const handlePage = (prop) => {
    dispatch({ type: 'HANDLE_PAGE', payload: prop });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        handleInput,
        remove,
        handlePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppProvider };
