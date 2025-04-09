import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import FormNavigation from './FormNavigation';

const TargetUsersForm = ({ formData, onChange, onNext, onBack }) => {
  const handleChange = (e) => {
    onChange('targetUsers', e.target.name, e.target.value);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Target Users & Stakeholders</h2>
        <p className="text-gray-600">
          Identify who will use the system and who has a stake in its success.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="form-group">
          <label htmlFor="primaryUsers" className="form-label">Primary User Groups and Roles</label>
          <textarea
            id="primaryUsers"
            name="primaryUsers"
            value={formData.primaryUsers}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Medical professionals using the platform to conduct virtual consultations, Patients seeking remote healthcare services"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            Who are the main users of your system? What roles do they play?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="keyStakeholders" className="form-label">Key Stakeholders and Decision Makers</label>
          <textarea
            id="keyStakeholders"
            name="keyStakeholders"
            value={formData.keyStakeholders}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Hospital administrators who need reporting capabilities, Insurance providers requiring integration for claims"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            Who has influence over the project's requirements or success?
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="userPainPoints" className="form-label">User Pain Points and Needs</label>
          <textarea
            id="userPainPoints"
            name="userPainPoints"
            value={formData.userPainPoints}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Patients struggle with complicated scheduling processes, Doctors need better access to patient history during consultations"
            className="input-field"
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            What challenges or frustrations do your users currently experience?
          </p>
        </div>
      </div>
      
      <FormNavigation onBack={onBack} onNext={onNext} />
    </div>
  );
};

export default TargetUsersForm;