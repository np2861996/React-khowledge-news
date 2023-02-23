import React,{ useEffect, useState } from 'react'
import NewsItem from './NewsItem'
//import Spinner from './Spinner';
import PropTypes from 'prop-types';
import loading1 from "../loading.gif"

const News = (props) => {

    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);

    const updateNews = async ()=>{
      props.setProgress(5);
      let url = `https://newsdata.io/api/1/news?apikey=pub_176249990e087243133b3e1fd6cc5c617a399&country=${props.country}&category=${props.newsCatogory}`;
      /* https://newsdata.io/api/1/news?apikey=pub_176249990e087243133b3e1fd6cc5c617a399&country=${props.country}&category=${props.newsCatogory}https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.newsCatogory}&apiKey=2b0d7f012f5f466489b1c7e0860d8129&page=${page}&pageSize=${props.pageSize}` */
      setLoading(true); 
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.results);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
      
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

      let url = `https://newsdata.io/api/1/news?apikey=pub_176249990e087243133b3e1fd6cc5c617a399&country=${props.country}&category=${props.newsCatogory}`;
       
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


  
   // alert(articles.length);
 
    return (
        <>
      <div className="container my-3">
        <h1> Knowledge News - Top Headlines </h1>
          <div className="text-center">{/* this.state.loading  && <Spinner /> */}</div>
          
        <div className="row">
          
      
            { articles.map((element)=>{
                return  <div className="col-md-4" key={element.title}>
                  
                <NewsItem author={element.creator? element.creator :"unkhown"} date={element.pubDate}   description={element.description ? String(element.description).slice(0, 80): ""} title={element.title ? element.title.slice(0, 50): ""}  imageUrl={element.image_url ? element.image_url: "https://i0.wp.com/www.orissapost.com/wp-content/uploads/2023/02/India-Digital-infra-Technology-Investment.jpg?fit=300%2C188=1"} newsUrl={element.url ? element.url: ""} />
            </div>

            })}
           
        </div>
        
      </div>
      </>
    )
 
}

News.defaultProps = {
  country: 'in',
  //pageSize: 2,
  newsCatogory: 'top',
  totalResults:0
}

News.propTypes = {

  country: PropTypes.string,
  //pagesize: PropTypes.number,
  newsCatogory: PropTypes.string,

}


export default News


