import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import FormNavigation from './FormNavigation';

const ProblemStatementForm = ({ formData, onChange, onNext, onBack }) => {
  const handleChange = (e) => {
    onChange('problemStatement', e.target.name, e.target.value);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Problem Statement</h2>
        <p className="text-gray-600">
          Define the specific challenges and issues this project aims to address.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="form-group">
          <label htmlFor="challenges" className="form-label">Specific Challenges You're Trying to Address</label>
          <textarea
            id="challenges"
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Long wait times for appointments, Lack of remote healthcare options for rural patients"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What specific problems does this project need to solve?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="limitations" className="form-label">Current Workflow/Process Limitations</label>
          <textarea
            id="limitations"
            name="limitations"
            value={formData.limitations}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Paper-based record keeping is error-prone, Current scheduling system doesn't integrate with EHR system"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What isn't working well in your current processes?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="businessImpact" className="form-label">Impact of These Problems on Your Business</label>
          <textarea
            id="businessImpact"
            name="businessImpact"
            value={formData.businessImpact}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., 20% patient drop-off due to scheduling difficulties, $100K annual loss from inefficient processes"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            How are these challenges affecting your business outcomes?
          </p>
        </div>
      </div>
      
      <FormNavigation onBack={onBack} onNext={onNext} />
    </div>
  );
};

export default ProblemStatementForm;