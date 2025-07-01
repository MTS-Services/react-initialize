import React from "react";
import { useTranslation } from "../../../hook/useTranslation";

const CookiePolicy = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <section>
      <header className="relative h-96 w-full">
        {/* Background Image */}
        <img
          src="https://waas.imgix.net/https%3A%2F%2Fwww.northwooduk.com%2Fwp-content%2Fuploads%2F2023%2F12%2Frental-income.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fm=webp%2Cjpg&h=507&ixlib=php-2.1.1&or=0&q=60&w=1920&s=955a9677488ff8362ebb540646c46f89"
          alt="House"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />
      </header>

      <div className="flex justify-center py-8 md:py-10 lg:py-12">
        <div className="w-[90vw] max-w-5xl sm:w-[70vw] lg:w-[80vw]">
          <div className="mb-6 space-x-2">
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-md px-4 py-2 ${language === "en" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("nl")}
              className={`rounded-md px-4 py-2 ${language === "nl" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Dutch
            </button>
          </div>

          {/* Translated content */}
          <h1 className="mb-4 text-3xl font-bold">{t("en.terms.title")}</h1>

          <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            {t("button")}
          </button>

          <p className="mt-4 text-gray-700">
            {t("greeting", { name: "John" })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;
