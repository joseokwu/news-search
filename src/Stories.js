import { useGlobalContext } from './context';

const Stories = () => {
  const { isLoading, news, remove } = useGlobalContext();

  //Set loading
  if (isLoading) {
    return <div className='loading'></div>;
  } else {
    //Loop through list and set individual items
    return (
      <div className='news-items'>
        {news.map((item) => {
          const { title, url, author, points, num_comments, objectID } = item;
          return (
            <div className='news-tags' key={objectID}>
              <h4>{title}</h4>
              <p>{`${points} points by ${author} | ${num_comments} comments`}</p>
              <div className='news-clicks'>
                <a href={url} target='_blank' rel='noreferrer' className='more'>
                  Read More
                </a>
                <button className='remove' onClick={() => remove(objectID)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Stories;
