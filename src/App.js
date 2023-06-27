import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./routes/Main";
import Home from "./routes/Home";
import Todos from "./routes/Todos";
import Background from "./components/Background";
import "./reset.scss";

function App() {
  return (
    <div>
      <Background />

      <BrowserRouter basename='/react-momentum'>
        {" "}
        {/* basename을 "/react-momentum"으로 설정 */}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Todos' element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
