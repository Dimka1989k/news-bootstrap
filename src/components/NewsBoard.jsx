
import { useEffect, useState } from "react";
import { NewsItem } from "./NewsItem";
;

export const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_KEY_API}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles));
  }, [category]);
  return (
    <div className="mx-auto" style={{maxWidth: 1200}}>
      <h2 className="text-center my-4">
        LATEST <img className="mx-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/BBC_News_2022.svg/1200px-BBC_News_2022.svg.png" alt="Bootstrap" width="120" height="44"/>
      </h2>
      {articles.map((news, index) => {
       return  (
       <NewsItem 
          key={index}
          title={news.title}
          description={news.description}
          src={news.urlToImage}
          url={news.url}
        />
       )
      })}
    </div>
  );
};



