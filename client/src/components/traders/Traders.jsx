import { useState } from 'react';
import { UserPlus, UserMinus, TrendingUp } from 'lucide-react';

// Примерни статични данни за трейдъри
const initialTraders = [
    {
        id: 1,
        username: 'CryptoWizard_77',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        performance: 125.43, // Примерна доходност (%)
        isFollowing: false,
    },
    {
        id: 2,
        username: 'DeFi_Shark',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        performance: 88.10,
        isFollowing: true,
    },
    {
        id: 3,
        username: 'BULLISH_ETH',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        performance: 34.60,
        isFollowing: false,
    },
];

export default function Traders() {
    // Управление на състоянието на трейдърите (включително дали са следвани)
    const [traders, setTraders] = useState(initialTraders);
    const [loadingId, setLoadingId] = useState(null); // За управление на състоянието на бутона

    const toggleFollow = async (id) => {
        setLoadingId(id);
        
        // Симулиране на API заявка
        await new Promise(resolve => setTimeout(resolve, 500)); 

        setTraders(prevTraders => 
            prevTraders.map(trader => 
                trader.id === id 
                ? { ...trader, isFollowing: !trader.isFollowing } 
                : trader
            )
        );
        setLoadingId(null);

        // В реално приложение, тук би имало API заявка:
        // const action = traders.find(t => t.id === id).isFollowing ? 'unfollow' : 'follow';
        // await fetch(`/api/user/${id}/${action}`, { method: 'POST' });
    };

    return (
        <section className="flex-grow py-16 bg-gray-900 text-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white text-center mb-10">
                    Top Community Traders
                </h2>

                <div className="space-y-6">
                    {traders.map((trader) => (
                        <div
                            key={trader.id}
                            className="bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between border border-gray-700 hover:border-indigo-500 transition duration-150"
                        >
                            {/* ЛЯВА ЧАСТ: Аватар и Юзърнейм */}
                            <div className="flex items-center w-full sm:w-1/3 mb-4 sm:mb-0">
                                <img 
                                    src={trader.avatarUrl} 
                                    alt={trader.username}
                                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-500"
                                />
                                <div>
                                    <p className="text-xl font-bold text-white">{trader.username}</p>
                                    {/* Пример за показване на доходност */}
                                    <p className="text-sm text-gray-400 flex items-center">
                                        <TrendingUp className="w-4 h-4 mr-1 text-green-400" />
                                        <span className="text-green-400 font-semibold">{trader.performance.toFixed(2)}%</span>
                                    </p>
                                </div>
                            </div>

                            {/* ДЯСНА ЧАСТ: Бутони */}
                            <div className="flex space-x-3 w-full sm:w-auto justify-end">
                                
                                {trader.isFollowing ? (
                                    // Бутон за СПИРАНЕ НА СЛЕДВАНЕТО (Unfollow)
                                    <button
                                        onClick={() => toggleFollow(trader.id)}
                                        disabled={loadingId === trader.id}
                                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loadingId === trader.id ? '...' : <UserMinus className="w-5 h-5" />}
                                    </button>
                                ) : (
                                    // Бутон за СЛЕДВАНЕ (Follow)
                                    <button
                                        onClick={() => toggleFollow(trader.id)}
                                        disabled={loadingId === trader.id}
                                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loadingId === trader.id ? '...' : <UserPlus className="w-5 h-5" />}
                                    </button>
                                )}

                                {/* Бутон за детайли (по избор) */}
                                <button
                                    className="px-4 py-2 text-sm font-medium rounded-lg text-indigo-400 border border-indigo-400 hover:bg-indigo-900/30 transition duration-150"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}