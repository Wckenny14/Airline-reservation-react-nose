import Search from "./Search";
import Navbar from "./Navbar";
import Home from "./Home"
import Flight from "./Flight";
// import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/flight" element={<Flight />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
