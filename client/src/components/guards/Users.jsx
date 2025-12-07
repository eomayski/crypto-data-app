import { Navigate, Outlet } from "react-router";

export default function Users({user}) {
        
    if (!user) {
            return <Navigate to="/login" />
        }

    return <Outlet />;
}