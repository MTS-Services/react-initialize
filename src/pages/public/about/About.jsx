import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

import Button from "../../../components/ui/Button";
import { useLanguage } from "../../../hook/useLanguage";

const faqData = [
  {
    question: "How often do you search rental websites?",
    answer:
      "Every 2 minutes our search bots scour the internet to find your ideal rental.",
  },
  {
    question: "How many websites do you search?",
    answer:
      "We search over 100 trusted rental platforms across multiple countries.",
  },
  {
    question: "In which cities do you search?",
    answer:
      "We currently cover 50+ major cities including New York, Amsterdam, Berlin, and London.",
  },
  {
    question: "Will there be extra costs if I have found a home?",
    answer:
      "No. Once you’ve found a home, you won’t be charged any additional fees.",
  },
  {
    question: "What if I have found a home?",
    answer:
      "You can pause or cancel your search anytime through your dashboard.",
  },
];

const howworks = [
  {
    title: "Aanmelden",
    desc: "Maak in een paar minuten jouw account aan en start direct met zoeken.",
  },
  {
    title: "Woning zoeken",
    desc: "Vind jouw droomwoning in je favoriete stad met onze handige zoekfilters.",
  },
  {
    title: "Blijf op de hoogte",
    desc: "Nog niet gevonden wat je zocht? Je ontvangt dagelijks of wekelijks nieuwe huurwoningen in je inbox.",
  },
  {
    title: "Verhuizen maar",
    desc: "Reageer, plan een bezichtiging en begin vast met inpakken. Jouw nieuwe woning wacht op je!",
  },
];

const About = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="flex w-full flex-col">
      {/* === Background Section === */}
      <div className="relative h-[611px] w-full">
        {/* Background Image */}
        <img
          src="/howworks.jpg"
          alt="House"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />

        {/* Centered Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-lato mb-6 max-w-[676px] text-4xl leading-tight font-semibold text-white capitalize md:text-6xl">
            {t("about.hero.title1")} <br />
            <span className="text-[#3CAAFA]">{t("about.hero.title2")}</span>
          </h1>
          <p className="font-inter max-w-[676px] text-base leading-normal font-normal text-white">
            {t("about.hero.desc")}
          </p>
        </div>
      </div>

      {/* How to Works Section */}
      <section className="relative w-full overflow-hidden bg-[linear-gradient(90deg,_#FFFEEB,_#E9F6FF)] px-6 py-16">
        {/* Decorative Rotated Images */}
        <img
          className="absolute top-0 -left-[464px] h-64 w-[928px] rotate-90"
          src="/png-wing-2.png"
          alt="decor-top"
        />
        <img
          className="absolute -right-[404px] bottom-0 h-64 w-[928px] -rotate-90"
          src="/png-wing-2.png"
          alt="decor-bottom"
        />
        <img
          className="absolute top-0 left-1/2 h-[654px] w-[875px] -translate-x-1/2 object-contain"
          src="/png-wing-2.png"
          alt="main-illustration"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="capitalize">{t("home.work.title")}</h2>
            <p className="font-inter text-base font-normal text-black">
              {t("home.work.desc")}
            </p>
          </div>

          {/* Steps */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howworks.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-4 rounded-lg bg-white px-6 py-16 shadow-sm"
              >
                <div className="font-lato flex h-14 w-14 items-center justify-center rounded bg-[#0278d9] text-2xl font-medium text-white">
                  {idx + 1}
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-lato text-xl font-semibold text-black capitalize">
                    {step.title}
                  </h3>
                  <p className="font-inter font-normal text-black">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Why Choose Us Section === */}
      <section className="mx-auto mb-0 flex w-full max-w-7xl flex-col items-center justify-between gap-12 py-16 md:px-0 lg:flex-row">
        <div className="w-full space-y-6 px-4 lg:w-1/2">
          <h2 className="font-lato text-4xl font-semibold text-gray-900 capitalize">
            {t("about.whyChoose.title")}
          </h2>
          <p className="font-inter text-base leading-relaxed font-normal text-gray-700">
            {t("about.whyChoose.desc")}
          </p>

          <Button size="lg" variant="yellowGradient" className="">
            {t("about.whyChoose.button")}
          </Button>
        </div>

        {/* Right Image with Custom Clip Path */}
        <div className="w-full max-w-[589px] px-4">
          <img
            src="/works.png"
            alt="Why Choose Us"
            className="h-auto w-full object-contain"
          />
        </div>
      </section>

      {/* === FAQ Section === */}
      <div className="mb-10 w-full bg-white px-6 md:px-12 lg:px-24 lg:py-26">
        <h2 className="font-lato mb-8 text-center text-4xl font-semibold text-black">
          FAQ
        </h2>

        <div className="mx-auto max-w-4xl divide-y divide-gray-200">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-4">
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full cursor-pointer items-center justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-inter text-lg font-bold text-black">
                    {item.question}
                  </span>
                  <span className="text-xl text-black">
                    {isOpen ? <FiX /> : <FiPlus />}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-inter text-base leading-relaxed text-gray-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
