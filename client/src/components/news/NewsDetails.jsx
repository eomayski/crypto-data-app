import { Calendar1, Link, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function NewsDetails() {

    const {newsId} = useParams()
    
    // 1. Инициализираме като празен обект {}
    const [news, setNews] = useState ({}) 
    
    useEffect(() => {
        if (newsId) {
            fetch(`https://data-api.coindesk.com/news/v1/article/get?guid=${newsId}&source_key=bitcoinist`)
                .then(response => response.json())
                .then(result => setNews(result.Data))
                .catch((err) => alert(err.message));
        }
    }, [newsId]);

    const dateFormatted = news.PUBLISHED_ON 
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: 'long',
            day: '2-digit'
        }).format(news.PUBLISHED_ON * 1000)
        : 'Loading...';

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Може да добавиш и обща проверка за зареждане */}
        {Object.keys(news).length === 0 ? (
            <div className="text-center text-xl text-indigo-400">Loading news details...</div>
        ) : (
            <>
                <div className="flex flex-col md:flex-row gap-8 mb-10 p-6 bg-gray-800 rounded-xl shadow-2xl">
                
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <img 
                    src={news.IMAGE_URL} 
                    alt={news.TITLE}
                    className="w-full h-auto object-cover object-center rounded-lg aspect-square" 
                    />
                </div>
                
                <div className="w-full md:w-2/3 flex flex-col justify-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-4">
                    {news.TITLE}
                    </h1>
                    
                    <div className="space-y-3 text-gray-300">
                    
                    <p className="flex items-center text-sm">
                        <span className="mr-2 text-lg"><Calendar1/></span>
                        <span className="font-semibold text-white mr-1">Published:</span> {dateFormatted}
                    </p>
                    
                    <p className="flex items-center text-sm">
                        <span className="mr-2 text-lg"><PenLine /></span>
                        <span className="font-semibold text-white mr-1">Author:</span> {news.AUTHORS}
                    </p>
                    
                    <p className="flex items-center text-sm">
                        <span className="mr-2 text-lg"><Link/></span>
                        <span className="font-semibold text-white mr-1">Source:</span>
                        <a 
                        href={news.URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline transition duration-150"
                        >
                        Bitcoinist
                        </a>
                    </p>
                    </div>
                </div>
                
                </div>

                <div className="text-lg leading-relaxed text-gray-300">
                    <p className="whitespace-pre-line">
                        {news.BODY}
                    </p>
                </div>
            </>
        )}
      </div>
    </div>
  );
}