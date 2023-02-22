import React,{ useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);

    const updateNews = async ()=>{
      props.setProgress(10);
      let url = `https://newsdata.io/api/1/news?apikey=pub_176249990e087243133b3e1fd6cc5c617a399&country=${props.country}&category=${props.newsCatogory}`;/* https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.newsCatogory}&apiKey=2b0d7f012f5f466489b1c7e0860d8129&page=${page}&pageSize=${props.pageSize}` */
      setLoading(true); 
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.results);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      
    }
    useEffect( () => {
      updateNews();
    }, []);

   // alert(articles);

    /*  async componentDidMount(){
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.newsCatogory}&apiKey=2b0d7f012f5f466489b1c7e0860d8129&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();

      setArticles(parsedData.articles);
      settotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
  }  */

  /* const  handlePreviousClick = async ()=> {
      
     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.newsCatogory}&apiKey=2b0d7f012f5f466489b1c7e0860d8129&page=${page - 1}&pageSize=${props.pageSize}`;
      setLoading(true);
       let data = await fetch(url);
      let parsedData = await data.json();
      
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } */

    const fetchMoreData = async () => {
      setPage(page + 1)

      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.newsCatogory}&apiKey=2b0d7f012f5f466489b1c7e0860d8129&page=${page + 1}&pageSize=${props.pageSize}`;
       
        setLoading(false);
        let data = await fetch(url);
        let parsedData = await data.json();

         
         setArticles(articles.concat(parsedData.articles));
         setTotalResults(parsedData.totalResults);
      

    };

    /* const handleNextClick = async ()=> {

       if(!(page + 1 > Math.ceil(totalResults/props.pageSize))){
        
        


      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.newsCatogory}&apiKey=2b0d7f012f5f466489b1c7e0860d8129&page=${page + 1}&pageSize=${props.pageSize}`;
      setLoading(true);
        let data = await fetch(url);
          let parsedData = await data.json();
          setArticles(parsedData.articles);
          setPage(page + 1);
          setLoading(false);
      }
    } */


  
   
 
    return (
        <>
      <div className="container my-3">
        <h1> Knowledge News - Top Headlines </h1>
          <div className="text-center">{/* this.state.loading  && <Spinner /> */}</div>
          
        <div className="row">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
            { articles.map((element)=>{
                return  <div className="col-md-4" key={element.title}>
                  
                <NewsItem author={element.author? element.author :"unkhown"} date={element.publishedAt}   description={element.description ? String(element.description).slice(0, 80): ""} title={element.title ? element.title.slice(0, 50): ""}  imageUrl={element.image_url ? element.image_url: ""} newsUrl={element.url ? element.url: ""} />
            </div>

            })}
           </InfiniteScroll>
        </div>
        
      </div>
      </>
    )
 
}

News.defaultProps = {
  country: 'in',
  pageSize: 2,
  newsCatogory: 'top',
  totalResults:0
}

News.propTypes = {

  country: PropTypes.string,
  pagesize: PropTypes.number,
  newsCatogory: PropTypes.string,

}


export default News


