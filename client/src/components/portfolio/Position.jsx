import { useState } from 'react'; // <-- Добавен useState
import { Eye, Edit, Plus, X } from 'lucide-react';
import formatCurrency from "../../utils/formatCurrency.js";
import useRequest from '../../hooks/useRequest.js';
import { useUserContext } from '../../contexts/UserContext.jsx';
import { Link } from 'react-router';


export default function Position({ asset, userId, }) {
    const {user} = useUserContext();
    const { request } = useRequest();
    
    // Състояние за показване на допълнителните детайли
    const [showDetails, setShowDetails] = useState(false); 

    let isOwner = false
        
    if (user) {
        isOwner = user['_id'] === userId   
    }
    
    // Функция за превключване на видимостта на детайлите
    const toggleDetailsHandler = () => {
        setShowDetails(prev => !prev);
    };

    const closePositionHandler = async () => {
        const isConfirmed = confirm(`Confirm closing of your ${asset.symbol} position`);

        if (!isConfirmed) {
            return;
        }

        try {
            await request(`/data/positions/${asset['_id']}`, 'DELETE');
            
        } catch (err) {
            alert('Unable to delete position: ' + err.message);
        }
    };
    
    // Помощна функция за форматиране на датата
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };


    return (
        <div
            // Премахваме lg:flex-row, за да контролираме подредбата на редове
            className="bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col items-start justify-between border border-gray-700 hover:border-indigo-500 transition duration-150"
        >
            {/* РЕД 1: ОСНОВНА ИНФОРМАЦИЯ И БУТОНИ */}
            <div className="flex items-center w-full justify-between">
                
                {/* 1A: Актив & Количество */}
                <div className="flex items-center min-w-[200px] mb-4 sm:mb-0">
                    <img src={asset.logo} alt={asset.symbol} className="w-10 h-10 mr-3 rounded-full" />
                    <div>
                        <p className="text-xl font-bold text-white">{asset.symbol}</p>
                        <p className="text-sm text-gray-400">Qty: {asset.quantity}</p>
                    </div>
                </div>

                {/* 1B: Buy Price (Показва се само на по-големи екрани като summary) */}
                 <div className="hidden md:block text-sm min-w-[120px]">
                    <p className="text-gray-400">Buy Price</p>
                    <p className="font-medium text-white">{formatCurrency(asset.price)}</p>
                </div>

                {/* 1C: Бутони за Действие */}
                <div className="flex space-x-2">
                    {/* Details Button - закачаме toggleDetailsHandler */}
                    <button
                        className={`p-2 rounded-md ${showDetails ? 'bg-indigo-700' : 'bg-gray-700 hover:hover:bg-gray-600'} text-white transition duration-150`}
                        title={showDetails ? "Hide Details" : "Show Details"}
                        onClick={toggleDetailsHandler}
                    >
                        <Eye className="w-5 h-5" />
                    </button>

                    {isOwner && (<>
                    <button
                        className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition duration-150"
                        title="Edit Position"
                        >
                        <Edit className="w-5 h-5" />
                    </button>
                    <Link to={`/add/${asset.symbol}`}>
                    <button
                        className="p-2 rounded-md bg-green-600 hover:bg-green-400 text-white transition duration-150"
                        title="Add More"
                        >
                        <Plus className="w-5 h-5" />
                    </button>
                    </Link>
                    <button
                        className="p-2 rounded-md bg-red-600 hover:bg-red-500 text-white transition duration-150"
                        title="Close Position"
                        onClick={closePositionHandler}
                    >
                        <X className="w-5 h-5" />
                    </button>
                    </>)}
                </div>
            </div>

            {/* РЕД 2: ДОПЪЛНИТЕЛНИ ДЕТАЙЛИ (Рендира се УСЛОВНО) */}
            {showDetails && (
                <div className="w-full mt-4 pt-4 border-t border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">Transaction Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        
                        {/* Buy Price */}
                        <div className="text-sm md:hidden">
                            <p className="text-gray-400">Buy Price</p>
                            <p className="font-medium text-white">{formatCurrency(asset.price)}</p>
                        </div>
                        
                        {/* Дата на Отваряне */}
                        <div className="text-sm">
                            <p className="text-gray-400">Date Opened</p>
                            <p className="font-medium text-white">{formatDate(asset.date)}</p>
                        </div>
                        
                        {/* Борса (Exchange) */}
                        <div className="text-sm">
                            <p className="text-gray-400">Exchange</p>
                            <p className="font-medium text-white">{asset.exchange || 'N/A'}</p>
                        </div>
                        
                        {/* Бележка (Note) - Заема 2 колони на малки екрани */}
                        <div className="text-sm col-span-2"> 
                            <p className="text-gray-400">Note</p>
                            <p className="font-medium text-white whitespace-pre-line">
                                {asset.note || 'No note provided.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}