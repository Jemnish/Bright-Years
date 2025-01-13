"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

type ThemeSwitcherProps = {
  onChange?: (isDark: boolean) => void;
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onChange }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Notify parent component about the initial theme
    if (onChange) {
      onChange(theme === "dark");
    }
  }, [theme, onChange]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Notify parent component about the theme change
    if (onChange) {
      onChange(newTheme === "dark");
    }
  };

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          fill="black"
          size={25}
          onClick={toggleTheme}
        />
      ) : (
        <BiSun size={25} className="cursor-pointer" onClick={toggleTheme} />
      )}
    </div>
  );
};
