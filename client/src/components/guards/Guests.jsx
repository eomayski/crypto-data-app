import { Navigate, Outlet } from "react-router";

export default function Guests({user}) {
        
    if (!!user) {
            return <Navigate to="/" />
        }

    return <Outlet />;
}