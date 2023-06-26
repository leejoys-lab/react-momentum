import React, { useEffect } from "react";
import HeaderHome from '../components/HeaderHome';

function Home() {
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      localStorage.setItem("todos", savedTodos);
    }
  }, []);

    return (
      <div className="Home">
        <HeaderHome />
      </div>
    );
  }
  
  export default Home;
