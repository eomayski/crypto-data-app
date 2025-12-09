import { useState } from "react";
import { useEffect } from "react";
import TraderCard from "./TraderCard.jsx";

export default function Traders() {
    const [traders, setTraders] = useState([]);
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


        return () => abortController.abort();


    }, [refresh]);

    console.log(traders);


    if (!traders) {
        return <div className="text-white text-center py-12">No traders found</div>;
    }

    function forceRefresh() {
        setRefresh(state => !state)
    }

    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white text-center mb-10">
                    Top Community Traders
                </h2>
                <div className="space-y-6">
                    {traders.map((trader) => <TraderCard key={trader['_id']} trader={trader} refresh={forceRefresh} />)}
                </div>

            </div>
        </section>
    );
}