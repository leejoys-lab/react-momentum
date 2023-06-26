import "./Greet.scss";

const GREET = {
    0: "Good night, ",
    5: "Good morning, ",
    12: "Good afternoon, ",
    17: "Good evening, ",
    21: "Good night, ",
  };
  
  export const getGreetingMessage = (hours, username) => {
    const greeting = Object.entries(GREET)
      .reverse()
      .find(([key]) => parseInt(key) <= hours)[1];
  
    return `${greeting}${username}`;
  };