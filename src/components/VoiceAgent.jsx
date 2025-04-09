import React, { useState, useEffect, useCallback } from 'react';
import { FiMic, FiMicOff, FiMessageSquare } from 'react-icons/fi';

const COMMANDS = {
  'show dashboard': 'dashboard',
  'show benchmarks': 'benchmarks',
  'show transformation': 'transformation-plans',
  'show questionnaires': 'questionnaires',
  'show gap analysis': 'gap-analysis',
  'show data': 'data-ingestion'
};

const VoiceAgent = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          handleCommand(transcriptText);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(event.error);
        setIsListening(false);
        
        let errorMessage = 'An error occurred with the voice assistant.';
        if (event.error === 'not-allowed') {
          errorMessage = 'Please allow microphone access to use the voice assistant.';
        } else if (event.error === 'no-speech') {
          errorMessage = 'No speech was detected. Please try again.';
        }
        
        setMessages(prev => [...prev, { type: 'assistant', text: errorMessage }]);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition is not supported in this browser.');
      setMessages([{ type: 'assistant', text: 'Voice commands are not supported in this browser. Please use a modern browser like Chrome.' }]);
    }
  }, []);

  const handleCommand = useCallback((command) => {
    const normalizedCommand = command.toLowerCase().trim();
    setMessages(prev => [...prev, { type: 'user', text: command }]);
    
    let response = '';
    
    // Find matching command
    const matchedCommand = Object.entries(COMMANDS).find(([key]) => 
      normalizedCommand.includes(key)
    );
    
    if (matchedCommand) {
      const [key, value] = matchedCommand;
      onCommand(value);
      response = `Showing ${key.replace('show ', '')}`;
    } else {
      response = "I'm sorry, I didn't understand that command. You can say things like 'show dashboard' or 'show benchmarks'.";
    }
    
    setMessages(prev => [...prev, { type: 'assistant', text: response }]);
    speak(response);
  }, [onCommand]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (error === 'not-allowed') {
      alert('Please allow microphone access to use the voice assistant.');
      return;
    }
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
      speak('Voice assistant activated. How can I help you?');
    }
    setIsListening(!isListening);
    setError(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {messages.length > 0 && (
          <div className="absolute bottom-full mb-4 right-0 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full shadow-lg transition-colors ${
            isListening ? 'bg-red-500 text-white' : 'bg-primary-600 text-white'
          }`}
        >
          {isListening ? <FiMicOff className="h-6 w-6" /> : <FiMic className="h-6 w-6" />}
        </button>
        
        {error && (
          <div className="absolute bottom-full mb-2 right-0">
            <div className="bg-red-50 text-red-800 rounded-lg shadow-lg p-2 text-sm">
              {error === 'not-allowed' ? 'Microphone access denied' : error}
            </div>
          </div>
        )}
        
        {transcript && isListening && (
          <div className="absolute bottom-full mb-2 right-0">
            <div className="bg-white rounded-lg shadow-lg p-2 text-sm text-gray-600">
              {transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default VoiceAgent