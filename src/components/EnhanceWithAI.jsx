import React, { useState } from 'react';
import { FiZap, FiCheck, FiX } from 'react-icons/fi';

const enhancementTypes = {
  professional: 'Make more professional',
  concise: 'Make more concise',
  detailed: 'Add more detail',
  formal: 'Make more formal',
  technical: 'Add technical details'
};

const EnhanceWithAI = ({ value, onChange, placeholder }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [enhancementType, setEnhancementType] = useState('professional');
  const [suggestions, setSuggestions] = useState([]);

  const enhanceText = async (type) => {
    if (!value.trim()) return;
    
    setIsEnhancing(true);
    setShowOptions(false);
    try {
      const enhancedVersions = await simulateAIEnhancement(value, type);
      setSuggestions(enhancedVersions);
    } catch (error) {
      console.error('Error enhancing text:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const simulateAIEnhancement = async (text, type) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate multiple suggestions based on type
    switch (type) {
      case 'professional':
        return [
          text.replace(/need to/g, 'shall')
              .replace(/want to/g, 'aim to')
              .replace(/try to/g, 'endeavor to'),
          text.replace(/use/g, 'utilize')
              .replace(/start/g, 'initiate')
              .replace(/end/g, 'conclude'),
          text.replace(/make/g, 'develop')
              .replace(/look at/g, 'analyze')
              .replace(/help/g, 'facilitate')
        ];
      case 'concise':
        return [
          text.split('.').map(s => s.trim()).filter(Boolean).join('. '),
          text.replace(/\b(very|really|basically|actually)\b/g, ''),
          text.replace(/\b(I think that|In my opinion)\b/g, '')
        ];
      case 'detailed':
        return [
          `${text}\n\nKey considerations:\n• Impact analysis\n• Risk assessment\n• Implementation timeline`,
          `${text}\n\nDeliverables:\n• Detailed documentation\n• Technical specifications\n• Success metrics`,
          `${text}\n\nStakeholders:\n• Business users\n• Technical team\n• Project sponsors`
        ];
      case 'formal':
        return [
          text.replace(/get/g, 'obtain')
              .replace(/show/g, 'demonstrate')
              .replace(/tell/g, 'inform'),
          text.replace(/find out/g, 'determine')
              .replace(/look into/g, 'investigate')
              .replace(/set up/g, 'establish'),
          text.replace(/put together/g, 'compile')
              .replace(/come up with/g, 'develop')
              .replace(/go over/g, 'review')
        ];
      case 'technical':
        return [
          `${text}\n\nTechnical Specifications:\n• Architecture: Microservices\n• Stack: Cloud-native\n• Security: OAuth 2.0`,
          `${text}\n\nImplementation Details:\n• RESTful APIs\n• Event-driven architecture\n• Containerized deployment`,
          `${text}\n\nTechnology Stack:\n• Backend: Node.js\n• Frontend: React\n• Database: PostgreSQL`
        ];
      default:
        return [text];
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    onChange({ target: { value: suggestion } });
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field pr-24 ${suggestions.length > 0 ? 'border-primary-500' : ''}`}
        rows="3"
      />
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={isEnhancing || !value.trim()}
        className={`absolute right-2 top-2 btn ${
          isEnhancing ? 'btn-secondary' : 'btn-primary'
        } text-xs py-1 px-2 flex items-center`}
      >
        <FiZap className={`mr-1 ${isEnhancing ? 'animate-pulse' : ''}`} />
        {isEnhancing ? 'Enhancing...' : 'Enhance'}
      </button>
      
      {showOptions && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
          {Object.entries(enhancementTypes).map(([type, label]) => (
            <button
              key={type}
              onClick={() => enhanceText(type)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              {label}
            </button>
          ))}
        </div>
      )}
      
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
          <div className="p-2 border-b">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">AI Suggestions</span>
              <button 
                onClick={() => setSuggestions([])}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionSelect(suggestion)}
                className="w-full text-left p-3 text-sm hover:bg-gray-50 border-b last:border-b-0 flex items-center justify-between"
              >
                <span className="line-clamp-2">{suggestion}</span>
                <FiCheck className="h-4 w-4 text-gray-400 hover:text-primary-500 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhanceWithAI;