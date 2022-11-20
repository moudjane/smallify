import React from "react";
import "./App.css";
import useLocalStorage from "use-local-storage";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";

function App() {
  const [urlinput, seturlInput] = useState('')
  const [linkid, setlinkid] = useState({})
  function postdata(url) {
    axios.post('http://localhost:8000/create', {
      url: url
    })
      .then((response) => {
        console.log(response);
        setlinkid(response);

      }, (error) => {
        console.log(error);
      });
  }
  const [theme, setTheme] = useLocalStorage(
    "theme" ? "dark" : "light",
    "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <h1>SMALLIFY</h1>
      <div>
        <div className="container">
          <div className="input-and-button">
            <input
              onChange={e => seturlInput(e.target.value)}
              value={urlinput}
              type="url"
              name="url"
              id="url"
              placeholder="https://example.com/"
              // pattern="" 
              size="30" autocomplete="off"
              required />
            <button onClick={() => postdata(urlinput)}>CONVERT</button>
          </div>
          <div className="result">
            <a className="result-text" href={linkid.data}>{linkid.data}</a>
          </div>
        </div>
      </div>
      <div className="theme-toggle">
        <BsFillSunFill className="theme-icon" />
        {theme === "dark" && (
          <FaToggleOn className="icon" onClick={switchTheme} />
        )}
        {theme === "light" && (
          <FaToggleOff className="icon" onClick={switchTheme} />
        )}
        <BsFillMoonFill className="theme-icon" />
      </div>
    </div>
  );
}

export default App;