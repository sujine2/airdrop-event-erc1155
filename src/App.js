import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Main from "./main";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/event" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
