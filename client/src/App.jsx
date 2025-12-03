import { Route, Routes } from "react-router";
import Home from "./components/home/Home.jsx";

export default function App() {

  return (
<>
    <Routes>
    <Route path="/" element={<Home/>} />
    </Routes>
</>
  )
}