import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/Map/Map";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
