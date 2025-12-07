import { Route, Routes } from "react-router";
import { useUserContext } from "./contexts/UserContext"

import Home from "./components/home/Home.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import LatestNews from "./components/news/LatestNews.jsx";
import NewsDetails from "./components/news/NewsDetails.jsx";
import CoinDetails from "./components/coin/CoinDetails.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import Logout from "./components/logout/Logout.jsx";

export default function App() {
    const { user } = useUserContext();

    return (
        <>
        <div className="wrapper flex">
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/latest-news" element={<LatestNews count={12}/>} />
                <Route path="/news/:newsId" element={<NewsDetails />} />
                <Route path="/crypto/:coinId" element={<CoinDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

            </Routes>
            <Footer />
        </div>
        </>
    )
}