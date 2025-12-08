import { Navigate, useParams } from "react-router";
import { useUserContext } from "../../contexts/UserContext.jsx";

export default function Favorites() {
    const {userId} = useParams();
    const {user} = useUserContext();

    
    

    if (!user || user['_id'] !== userId) {
            return <Navigate to="/" />
        }

    return (
        <>
        <div>
            <h1>Favorites</h1>
        </div>
        </>
    );
}