import React, { useState } from 'react';
import { FiUser, FiHome, FiFileText, FiCheck, FiAward, FiTool, FiUsers, FiCpu, FiDatabase } from 'react-icons/fi';

const PartnerOnboarding = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    companyName: '',
    registrationNumber: '',
    dateOfIncorporation: '',
    businessType: '',
    
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Capabilities
    primaryExpertise: [],
    technicalSkills: [],
    industryExperience: [],
    teamSize: '',
    
    // Documents
    panCard: null,
    gstCertificate: null,
    incorporationCertificate: null,
    pastWorkSamples: null,
    
    // Capacity
    monthlyCapacity: '',
    preferredEngagementModel: '',
    availableTimeZones: [],
    qualityMetrics: {}
  });

  const expertiseAreas = [
    'Digital Transformation',
    'Cloud Migration',
    'Data Analytics',
    'Process Automation',
    'Legacy Modernization',
    'Cybersecurity',
    'Enterprise Architecture',
    'Business Process Reengineering'
  ];

  const technicalSkills = [
    'Cloud Platforms (AWS/Azure/GCP)',
    'Data Engineering',
    'Machine Learning',
    'RPA Development',
    'API Integration',
    'DevOps',
    'Microservices Architecture',
    'Blockchain'
  ];

  const industries = [
    'Banking',
    'Insurance',
    'Capital Markets',
    'Asset Management',
    'Payments',
    'Regulatory Technology',
    'Wealth Management',
    'Treasury Services'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = async () => {
    if (step === 5) {
      // Simulate verification process
      setTimeout(() => {
        alert('Partner onboarding submitted for verification!');
        onClose();
      }, 2000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">Date of Incorporation</label>
                <input
                  type="date"
                  name="dateOfIncorporation"
                  value={formData.dateOfIncorporation}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">Business Type</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="private">Private Limited</option>
                  <option value="public">Public Limited</option>
                  <option value="llp">LLP</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-field"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">PIN Code</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Capabilities Assessment</h2>
            <div className="space-y-6">
              <div>
                <label className="form-label">Primary Areas of Expertise</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {expertiseAreas.map((area) => (
                    <label key={area} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.primaryExpertise.includes(area)}
                        onChange={() => handleMultiSelect('primaryExpertise', area)}
                        className="rounded border-gray-300 text-primary-600"
                      />
                      <span className="text-sm">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Technical Skills</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {technicalSkills.map((skill) => (
                    <label key={skill} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.technicalSkills.includes(skill)}
                        onChange={() => handleMultiSelect('technicalSkills', skill)}
                        className="rounded border-gray-300 text-primary-600"
                      />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Industry Experience</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {industries.map((industry) => (
                    <label key={industry} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.industryExperience.includes(industry)}
                        onChange={() => handleMultiSelect('industryExperience', industry)}
                        className="rounded border-gray-300 text-primary-600"
                      />
                      <span className="text-sm">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Team Size</label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Team Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Document Upload</h2>
            <div className="space-y-6">
              <div>
                <label className="form-label">PAN Card</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileUpload(e, 'panCard')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label">GST Certificate</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileUpload(e, 'gstCertificate')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label">Past Work Samples</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                        <span>Upload files</span>
                        <input
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={(e) => handleFileUpload(e, 'pastWorkSamples')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Capacity & Engagement Model</h2>
            <div className="space-y-6">
              <div>
                <label className="form-label">Monthly Capacity (Hours)</label>
                <input
                  type="number"
                  name="monthlyCapacity"
                  value={formData.monthlyCapacity}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 160"
                  required
                />
              </div>

              <div>
                <label className="form-label">Preferred Engagement Model</label>
                <select
                  name="preferredEngagementModel"
                  value={formData.preferredEngagementModel}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Model</option>
                  <option value="time-material">Time & Material</option>
                  <option value="fixed-price">Fixed Price</option>
                  <option value="dedicated-team">Dedicated Team</option>
                  <option value="outcome-based">Outcome Based</option>
                </select>
              </div>

              <div>
                <label className="form-label">Available Time Zones</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['IST', 'GMT', 'EST', 'PST', 'CET', 'JST'].map((zone) => (
                    <label key={zone} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.availableTimeZones.includes(zone)}
                        onChange={() => handleMultiSelect('availableTimeZones', zone)}
                        className="rounded border-gray-300 text-primary-600"
                      />
                      <span className="text-sm">{zone}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Quality Metrics</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Code Quality Score (%)</label>
                    <input
                      type="number"
                      name="codeQualityScore"
                      onChange={(e) => handleInputChange({
                        target: {
                          name: 'qualityMetrics',
                          value: { ...formData.qualityMetrics, codeQuality: e.target.value }
                        }
                      })}
                      className="input-field"
                      placeholder="e.g., 95"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">On-time Delivery (%)</label>
                    <input
                      type="number"
                      name="deliveryScore"
                      onChange={(e) => handleInputChange({
                        target: {
                          name: 'qualityMetrics',
                          value: { ...formData.qualityMetrics, delivery: e.target.value }
                        }
                      })}
                      className="input-field"
                      placeholder="e.g., 98"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Partner Onboarding</h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {[
                { icon: <FiHome />, label: 'Basic Info' },
                { icon: <FiUser />, label: 'Contact' },
                { icon: <FiTool />, label: 'Capabilities' },
                { icon: <FiFileText />, label: 'Documents' },
                { icon: <FiUsers />, label: 'Capacity' }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center relative z-10 ${
                    step > index ? 'text-green-500' : step === index + 1 ? 'text-primary-500' : 'text-gray-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step > index
                        ? 'bg-green-100'
                        : step === index + 1
                        ? 'bg-primary-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    {step > index ? <FiCheck /> : item.icon}
                  </div>
                  <span className="mt-2 text-sm">{item.label}</span>
                </div>
              ))}
              <div
                className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full -z-10"
                style={{
                  background: `linear-gradient(to right, #10B981 ${((step - 1) / 4) * 100}%, #E5E7EB ${((step - 1) / 4) * 100}%)`
                }}
              />
            </div>
          </div>

          <div className="mb-8">{renderStep()}</div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="btn btn-secondary"
              disabled={step === 1}
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              {step === 5 ? 'Submit for Verification' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerOnboarding;