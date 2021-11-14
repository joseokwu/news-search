import { useGlobalContext } from './context';

const Buttons = () => {
  const { page, nbPages, handlePage, isLoading } = useGlobalContext();
  return (
    <div className='btns-container'>
      <button
        disabled={isLoading}
        className='btn'
        data-id='prev'
        onClick={(e) => handlePage(e.target.dataset.id)}
      >
        Prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button
        disabled={isLoading}
        className='btn'
        data-id='next'
        onClick={(e) => handlePage(e.target.dataset.id)}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
