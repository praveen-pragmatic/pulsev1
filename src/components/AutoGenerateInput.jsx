import React, { useState } from 'react';
import { FiZap } from 'react-icons/fi';

const AutoGenerateInput = ({ value, onChange, placeholder, type = 'text', className = '', generateSuggestions }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Here we would make an API call to generate content
      // For now, simulating with example suggestions
      const suggestion = await generateSuggestions();
      onChange({ target: { value: suggestion } });
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field pr-24 ${className}`}
      />
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 btn ${
          isGenerating ? 'btn-secondary' : 'btn-primary'
        } text-xs py-1 px-2 flex items-center`}
      >
        <FiZap className={`mr-1 ${isGenerating ? 'animate-pulse' : ''}`} />
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
};

export default AutoGenerateInput;