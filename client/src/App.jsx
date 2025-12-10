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
import Guests from "./components/guards/Guests.jsx";
import Users from "./components/guards/Users.jsx";
import AddCoin from "./components/coin/AddCoin.jsx";
import Portfolio from "./components/portfolio/Portfolio.jsx";
import Favorites from "./components/favorites/Favorites.jsx";
import Traders from "./components/traders/Traders.jsx";
import EditPosition from "./components/portfolio/EditPosition.jsx";
import { useEffect } from "react";
import useRequest from "./hooks/useRequest.js";

export default function App() {
    const { user } = useUserContext();
    

    return (
        <>
            <div className="wrapper flex">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/latest-news" element={<LatestNews count={12} />} />
                    <Route path="/traders" element={<Traders />} />
                    <Route path="/news/:newsId" element={<NewsDetails />} />
                    <Route path="/crypto/:coinId" element={<CoinDetails />} />
                    <Route path="/portfolio/:userId" element={<Portfolio />} />
                    <Route path="/logout" element={<Logout />} />

                    <Route element={<Guests user={user}/>}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                    <Route element={<Users user={user}/>}>
                        <Route path="/favorites/:userId" element={<Favorites />} />
                        <Route path="/add/:coinId" element={<AddCoin />} />
                        <Route path="/edit/:coinId" element={<EditPosition />} />
                    </Route>

                </Routes>
                <Footer />
            </div>
        </>
    )
}