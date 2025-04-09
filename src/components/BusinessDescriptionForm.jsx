import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import FormNavigation from './FormNavigation';

const BusinessDescriptionForm = ({ formData, onChange, onNext, onBack }) => {
  const handleChange = (e) => {
    onChange('businessDescription', e.target.name, e.target.value);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Core Business Description</h2>
        <p className="text-gray-600">
          Tell us about your business to help us understand the context of your project.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="form-group">
          <label htmlFor="industry" className="form-label">Industry/Sector</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="e.g., Healthcare, Financial services, E-commerce"
            className="input-field"
          />
          <p className="mt-1 text-sm text-gray-500">
            What industry or sector does your business operate in?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="businessObjective" className="form-label">Primary Business Objective/Mission</label>
          <textarea
            id="businessObjective"
            name="businessObjective"
            value={formData.businessObjective}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., To provide accessible healthcare services through telehealth solutions"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What is your company's primary goal or mission?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="operationalScale" className="form-label">Current Operational Scale</label>
          <textarea
            id="operationalScale"
            name="operationalScale"
            value={formData.operationalScale}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., 50 employees, serving 10,000 customers monthly across 5 states"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            Describe your team size, customer base, geographic reach, etc.
          </p>
        </div>
      </div>
      
      <FormNavigation onBack={onBack} onNext={onNext} />
    </div>
  );
};

export default BusinessDescriptionForm;