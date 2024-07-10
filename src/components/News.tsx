import React, { useState, useEffect } from "react";
import "../sass/news.scss";

interface Article {
  title: string;
  author: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
}

interface ArticleApi {
  articles: Article[];
}

const News: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const API_KEY: string = import.meta.env.VITE_REACT_API_KEY;
  const BASE_URL: string = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Network connection error");
      }
      const data = (await response.json()) as ArticleApi;
      const filteredArticles = data.articles.filter(
        (article: Article) => article.urlToImage !== null
      );
      setNews(filteredArticles);
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <div className="news">
      <h1>Popular in USA</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="articles-grid">
          {news.map((article, index) => (
            <div className="article" key={index}>
              <h2>{article.title}</h2>
              <p>
                <span>Author:</span> {article.author}
              </p>
              <p>{article.description}</p>
              <p>
                <span>Published:</span> {article.publishedAt.slice(0, 10)}
              </p>
              <a href={article.url}>
                <img src={article.urlToImage} alt={article.title} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
