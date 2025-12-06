import { useEffect, useState } from "react";
import NewsCard from "./NewsCard.jsx";


export default function LatestNews({count}) {
const [latestNews, setLatestNews] = useState([])

    useEffect(() => {
        fetch(`https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=${count}&source_ids=bitcoinist`)
            .then(response => response.json())
            .then(result => {
                setLatestNews(result.Data);
            })
            .catch((err) => alert(err.message));
    }, []);



  return (
    <section id="latest-news" className="py-16 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            <span className="xl:inline">Latest</span>{' '}
            <span className="text-indigo-400 xl:inline">News</span>
        </h2>

        {latestNews === 0 && <h1>No News Available</h1>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map(news => <NewsCard key={news.ID} {...news} />)}
        </div>
      </div>
    </section>
  );
}