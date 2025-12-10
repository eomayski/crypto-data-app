import { UserMinus } from 'lucide-react';
import { Link } from 'react-router'; 
import { useUserContext } from '../../contexts/UserContext.jsx';
import { useState } from 'react';
import useRequest from '../../hooks/useRequest.js';

export default function FavoriteCard({ trader, refresh }) {
    

    const [loading, setLoading] = useState(false);
    const { request } = useRequest();
    const { user } = useUserContext();
    
    const currentTraderId = trader['_ownerId']
    
    const unfollowHandler = async () => {
        if (loading) return;
        setLoading(true);
        
        try {
                await request(`/data/followed/${trader['_id']}`, 'DELETE');
                refresh();
            }

        catch (err) {
            alert("Failed to unfollow: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    const { traderUsername, traderAvatar, traderId } = trader;

    console.log(traderUsername);
    
    return (
        <div
            className="bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between border border-gray-700 hover:border-indigo-500 transition duration-150"
        >
            <div className="flex items-center w-full sm:w-1/3 mb-4 sm:mb-0">
                <img
                    src={traderAvatar}
                    alt={traderUsername}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-500"
                />
                <div>
                    <p className="text-xl font-bold text-white">{traderUsername}</p>
                </div>
            </div>

            <div className="flex space-x-3 w-full sm:w-auto justify-end">
                
                    <div>
                            <button
                                onClick={unfollowHandler}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition duration-150 bg-red-600 hover:bg-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                <UserMinus className="w-5 h-5 mr-2" />
                                {loading ? 'Unfollowing...' : 'Unfollow'}
                            </button>
                    </div>
                
                <Link to={`/portfolio/${traderId}`}>
                    <button
                        className="px-4 py-2 text-sm font-medium rounded-lg text-indigo-400 border border-indigo-400 hover:bg-indigo-900/30 transition duration-150"
                    >
                        View Profile
                    </button>
                </Link>
            </div>
        </div>
    );
}