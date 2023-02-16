import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/Map/Map";
import HospitalList from "./components/HospitalList/HospitalList"
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import HospitalSort from "./components/HospitalSort/HospitalSort";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<HospitalList />} />
          <Route path="/sorted" element={<HospitalSort />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
