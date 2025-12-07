import { Route, Routes } from "react-router";
import Home from "./components/home/Home.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import LatestNews from "./components/news/LatestNews.jsx";
import NewsDetails from "./components/news/NewsDetails.jsx";
import CoinDetails from "./components/coin/CoinDetails.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";

export default function App() {

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
            </Routes>
            <Footer />
        </div>
        </>
    )
}