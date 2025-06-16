import { useEffect, useState } from "react";
import { NewsItem } from "./NewsItem";

export const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
 
    const apiKey = import.meta.env.VITE_KEY_API;

    if (!apiKey) {
      setError("API Key for NewsAPI is missing. Please set VITE_KEY_API in your environment variables.");
      console.error("NewsBoard: API Key (VITE_KEY_API) is not set.");
      return;
    }

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    const fetchNews = async () => {
      try {
        const response = await fetch(url);     
        if (!response.ok) {
          const errorText = await response.text(); 
          console.error(`NewsAPI Error: Status ${response.status} - ${response.statusText}`, errorText);
          setError(`Failed to fetch news: ${response.status} ${response.statusText}. Details: ${errorText.substring(0, 200)}...`); // Обрізати для читабельності
          return;
        }

        const data = await response.json();
        if (data.status === "ok" && Array.isArray(data.articles)) {
          setArticles(data.articles);
          setError(null); 
        } else {
       
          console.error("NewsAPI returned unexpected data structure:", data);
          setError("Failed to fetch news: Unexpected data from API.");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(`Failed to fetch news: ${err.message}. Please check your internet connection or API key.`);
      }
    };

    fetchNews();
  }, [category]); 

  return (
    <div className="mx-auto" style={{ maxWidth: 1200 }}>
      <h2 className="text-center my-4">
        LATEST{" "}
        <img
          className="mx-2"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/BBC_News_2022.svg/1200px-BBC_News_2022.svg.png"
          alt="BBC News Logo"
          width="120"
          height="44"
        />
      </h2>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      {!error && articles.length === 0 && !articles.loading && (
        <p className="text-center text-gray-500">Loading news or missing articles...</p>
      )}
      {!error && articles.map((news, index) => {
        return (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        );
      })}
    </div>
  );
};