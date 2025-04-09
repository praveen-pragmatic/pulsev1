import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import FormNavigation from './FormNavigation';

const ProjectRequirementsForm = ({ formData, onChange, onNext, onBack }) => {
  const handleChange = (e) => {
    onChange('projectRequirements', e.target.name, e.target.value);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Requirements</h2>
        <p className="text-gray-600">
          Detail the technical and functional requirements for your project.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="form-group">
          <label htmlFor="features" className="form-label">Must-have Features and Capabilities</label>
          <textarea
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Video consultation capability, Secure messaging between patients and providers, Automated appointment reminders"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What core features must be included for the project to succeed?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="technicalConstraints" className="form-label">Technical Constraints or Preferences</label>
          <textarea
            id="technicalConstraints"
            name="technicalConstraints"
            value={formData.technicalConstraints}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Must work on iOS and Android devices, Should be built using React.js, Must support low-bandwidth connections"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            Are there specific technologies, platforms, or constraints to consider?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="integrationRequirements" className="form-label">Integration Requirements with Existing Systems</label>
          <textarea
            id="integrationRequirements"
            name="integrationRequirements"
            value={formData.integrationRequirements}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Must integrate with Epic EHR system, Needs to connect with existing payment processor, Should push data to analytics platform"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What existing systems must this project connect with?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="securityCompliance" className="form-label">Security/Compliance Considerations</label>
          <textarea
            id="securityCompliance"
            name="securityCompliance"
            value={formData.securityCompliance}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Must be HIPAA compliant, Requires SOC 2 certification, Needs role-based access control"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What security requirements or compliance standards must be met?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="performanceExpectations" className="form-label">Performance Expectations</label>
          <textarea
            id="performanceExpectations"
            name="performanceExpectations"
            value={formData.performanceExpectations}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Must support 1,000 concurrent users, Page load times under 2 seconds, 99.9% uptime requirement"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What performance metrics must the system meet?
          </p>
        </div>
      </div>
      
      <FormNavigation onBack={onBack} onNext={onNext} />
    </div>
  );
};

export default ProjectRequirementsForm;