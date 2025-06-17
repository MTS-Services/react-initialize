const Contact = () => {
  return (
    <div className="flex w-full flex-col">
      {/* === Contact Section === */}
      <div className="mt-16.5 flex min-h-screen w-full flex-col lg:flex-row">
        <div className="h-[250px] w-full lg:h-full lg:w-1/2">
          <img
            src="/contact-image.jpg"
            alt="contact"
            className="h-screen w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-16">
          <form className="w-full max-w-xl space-y-6">
            <div>
              <h2 className="font-lato mb-2 text-4xl font-semibold text-black capitalize md:text-5xl">
                Let’s Get In Touch
              </h2>
              <p className="font-inter text-base text-black">
                Or just reach out manually to{" "}
                <a
                  href="mailto:hellonlproperty.com"
                  className="text-blue-700 underline"
                >
                  hellonlproperty.com
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex w-full flex-col">
                <label className="mb-1 text-sm text-black">First Name</label>
                <input
                  type="text"
                  placeholder="Mirable"
                  className="w-full rounded bg-blue-50 px-4 py-3"
                />
              </div>
              <div className="flex w-full flex-col">
                <label className="mb-1 text-sm text-black">Last Name</label>
                <input
                  type="text"
                  placeholder="Lily"
                  className="w-full rounded bg-blue-50 px-4 py-3"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-black">Email Address</label>
              <input
                type="email"
                placeholder="mirablelily@gmail.com"
                className="w-full rounded bg-blue-50 px-4 py-3"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-black">Phone Number</label>
              <input
                type="tel"
                placeholder="(208) 555-0112"
                className="w-full rounded bg-blue-50 px-4 py-3"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-black">Message</label>
              <textarea
                rows="4"
                placeholder="Your message here..."
                className="w-full resize-none rounded bg-blue-50 px-4 py-3"
              />
            </div>

            <button
              type="submit"
              className="inline-flex max-h-12 w-full transform cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-700 ease-in-out hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:py-4 sm:text-sm md:px-10 md:py-5 md:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
