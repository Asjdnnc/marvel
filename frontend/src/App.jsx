import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Timeline from "./pages/Timeline";
import Others from "./pages/Others";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList/>} />
        <Route path="/api/movies/:id" element={<MovieDetails />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/others" element={<Others/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}
