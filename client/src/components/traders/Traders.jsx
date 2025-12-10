import { useState, useEffect } from "react";
import TraderCard from "./TraderCard.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";

export default function Traders() {
    const [traders, setTraders] = useState([]);
    const [followedTraders, setFollowedTraders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const { user, isAuthenticated } = useUserContext();


    useEffect(() => {
        const abortController = new AbortController();

        async function fetchAllData() {
            setIsLoading(true);
            try {
                const tradersPromise = fetch(`http://localhost:3030/data/traders`, { signal: abortController.signal });

                let followedPromise = Promise.resolve([]);
                if (isAuthenticated) {
                    const userId = user['_id'];
                    followedPromise = fetch(`http://localhost:3030/data/followed?where=_ownerId%3D%22${userId}%22`, { signal: abortController.signal });
                }

                const [tradersResponse, followedResponse] = await Promise.all([
                    tradersPromise,
                    followedPromise,
                ]);

                if (tradersResponse.ok) {
                    const tradersResult = await tradersResponse.json();
                    setTraders(tradersResult);
                } else {
                    console.error("Failed to fetch traders.");
                    setTraders([]);
                }

                if (followedResponse.ok) {
                    const followedResult = await followedResponse.json();
                    const followedIds = followedResult.map(record => record.traderId);
                    setFollowedTraders(followedIds);
                } else if (isAuthenticated) {
                    console.error("Failed to fetch followed status.");
                }

            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error("An error occurred during fetch:", err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchAllData();

        return () => abortController.abort();

    }, [refresh, isAuthenticated, user]);


    if (isLoading) {
        return <div className="text-white text-center py-12 text-2xl font-semibold">Loading traders...</div>;
    }

    if (!traders || traders.length === 0) {
        return <div className="text-white text-center py-12">No traders found</div>;
    }

    function forceRefresh() {
        setRefresh(state => !state);
    }

    return (
        <section className="flex-grow py-16 bg-gray-900 text-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white text-center mb-10">
                    Top Community Traders
                </h2>
                <div className="space-y-6">
                    {traders.map((trader) => (
                        <TraderCard 
                            key={trader['_id']} 
                            trader={trader} 
                            refresh={forceRefresh} 
                            followedTradersIds={followedTraders} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}