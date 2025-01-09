import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Effect to apply theme class on mount and save it to localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center justify-center">
      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="text-2xl p-2 transition-all duration-300"
      >
        {theme === "light" ? (
          <FaMoon className="text-gray-600" />
        ) : (
          <FaSun className="text-yellow-400" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
