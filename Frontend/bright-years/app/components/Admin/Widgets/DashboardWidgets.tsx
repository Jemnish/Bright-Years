import React from "react";
import Image from "next/image";

const DashboardWidgets: React.FC = () => {
  return (
    <div className="mt-10 min-h-screen text-center px-4">
      {/* Admin Page Header */}
      <h1 className="text-3xl font-bold  text-gray-600 mb-6 ">
        Admin Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-10">Welcome to the Admin Page.</p>

      {/* Placeholder for Images */}
      <div className="flex flex-wrap justify-center gap-10 mb-10">
        <div className="overflow-hidden rounded-lg shadow-lg w-72 sm:w-80">
          <Image
            src={require("../../../../public/assets/cover1.png")}
            alt="Cover 1"
            className="w-full h-72 sm:h-80 object-cover"
          />
        </div>
      </div>

      {/* Admin Intro Paragraph */}
      <p className="text-base sm:text-lg text-gray-600 p-4 max-w-3xl mx-auto leading-relaxed">
        Welcome to the Admin Dashboard, your central command center for managing
        and monitoring the platform's operations. With real-time insights,
        intuitive navigation, and a user-friendly design, the dashboard ensures
        you have all the tools necessary to make informed decisions, address
        issues promptly, and maintain optimal efficiency.
      </p>
    </div>
  );
};

export default DashboardWidgets;
