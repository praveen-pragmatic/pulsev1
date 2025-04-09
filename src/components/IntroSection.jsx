import React from 'react';
import { FiArrowRight, FiClipboard, FiFileText, FiCheckCircle, FiPieChart } from 'react-icons/fi';

const IntroSection = ({ onNext }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to the Project Specification Generator</h2>
        <p className="text-lg text-gray-600">
          Create a comprehensive project specification in minutes, not hours
        </p>
      </div>
      
      <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
        <h3 className="text-xl font-semibold text-primary-700 mb-4">How It Works</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-primary-600 font-medium">1</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-md font-medium text-gray-900">Answer Questions Step by Step</h4>
              <p className="text-gray-600">
                We'll guide you through a series of questions about your business needs, project requirements, and success criteria.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-primary-600 font-medium">2</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-md font-medium text-gray-900">Review Your Information</h4>
              <p className="text-gray-600">
                You can review and edit your responses at any time to ensure accuracy and completeness.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-primary-600 font-medium">3</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-md font-medium text-gray-900">Generate Your Specification</h4>
              <p className="text-gray-600">
                We'll compile your answers into a professional, comprehensive project specification document.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <FiClipboard className="w-10 h-10 text-primary-500 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Save Time</h3>
          <p className="text-gray-600">Create professional project specifications in minutes instead of days</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <FiFileText className="w-10 h-10 text-primary-500 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Comprehensive</h3>
          <p className="text-gray-600">Covers all aspects from user needs to technical architecture</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <FiCheckCircle className="w-10 h-10 text-primary-500 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Set Clear Expectations</h3>
          <p className="text-gray-600">Ensure all stakeholders understand project scope and deliverables</p>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          onClick={onNext}
          className="btn btn-primary flex items-center space-x-2 text-lg px-6 py-3"
        >
          <span>Get Started</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default IntroSection;