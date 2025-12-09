import { UserPlus, UserMinus } from 'lucide-react'; 
import { Link } from 'react-router';

/**
 * TraderCard компонент, предназначен за мапване в списък.
 * Приема prop 'trader' с данните и 'onToggleFollow' хендлър.
 */
export default function TraderCard({ trader }) {
    
    // Деструктуриране на данните на трейдъра за по-чист JSX
    const { username, avatarUrl } = trader;
    
    // Определяне на стиловете за бутоните
    const followButtonClasses = "flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition duration-150";
    
    return (
        <div
            className="bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between border border-gray-700 hover:border-indigo-500 transition duration-150"
        >
            {/* ЛЯВА ЧАСТ: Аватар и Юзърнейм */}
            <div className="flex items-center w-full sm:w-1/3 mb-4 sm:mb-0">
                <img
                    src={avatarUrl || '[AVATAR_URL]'} // Fallback placeholder
                    alt={username || '[USERNAME]'}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-500"
                />
                <div>
                    <p className="text-xl font-bold text-white">{username || '[USERNAME]'}</p>
                </div>
            </div>

            {/* ДЯСНА ЧАСТ: Бутони */}
            <div className="flex space-x-3 w-full sm:w-auto justify-end">

                {/* УСЛОВЕН БУТОН ЗА СЛЕДВАНЕ/СПИРАНЕ */}
                    <button
                        onClick={() => onUnfollowHandler()}
                        className={`${followButtonClasses} bg-red-600 hover:bg-red-700`}
                    >
                        <UserMinus className="w-5 h-5 mr-2" />
                        Unfollow
                    </button>
                    <button
                        onClick={() => onFollowHandler()}
                        className={`${followButtonClasses} bg-indigo-600 hover:bg-indigo-700`}
                    >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Follow
                    </button>

                {/* Бутон за детайли (View Profile) */}
                <Link to={`/portfolio/${trader['_ownerId']}`}>
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