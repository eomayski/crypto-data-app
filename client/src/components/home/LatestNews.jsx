import { useEffect, useState } from "react";
import { Link } from "react-router";


export default function LatestNews() {
const [latestNews, setLatestNews] = useState([])

    useEffect(() => {
        fetch('https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=3&source_ids=coindesk')
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
            <span className="block xl:inline">Latest</span>{' '}
            <span className="block text-indigo-400 xl:inline">Crypto</span>{' '}
            <span className="block xl:inline">News</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((news) => (
            <div
              key={news.ID}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Using <a> tag as before, replace with <Link> if using React Router */}
              <Link to={`/news/${news.GUID}`} className="block">
                <img
                  className="w-full h-80 object-cover object-top"
                  src={news.IMAGE_URL}
                  alt={news.TITLE}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
                    {news.TITLE}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}