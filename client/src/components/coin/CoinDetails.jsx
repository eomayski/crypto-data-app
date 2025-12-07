import { Globe } from 'lucide-react';
import LatestNews from '../news/LatestNews.jsx';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

export default function CoinDetails() {
    const { coinId } = useParams()
    const [coin, setCoin] = useState({})

    useEffect(() => {
        const abortController = new AbortController();
        fetch(`https://data-api.coindesk.com/asset/v2/metadata?assets=${coinId}&quote_asset=USD&asset_language=en-US&asset_lookup_priority=SYMBOL`, {signal: abortController.signal})
            .then(response => response.json())
            .then(result => {
                setCoin(result.Data[coinId]);
            })
            .catch((err) => {
                throw(err.message);
            })

            return () => abortController.abort();

    }, [coinId]);



    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 4 }).format(amount);
    };

    const formatPercentage = (percent) => {
        const colorClass = percent >= 0 ? 'text-green-400' : 'text-red-500';
        return (
            <span className={colorClass}>
                {percent > 0 ? '▲' : '▼'} {percent ? (percent)?.toFixed(2) : 'Loading...'}%
            </span>
        );
    };

    const priceChangeStatus = coin.SPOT_MOVING_24_HOUR_CHANGE_USD >= 0;
    const priceChangeColor = priceChangeStatus ? 'text-green-400' : 'text-red-500';

    return (
        <>
            <div className="bg-gray-900 text-white py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">


                    <div className="flex flex-col md:flex-row gap-8 mb-10 p-6 bg-gray-800 rounded-xl shadow-2xl">

                        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-gray-700 pb-4 md:pb-0 md:pr-4">
                            <img
                                src={coin.LOGO_URL}
                                alt={coin.NAME}
                                className="w-24 h-24 bg-gray-700 object-cover object-center rounded-full mb-4 shadow-lg"
                            />
                            <h1 className="text-3xl font-extrabold text-white">
                                {coin.NAME}
                            </h1>
                            <p className="text-xl font-semibold text-indigo-400 mt-1">
                                ({coin.SYMBOL})
                            </p>

                            <a
                                href={coin.WEBSITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-gray-400 hover:text-indigo-400 mt-3 transition duration-150"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                {coin.WEBSITE_URL?.replace('https://', '').replace('http://', '').split('/')[0]}
                            </a>
                        </div>

                        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="flex flex-col p-3 bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-400">Current Price</span>
                                <span className="text-2xl font-bold text-white mt-1">{formatCurrency(coin.PRICE_USD)}</span>
                            </div>

                            <div className="flex flex-col p-3 bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-400">Market Cap</span>
                                <span className="lg:text-xl text-m font-bold text-white mt-1 " >{formatCurrency(coin.CIRCULATING_MKT_CAP_USD)}</span>
                            </div>

                            <div className="flex flex-col p-3 bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-400">Price Change (24h, $)</span>
                                <span className={`text-xl font-bold mt-1 ${priceChangeColor}`}>
                                    {priceChangeStatus ? '▲' : '▼'} {formatCurrency((coin.SPOT_MOVING_24_HOUR_CHANGE_USD))}
                                </span>
                            </div>

                            <div className="flex flex-col p-3 bg-gray-700 rounded-lg">
                                <span className="text-sm font-medium text-gray-400">Price Change (24h, %)</span>
                                <span className="text-xl font-bold mt-1">
                                    {formatPercentage(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
                        <h2 className="text-2xl font-extrabold text-white mb-4 border-b border-indigo-500 pb-2">
                            Description
                        </h2>
                        <div className="text-base leading-relaxed text-gray-300">
                            <p className="whitespace-pre-line">
                                {coin.ASSET_DESCRIPTION_SUMMARY}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            {coin.NAME && coin.SYMBOL && (
                <LatestNews count={3} name={coin.NAME} symbol={coin.SYMBOL} />
            )}
        </>
    );
}