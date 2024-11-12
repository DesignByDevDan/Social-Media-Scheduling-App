import React, { useState } from 'react';
import axios from 'axios';

const GeneratePostModal = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('/api/ai-content/generate', { prompt });
      setGeneratedContent(response.data.content);
    } catch (error) {
      console.error('Error generating content', error);
    }
  };

  return (
    <div className="modal">
      <h2>Generate Post Content</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter topic or keywords"
      />
      <button onClick={handleGenerate}>Generate</button>
      {generatedContent && (
        <div>
          <h3>Generated Content:</h3>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
};

export default GeneratePostModal;
