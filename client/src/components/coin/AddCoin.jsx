import { Calendar, CoinsIcon, DollarSign, FileText, Hash } from "lucide-react";
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import useRequest from "../../hooks/useRequest.js";
import useForm from "../../hooks/useForm.js";
import { useUserContext } from "../../contexts/UserContext.jsx";

export default function AddCoin() {
    const { coinId } = useParams()
    const [coin, setCoin] = useState({})
    const { user } = useUserContext();

    useEffect(() => {
        const abortController = new AbortController();
        fetch(`https://data-api.coindesk.com/asset/v2/metadata?assets=${coinId}&quote_asset=USD&asset_language=en-US&asset_lookup_priority=SYMBOL`, { signal: abortController.signal })
            .then(response => response.json())
            .then(result => {
                setCoin(result.Data[coinId]);
            })
            .catch((err) => {
                throw (err.message);
            })

        return () => abortController.abort();

    }, [coinId]);



    const navigate = useNavigate();
    const { request } = useRequest();

    const addCoinHandler = async (values) => {
        const data = values;

        data.quantity=Number(data.quantity)
        data.price=Number(data.price)

        try {
            await request('/data/positions', 'POST', data);

            navigate(`/portfolio/${user['_id']}`);
        } catch (err) {
            alert(err.message)
        }
    }

    const {
        register,
        formAction,
    } = useForm(addCoinHandler, {
        quantity: '',
        price: '',
        date: '',
        exchange: '',
        note: ''
    });


    return (
        <div className="flex flex-grow items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl border border-indigo-500/30">

                <div className="flex flex-col items-center">
                    <img
                        src={coin.LOGO_URL}
                        alt={coin.NAME}
                        className="w-24 h-24 bg-gray-700 p-2 object-cover object-center rounded-full mb-4 shadow-lg"
                    />
                    <h2 className="text-center text-3xl font-extrabold text-white">
                        Add {coin.NAME} to your portfolio
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Log a new transaction for {coin.SYMBOL}.
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={formAction}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        {/* 1. Quantity Field */}
                        <div className="col-span-1">
                            <label htmlFor="quantity" className="sr-only">Quantity</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="quantity"
                                    {...register("quantity")}
                                    type="number"
                                    step="any"
                                    required
                                    className="pl-10 w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    placeholder="Quantity"
                                />
                            </div>
                        </div>

                        {/* 2. Price Field */}
                        <div className="col-span-1">
                            <label htmlFor="price" className="sr-only">Price</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="price"
                                    {...register("price")}
                                    type="number"
                                    step="any"
                                    required
                                    className="pl-10 w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    placeholder="Price per coin"
                                />
                            </div>
                        </div>

                        {/* 3. Date Field */}
                        <div className="col-span-1">
                            <label htmlFor="date" className="sr-only">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="date"
                                    {...register("date")}
                                    type="date"
                                    required
                                    className="pl-10 w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    placeholder="Transaction Date"
                                />
                            </div>
                        </div>

                        {/* 4. Exchange Field*/}
                        <div className="col-span-1">
                            <label htmlFor="exchange" className="sr-only">Exchange</label>
                            <div className="relative">
                                <CoinsIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="exchange"
                                    {...register("exchange")}
                                    type="text"
                                    required
                                    className="pl-10 w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    placeholder="Exchange"
                                />
                            </div>
                        </div>

                        {/* 5. Note Field */}
                        <div className="col-span-2">
                            <label htmlFor="note" className="sr-only">Note (Optional)</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <textarea
                                    id="note"
                                    {...register("note")}
                                    rows="3"
                                    className="pl-10 w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md resize-none"
                                    placeholder="Add a note"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150`}
                        >
                            Add Position
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}