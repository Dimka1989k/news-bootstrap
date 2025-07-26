import { useEffect, useState } from "react";
import { NewsItem } from "./NewsItem";


export const NewsBoard = ({ category = "technology" }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_APP_GNEWS_API_KEY;
  useEffect(() => {
    if (!apiKey) {
      setError("API Key for GNews is missing. Please set VITE_APP_GNEWS_API_KEY in your .env file.");
      return;
    }

    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(category)}&lang=en&country=us&max=10&token=${apiKey}`;


    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.errors || !Array.isArray(data.articles)) {
          setError(`Failed to fetch news: ${data.message || "Unknown error"}`);
          return;
        }

        setArticles(data.articles);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch news: ${err.message}`);
      }
    };

    fetchNews();
  }, [category, apiKey]);

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

      {!error && articles.length === 0 && (
        <p className="text-center text-gray-500">Loading news or missing articles...</p>
      )}

      {!error &&
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.image}
            url={news.url}
          />
        ))}
    </div>
  );
};
