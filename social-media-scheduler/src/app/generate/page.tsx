'use client';

import React, { useState } from "react";

const GeneratePage: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const handleGenerateClick = () => {
    // Add logic here to generate content using AI
    alert("Generating content based on your input...");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Generate AI Content
        </h1>

        <div className="mb-6">
          <label htmlFor="contentInput" className="block text-lg font-medium text-gray-700 mb-2">
            Generate Post Content
          </label>
          <textarea
            id="contentInput"
            className="w-full h-32 p-4 border rounded-lg text-gray-800 focus:outline-none focus:border-blue-400 resize-none"
            placeholder="Enter topic or keywords to generate content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            onClick={handleGenerateClick}
          >
            Generate Content
          </button>
        </div>

        {/* Adding a preview section to enhance UX */}
        {content && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
            <h2 className="text-xl font-bold text-blue-900 mb-2">Generated Content Preview</h2>
            <p className="text-gray-800">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePage;
