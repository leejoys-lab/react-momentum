import { useEffect, useState } from "react";
import { getGreetingMessage } from "./Greet";
import "./Clock.scss";
import "./Greet.scss";

const getTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  return [hours, minutes, seconds, milliseconds];
};

const Clock = () => {
  const [[h, m, s, ms], setTime] = useState(getTime());
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const greetingMessage = getGreetingMessage(h, username);

  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(getTime());
    }, 1000 - ms);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [h, m, s, ms]);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <div className="Container">
      <p className="Clock">{`${h}:${m.toString().padStart(2, 0)}:${s
        .toString()
        .padStart(2, 0)}`}</p>
      <p className="Greet">{greetingMessage}</p>
    </div>
  );
};

export default Clock;
