import { useEffect, useState } from "react";
import "../sass/news.scss";

interface BBCArticles {
  title: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
}

interface BBCNewsApiResponse {
  articles: BBCArticles[];
}

const BBCNewsComponent = () => {
  const [bbcNews, setNews] = useState<BBCArticles[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const APIKEY = import.meta.env.VITE_REACT_API_KEY;
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${APIKEY}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = (await response.json()) as BBCNewsApiResponse;
      const filteredNews = data.articles.filter(
        (article) => article.urlToImage !== null
      );
      setNews(filteredNews);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news">
      <h1>BBC News</h1>
      <div className="articles-grid">
        {bbcNews.map((article, index) => (
          <div className="article" key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>
              <span>Published: </span>
              {article.publishedAt.slice(0, 10)}
            </p>
            <a href={article.url}>
              <img src={article.urlToImage} alt={article.title} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BBCNewsComponent;
