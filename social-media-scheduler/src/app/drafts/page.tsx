'use client';

import React, { useEffect, useState } from "react";

const DraftsPage: React.FC = () => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    // Fetch the drafts from the backend API
    const fetchDrafts = async () => {
      try {
        const res = await fetch("/api/drafts");
        if (res.ok) {
          const data = await res.json();
          setDrafts(data.drafts);
        }
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };
    fetchDrafts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Your Saved Drafts
      </h1>

      {drafts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105"
            >
              <p className="text-gray-800 mb-4 text-lg">
                {draft.content}
              </p>

              <div className="flex justify-between items-center mt-4">
                <button
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 text-xl">
          No drafts found. Start creating your content!
        </p>
      )}
    </div>
  );
};

export default DraftsPage;
