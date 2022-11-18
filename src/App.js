import React from "react";
import "./App.css";
import useLocalStorage from "use-local-storage";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

function App() {

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
          <form>
            <input type="url"
              name="url"
              id="url"
              placeholder="https://example.com"
              pattern="https://.*" size="30"
              required />
            <button>CONVERT</button>
          </form>
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