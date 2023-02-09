import Search from "./Search";
import Navbar from "./Navbar";
import Home from "./Home"
import Flight from "./Flight";
import Airplane from "./Airplane";
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/flight" element={<Flight />} />
        <Route path="/search" element={<Search />} />
        <Route path="/airplane" element={<Airplane />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
