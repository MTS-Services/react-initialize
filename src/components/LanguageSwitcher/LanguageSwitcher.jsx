import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import nlFlag from "/flags.png"; // Your Dutch flag
import usFlag from "/united-states.png";

const languages = [
  { code: "en", name: "English", flag: usFlag },
  { code: "nl", name: "Dutch", flag: nlFlag },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

  const menuRef = useRef();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang) => {
    setSelected(lang);
    i18n.changeLanguage(lang.code);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={menuRef}>
      {/* Selected Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-transparent text-[var(--color-accent)] rounded-lg  transition"
      >
        <img src={selected.flag} alt={selected.name} className="w-5 h-5" />
        <span className="text-sm">{selected.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-[var(--color-card)] border border-[var(--color-border-color)] rounded-md shadow-md">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white cursor-pointer transition"
            >
              <img src={lang.flag} alt={lang.name} className="w-6 h-6" />
              <span className="text-sm text-white">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
