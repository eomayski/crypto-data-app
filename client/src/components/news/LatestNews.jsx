import { useEffect, useState } from "react";
import NewsCard from "./NewsCard.jsx";


export default function LatestNews({count, name, symbol}) {
    const [latestNews, setLatestNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
        
    const URL = symbol 
        ?  `https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=${count}&categories=${symbol}&source_ids=bitcoinist` 
        : `https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=${count}&source_ids=bitcoinist` 


    useEffect(() => {
        const abortController = new AbortController();
        setIsLoading(true);

        if (!URL) {
            setIsLoading(false);
            return;
        }

        fetch(URL, {signal: abortController.signal})
            .then(response => response.json())
            .then(result => {
                setLatestNews(result.Data || []); 
                setIsLoading(false);
            })
            .catch((err) => {
                setLatestNews([]);
                setIsLoading(false);
                throw(`Error fetching news: ${err.message}`);
            });

            return () => abortController.abort();

    }, [URL, symbol, count]);    

    return (
        <section id="latest-news" className="py-16 bg-gray-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">
                <span className="xl:inline">Latest</span>{' '}
                <span className="text-indigo-400 xl:inline">{name ? `${name}` : 'Crypto'}</span>{' '}
                <span className="xl:inline">News</span>
            </h2>

            {isLoading && 
                <h1 className="text-5xl font-extrabold text-white text-center">
                    Latest News Loading...
                </h1>
            }

            {!isLoading && latestNews.length === 0 && 
                <h1 className="text-5xl font-extrabold text-white text-center">
                    No News Available
                </h1>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {!isLoading && latestNews.map(news => <NewsCard key={news.ID} {...news} />)}
            </div>
          </div>
        </section>
    );
}