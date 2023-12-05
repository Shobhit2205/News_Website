import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const capitalizeFirst = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    document.title = `News - ${capitalizeFirst(props.category)}`;

    useEffect(() => {
      return () => {
        updateNews();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const updateNews = async () => {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8601db49fac14a369269e3f70eaeb091&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      
      props.setProgress(100);
    }

    const fetchMoreData = async ()=>{  
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8601db49fac14a369269e3f70eaeb091&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
      let data = await fetch(url);
      let parsedData = await data.json();

      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    }
    
    return (
        <div className='container my-3'>
            <h1 className='text-center' style={{marginTop: '90px'}}>Top Headlines from {capitalizeFirst(props.category)}</h1>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length} 
                next={fetchMoreData} 
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>} 
            >
                <div className="row my-5">
                    {articles.map((element)=>{
                        return <div className="col-md-3 mb-5" key = {element.url}>
                            <NewsItem title = {!element.title ? "" : element.title.slice(0, 40)} description = {!element.description ? "" : element.description.slice(0, 88)} imageUrl={!element.urlToImage ? "https://cdn.ndtv.com/common/images/ogndtv.png" : element.urlToImage} newsUrl = {!element.url ? "" : element.url} author = {element.author} date = {element.publishedAt}/>
                        </div>
                    })}  
                </div>
            </InfiniteScroll>
        
        </div>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
