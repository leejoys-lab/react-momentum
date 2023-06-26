import React, { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import "./Quotes.scss";

const Quotes = () => {
  const [quote, setQuote] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.qwer.pw/request/helpful_text?apikey=guest");
      const data = await response.json();
      const { result, respond } = data[1];

      if (respond.length > 40) {
        fetchQuote(); // Fetch a new quote recursively
      } else {
        setQuote(respond);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleButtonClick = () => {
    fetchQuote();
  };

  return (
    <div className="Quotes-wrap" onClick={handleButtonClick}>
      <p className="Quotes">{quote}</p>
      <span>
        <AiOutlineReload className="react-icon" />
      </span>
    </div>
  );
};

export default Quotes;
