import React,{ useEffect, useState } from 'react'
import NewsItem from './NewsItem'

const News = (props) => {

    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);

    const updateNews = async ()=>{
      props.setProgress(5);
      let url = `https://newsdata.io/api/1/news?apikey=pub_176249990e087243133b3e1fd6cc5c617a399&country=${props.country}&category=${props.newsCatogory}`;
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

    return (
        <>
      <div className="container my-3">
        <h1> Knowledge News - Top Headlines </h1>
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

export default News


