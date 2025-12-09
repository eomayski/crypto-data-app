import { Eye, Edit, Plus, X } from 'lucide-react';
import formatCurrency from "../../utils/formatCurrency.js";
import useRequest from '../../hooks/useRequest.js';
// import formatPercentage from "../../utils/formatPercentage.jsx";

export default function Position({ asset, userId, }) {
    const { request } = useRequest()

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

    return (
        <div
            // key={asset['_id']}
            className="bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between border border-gray-700 hover:border-indigo-500 transition duration-150"
        >
            <div className="flex items-center mb-4 lg:mb-0 lg:w-1/4">
                <img src={asset.logo} alt={asset.symbol} className="w-10 h-10 mr-3 rounded-full" />
                <div>
                    <p className="text-xl font-bold text-white">{asset.symbol}</p>
                    <p className="text-sm text-gray-400">Qty: {asset.quantity}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 lg:w-2/4">
                <div className="text-sm">
                    <p className="text-gray-400">Buy Price</p>
                    <p className="font-medium text-white">{formatCurrency(asset.price)}</p>
                </div>
                {/* <div className="text-sm">
                                    <p className="text-gray-400">Current Value</p>
                                    <p className="font-bold text-white">{formatCurrency(asset.currentValue)}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-400">P&L (USD)</p>
                                    <p className={`font-bold ${asset.plUSD >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                                        {formatCurrency(plUSD)}
                                    </p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-400">P&L (%)</p>
                                    <p className="font-bold">
                                        {formatPercentage(plPercent)}
                                    </p>
                                </div> */}
            </div>

            {/* Buttons */}
            <div className="flex space-x-2 mt-4 lg:mt-0 lg:w-auto">
                <button
                    className="p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition duration-150"
                    title="Details"
                >
                    <Eye className="w-5 h-5" />
                </button>
                <button
                    className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition duration-150"
                    title="Edit Position"
                >
                    <Edit className="w-5 h-5" />
                </button>
                <button
                    className="p-2 rounded-md bg-green-600 hover:bg-green-400 text-white transition duration-150"
                    title="Add More"
                >
                    <Plus className="w-5 h-5" />
                </button>
                <button
                    className="p-2 rounded-md bg-red-600 hover:bg-red-500 text-white transition duration-150"
                    title="Close Position"
                >
                    <X className="w-5 h-5" onClick={closePositionHandler} />
                </button>
            </div>
        </div>
    );
}