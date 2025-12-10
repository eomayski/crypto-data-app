import { Navigate, useParams } from "react-router";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useEffect, useState } from "react";
import FavoriteCard from "./FavoriteCard.jsx";

export default function Favorites() {
    const { userId } = useParams();
    const { user } = useUserContext();
    const [followedTraders, setFollowedTraders] = useState([]);
    const [refresh, setRefresh] = useState(false);


    if (!user || user['_id'] !== userId) {
        return <Navigate to="/" />
    }


    useEffect(() => {
        const abortController = new AbortController();
        fetch(`http://localhost:3030/data/followed?where=_ownerId%3D%22${userId}%22`, { signal: abortController.signal })
            .then(response => response.json())
            .then(result => {
                setFollowedTraders(result);
            })
            .catch((err) => {
                console.error(err.message);
            })



        return () => abortController.abort();


    }, [refresh, userId]);

    function forceRefresh() {
        setRefresh(state => !state);
    }


    return (
        <section className="flex-grow py-16 bg-gray-900 text-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white text-center mb-10">
                    Favorites
                </h2>
                {followedTraders.length !== 0 ? (
                    <div className="space-y-6">
                        {followedTraders.map((trader) => (
                            <FavoriteCard
                                key={trader['_id']}
                                trader={trader}
                                refresh={forceRefresh}
                            />
                        ))}
                    </div>) :
                    (<h2 className="text-3xl font-extrabold text-white text-center mb-10">No Added Favorites yet!</h2>)
                }
            </div>
        </section>
    );
}