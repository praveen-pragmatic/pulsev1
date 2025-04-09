import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep) / totalSteps) * 100;
  
  return (
    <div className="w-64">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;