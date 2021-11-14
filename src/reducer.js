const reducer = (state, action) => {
  switch (action.type) {
    //Set loading
    case 'SET_LOADING':
      return { ...state, isLoading: true };
    //Set news state after fetching data
    case 'SET_NEWS':
      return {
        ...state,
        news: action.payload.news,
        nbPages: action.payload.nbPages,
        isLoading: false,
      };
    //Set the search parameters and trigger fetch
    case 'HANDLE_INPUT':
      return { ...state, searchInput: action.payload, page: 0 };
    //Remove individual items from news list
    case 'REMOVE':
      const newNews = state.news.filter(
        (item) => item.objectID !== action.payload
      );
      return { ...state, news: newNews };
    //Check for button click(prev or next) and set page accordingly
    case 'HANDLE_PAGE':
      if (action.payload === 'prev') {
        if (state.page <= 0) {
          return { ...state, page: state.nbPages - 1 };
        } else {
          return { ...state, page: state.page - 1 };
        }
      } else if (action.payload === 'next') {
        if (state.page >= state.nbPages - 1) {
          return { ...state, page: 0 };
        } else {
          return { ...state, page: state.page + 1 };
        }
      }
      break;
    default:
      throw new Error(`no mathching "${action.type}" action type`);
  }
};

export default reducer;
