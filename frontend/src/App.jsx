import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Timeline from "./pages/Timeline";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList/>} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
