import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

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

const About = () => {
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
          <h1 className="font-lato mb-6 max-w-[676px] text-4xl font-semibold capitalize md:text-6xl">
            How Renting Works On Our Platform
          </h1>
          <p className="font-inter max-w-[676px] text-base leading-normal font-normal">
            Discover and compare rental options from trusted companies all in
            one place. Browse listings, choose what suits you best, and book
            directly. We make it simple, secure, and seamless. A small service
            fee may apply.
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
            <h2 className="font-lato text-4xl font-semibold text-black capitalize">
              Hoe werkt het?
            </h2>
            <p className="font-inter text-base font-normal text-black">
              Homes that we have just discovered
            </p>
          </div>

          {/* Steps */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-4 rounded-lg bg-white px-6 py-16 shadow-sm"
              >
                <div className="font-lato flex h-14 w-14 items-center justify-center rounded bg-yellow-500 text-2xl font-medium text-white">
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
      <div className="mx-auto mb-0 flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-6 py-16 lg:flex-row">
        <div className="w-full space-y-6 lg:w-1/2">
          <h2 className="font-lato text-4xl font-semibold text-gray-900 capitalize">
            Why Choose US
          </h2>
          <p className="font-inter text-base leading-relaxed font-normal text-gray-700">
            Finding the right rental shouldn’t be stressful. That’s why we bring
            together listings from multiple trusted companies in one simple
            platform — so you can compare, choose, and book with confidence.
            With transparent pricing, verified partners, and dedicated support,
            we make the rental experience smooth, secure, and tailored to your
            needs.
          </p>
          <button class="transform rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-700 ease-in-out hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 sm:px-8 sm:py-4 sm:text-sm md:px-10 md:py-5 md:text-base lg:px-8 lg:py-4 lg:text-lg">
            Explore your home
          </button>
        </div>

        {/* Right Image with Custom Clip Path */}
        <div className="w-full max-w-[589px]">
          <img
            src="/works.png"
            alt="Why Choose Us"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      {/* === FAQ Section === */}
      <div className="w-full bg-white px-6 pb-8 md:px-12 lg:px-24">
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

                {isOpen && (
                  <p className="font-inter mt-4 text-base leading-relaxed text-gray-600">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
