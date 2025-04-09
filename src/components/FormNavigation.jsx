import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const FormNavigation = ({ onBack, onNext }) => {
  return (
    <div className="flex justify-between mt-10">
      <button
        onClick={onBack}
        className="btn btn-secondary flex items-center space-x-2"
      >
        <FiArrowLeft />
        <span>Back</span>
      </button>
      
      <button
        onClick={onNext}
        className="btn btn-primary flex items-center space-x-2"
      >
        <span>Continue</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

export default FormNavigation;