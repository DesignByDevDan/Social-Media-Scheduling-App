import React from "react";
import Link from "next/link";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-lg font-bold">
          <Link href="/">Social Media Scheduler</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/schedule" className="text-white hover:text-blue-300">
            Schedule Post
          </Link>

          <Link href="/drafts" className="text-white hover:text-blue-300">
            View Drafts
          </Link>

          <Link href="/generate" className="text-white hover:text-blue-300">
            Generate AI Content
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
