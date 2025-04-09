import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import FormNavigation from './FormNavigation';

const SuccessCriteriaForm = ({ formData, onChange, onNext, onBack }) => {
  const handleChange = (e) => {
    onChange('successCriteria', e.target.name, e.target.value);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success Criteria</h2>
        <p className="text-gray-600">
          Define how you'll measure the success of this project.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="form-group">
          <label htmlFor="desiredOutcomes" className="form-label">Desired Business Outcomes</label>
          <textarea
            id="desiredOutcomes"
            name="desiredOutcomes"
            value={formData.desiredOutcomes}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Increase patient satisfaction by 30%, Reduce administrative workload by 20%, Expand service to rural areas"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What business goals should this project help achieve?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="measurableGoals" className="form-label">Measurable Goals and Metrics</label>
          <textarea
            id="measurableGoals"
            name="measurableGoals"
            value={formData.measurableGoals}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Reduce patient wait times from 45 to 15 minutes, Increase appointment completion rate by 25%, Achieve 90% user satisfaction rating"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What specific, measurable outcomes will indicate success?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="timeline" className="form-label">Timeline Expectations</label>
          <textarea
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., MVP needed within 3 months, Full platform launch within 6 months, Regional expansion in phases over 12 months"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What are your expected timelines for development and deployment?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="budget" className="form-label">Budget Constraints (if applicable)</label>
          <textarea
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Initial development budget of $150K, Monthly operational budget of $10K, Need to show ROI within 12 months"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What budget limitations should be considered for this project?
          </p>
        </div>
      </div>
      
      <FormNavigation onBack={onBack} onNext={onNext} />
    </div>
  );
};

export default SuccessCriteriaForm;