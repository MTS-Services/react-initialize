import React from "react";

const userData = {
  name: "James Roy",
  email: "james@example.com",
  phone: "+880 1234 567890",
  avatar: "/avatar.png",
  role: "Frontend Developer",
  bio: "Passionate about building user-centric web apps with React and Tailwind CSS.",
  joined: "January 2024",
};

const ProfilePage = () => {
  return (
    <section
      className="min-h-screen bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-2 py-16.5"
      style={{ fontFamily: "var(--font-secondary)" }}
    >
      {/* Background Cover */}
      <div
        className="relative mb-[-4rem] h-64 rounded-3xl bg-cover bg-center shadow-md"
        style={{ backgroundImage: `url('/city-Denver.jpg')` }}
      ></div>

      {/* Profile Card */}
      <div className="relative z-10 mx-auto mt-[-3rem] flex w-full max-w-4xl flex-col items-center gap-10 rounded-3xl bg-white p-6 shadow-xl md:flex-row md:p-10">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-40 w-auto rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="w-full flex-1 space-y-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#19398A]">
              {userData.name}
            </h2>
            <p className="text-lg font-medium text-gray-500">{userData.role}</p>
          </div>

          <div className="space-y-2 text-sm text-gray-700 md:text-base">
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {userData.phone}
            </p>
            <p>
              <span className="font-semibold">Joined:</span> {userData.joined}
            </p>
          </div>

          <div>
            <h4 className="mb-1 font-semibold text-[#19398A]">About</h4>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
              {userData.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
