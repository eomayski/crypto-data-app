import { Route, Routes } from "react-router";
import Home from "./components/home/Home.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import LatestNews from "./components/news/LatestNews.jsx";
import NewsDetails from "./components/news/NewsDetails.jsx";

export default function App() {

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/latest-news" element={<LatestNews count={9}/>} />
                <Route path="/news/:newsId" element={<NewsDetails/>} />
            </Routes>
            <Footer />
        </>
    )
}