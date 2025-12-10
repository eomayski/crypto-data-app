import { UserPlus, UserMinus } from 'lucide-react';
import { Link } from 'react-router'; 
import { useUserContext } from '../../contexts/UserContext.jsx';
import { useState } from 'react';
import useRequest from '../../hooks/useRequest.js';

export default function TraderCard({ trader, refresh, followedTradersIds }) {
    

    const [loading, setLoading] = useState(false);
    const { request } = useRequest();
    const { user, isAuthenticated } = useUserContext();

    const currentTraderId = trader['_ownerId'];

    
 
    const isCurrentlyFollowed = followedTradersIds.includes(currentTraderId); 

    const isCurrentUser = isAuthenticated && currentTraderId === user['_id'];
    const followButtonClasses = "flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition duration-150";

    const followHandler = async () => {
        if (!isAuthenticated || loading) return;
        setLoading(true);
        
        try {
            await request('/data/followed', 'POST', {
                traderId: currentTraderId,
                traderUsername: trader.username
            });
            refresh();
        } catch (err) {
            alert("Failed to follow: " + err.message);
        } finally {
            setLoading(false);
        }
    }
    
    const unfollowHandler = async () => {
        if (!isAuthenticated || loading) return;
        setLoading(true);
        
        try {
            const query = `_ownerId%3D%22${user['_id']}%22%20and%20traderId%3D%22${currentTraderId}%22`;
            const response = await request(`/data/followed?where=${query}`, 'GET');
            
            if (response && response.length > 0) {
                const followRecordId = response[0]._id;
                await request(`/data/followed/${followRecordId}`, 'DELETE');
                refresh();
            }

        } catch (err) {
            alert("Failed to unfollow: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    const { username, avatarUrl } = trader;

    return (
        <div
            className="bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between border border-gray-700 hover:border-indigo-500 transition duration-150"
        >
            <div className="flex items-center w-full sm:w-1/3 mb-4 sm:mb-0">
                <img
                    src={avatarUrl}
                    alt={username}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-500"
                />
                <div>
                    <p className="text-xl font-bold text-white">{username}</p>
                </div>
            </div>

            <div className="flex space-x-3 w-full sm:w-auto justify-end">
                
                {!isCurrentUser && isAuthenticated && (
                    <div>
                        {isCurrentlyFollowed ?
                            <button
                                onClick={unfollowHandler}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition duration-150 bg-red-600 hover:bg-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                <UserMinus className="w-5 h-5 mr-2" />
                                {loading ? 'Unfollowing...' : 'Unfollow'}
                            </button>
                            : 
                            <button
                                onClick={followHandler}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition duration-150 bg-indigo-600 hover:bg-indigo-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                <UserPlus className="w-5 h-5 mr-2" />
                                {loading ? 'Following...' : 'Follow'}
                            </button>
                        }
                    </div>
                )}
                
                <Link to={`/portfolio/${currentTraderId}`}>
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