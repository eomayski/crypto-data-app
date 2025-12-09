import { User, Calendar, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import formatCurrency from '../../utils/formatCurrency.js';
import formatPercentage from '../../utils/formatPercentage.jsx';
import Position from './Position.jsx';

export default function Portfolio() {
    const { userId } = useParams();
    const [traders, setTraders] = useState([]);
    const [positions, setPositions] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const abortController = new AbortController();
        fetch(`http://localhost:3030/data/traders`, { signal: abortController.signal })
            .then(response => response.json())
            .then(result => {
                setTraders(result);
            })
            .catch((err) => {
                console.log(err.message);
            })

        
            fetch(`http://localhost:3030/data/positions?where=_ownerId%3D%22${userId}%22`, { signal: abortController.signal })
            .then(response => response.json())
            .then(result => {
                setPositions(result);
            })
            .catch((err) => {
                console.log(err.message);
            })

            

        return () => abortController.abort();


    }, [refresh, userId]);


    

    const trader = traders.find(t => t['_ownerId'] === userId);

    

    if (!trader) {
        return <div className="text-white text-center py-12">Trader not found</div>;
    }

    const totalPLColor = 1220 >= 0 ? 'text-green-400' : 'text-red-500';

    const dateFormatted = trader['_createdOn'] 
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: 'long',
            day: '2-digit'
        }).format(new Date(trader['_createdOn']))
        : 'Loading...';

        function forceRefresh() {
            setRefresh(state => !state)
        }

    return (
        <div className="flex flex-grow bg-gray-900 text-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

  
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl mb-12 border border-indigo-500/30">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 border-b border-gray-700 pb-6">

                        <img
                            src={trader.avatarUrl}
                            alt={trader.username}
                            className="w-24 h-24 rounded-full object-cover shadow-xl border-4 border-indigo-600"
                        />

                        {/* Основна Инфо */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-extrabold text-white flex items-center justify-center md:justify-start">
                                {trader.username}
                            </h1>
                            <div className="mt-2 text-sm text-gray-400 space-y-1">
                                <p className="flex items-center justify-center md:justify-start">
                                    <User className="w-4 h-4 mr-2 text-indigo-400" />
                                    <span className="font-medium text-white mr-1">Status:</span> Active Trader
                                </p>
                                <p className="flex items-center justify-center md:justify-start">
                                    <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
                                    <span className="font-medium text-white mr-1">Registered:</span> {dateFormatted}
                                </p>
                                <p className="flex items-center justify-center md:justify-start">
                                    <Users className="w-4 h-4 mr-2 text-indigo-400" />
                                    <span className="font-medium text-white mr-1">Followers:</span> many
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">

                        <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
                            <p className="text-sm font-medium text-gray-400">Total Asset Value (USD)</p>
                            <p className="text-3xl font-bold text-white mt-1">
                                {formatCurrency(12500)}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
                            <p className="text-sm font-medium text-gray-400">Total P&L (USD)</p>
                            <p className={`text-3xl font-bold mt-1 ${totalPLColor}`}>
                                {formatCurrency(1220)}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
                            <p className="text-sm font-medium text-gray-400">Total P&L (%)</p>
                            <p className="text-3xl font-bold mt-1">
                                {formatPercentage(9.75)}
                            </p>
                        </div>
                    </div>
                </div>

                
                <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-indigo-500/50 pb-2">
                    Open Trades:
                </h2>

                <div className="space-y-6">
                    {positions.map((position) => <Position key={position['_id']} asset={position} userId={userId} refresh={forceRefresh}/>)}
                </div>

            </div>
        </div>
    );
}