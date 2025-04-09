import React, { useState } from 'react';
import { FiUser, FiHome, FiFileText, FiCreditCard, FiCheck, FiStar, FiAward, FiZap, FiX } from 'react-icons/fi';
import useStore from '../store/store';

const EkycOnboarding = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
  const updateSubscription = useStore((state) => state.updateSubscription);
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
    
    // Business Details
    industry: '',
    annualRevenue: '',
    employeeCount: '',
    website: '',
    
    // Documents
    panCard: null,
    gstCertificate: null,
    incorporationCertificate: null,
    
    // Subscription
    selectedTier: ''
  });

  const tiers = [
    {
      name: 'Freemium',
      price: '₹1.5L',
      icon: <FiStar className="h-6 w-6" />,
      features: [
        'Basic diagnostic tools',
        'Limited data ingestion',
        'Standard reports',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: '₹3.0L',
      icon: <FiAward className="h-6 w-6" />,
      features: [
        'Advanced diagnostics',
        'Unlimited data sources',
        'Custom reports',
        'Priority support',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      price: '₹12.0L',
      icon: <FiZap className="h-6 w-6" />,
      features: [
        'Full platform access',
        'Dedicated support team',
        'Custom integrations',
        'White-label options',
        'SLA guarantees'
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      setPaymentStatus('processing');

      if (formData.selectedTier) {
        const clientId = formData.companyName.toLowerCase().replace(/\s+/g, '-');
        try {
          if (typeof updateSubscription === 'function') {
            updateSubscription(clientId, formData.selectedTier);
          } else {
            throw new Error('Subscription update function not available');
          }
        } catch (error) {
          console.error('Error updating subscription:', error);
          setPaymentStatus('error');
          return;
        }
      }
      
      // Simulate payment gateway process
      setTimeout(() => {
        // 90% success rate
        if (Math.random() < 0.9) {
          setPaymentStatus('success');
          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          setPaymentStatus('error');
        }
      }, 3000);
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
                <label className="form-label">Certificate of Incorporation</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileUpload(e, 'incorporationCertificate')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    formData.selectedTier === tier.name
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'selectedTier', value: tier.name } })}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      {tier.icon}
                    </div>
                    {formData.selectedTier === tier.name && (
                      <FiCheck className="text-primary-500 h-5 w-5" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  <p className="text-2xl font-bold text-gray-900 my-2">
                    {tier.price}
                    <span className="text-sm font-normal text-gray-500"> /month</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <FiCheck className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Complete Your Subscription</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">Selected Plan: {formData.selectedTier}</h3>
                <button
                  onClick={() => setStep(4)}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  Change Plan
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {formData.selectedTier === 'Freemium' && 'Monthly fee: ₹1.5L'}
                {formData.selectedTier === 'Professional' && 'Monthly fee: ₹3.0L'}
                {formData.selectedTier === 'Enterprise' && 'Monthly fee: ₹12.0L'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="•••• •••• •••• ••••"
                  maxLength="19"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Name on Card</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="John Smith"
                  required
                />
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Subscription Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{formData.selectedTier} Plan</span>
                    <span className="font-medium">
                      {formData.selectedTier === 'Freemium' && '₹1.5L'}
                      {formData.selectedTier === 'Professional' && '₹3.0L'}
                      {formData.selectedTier === 'Enterprise' && '₹12.0L'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">
                      {formData.selectedTier === 'Freemium' && '₹0.27L'}
                      {formData.selectedTier === 'Professional' && '₹0.54L'}
                      {formData.selectedTier === 'Enterprise' && '₹2.16L'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>Total Monthly Fee</span>
                    <span>
                      {formData.selectedTier === 'Freemium' && '₹1.77L'}
                      {formData.selectedTier === 'Professional' && '₹3.54L'}
                      {formData.selectedTier === 'Enterprise' && '₹14.16L'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                By completing this purchase, you agree to our terms of service and privacy policy.
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
            <h1 className="text-2xl font-bold">Client Onboarding</h1>
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
                { icon: <FiFileText />, label: 'Documents' },
                { icon: <FiStar />, label: 'Plan' },
                { icon: <FiCreditCard />, label: 'Payment' }
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
              disabled={(step === 5 && !formData.selectedTier) || paymentStatus === 'processing'}
            >
              {step === 5 ? (
                paymentStatus === 'processing' ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                    Processing Payment...
                  </div>
                ) : `Subscribe to ${formData.selectedTier}`
              ) : 'Next'}
            </button>
          </div>
          
          {/* Payment Status Messages */}
          {paymentStatus === 'processing' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <div className="animate-spin h-12 w-12 border-4 border-primary-500 rounded-full border-t-transparent"></div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Your Payment</h3>
                  <p className="text-gray-600">Please do not close this window...</p>
                </div>
              </div>
            </div>
          )}
          
          {paymentStatus === 'success' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4 w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                    <FiCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Your subscription has been activated.</p>
                </div>
              </div>
            </div>
          )}
          
          {paymentStatus === 'error' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4 w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                    <FiX className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Failed</h3>
                  <p className="text-gray-600 mb-4">There was an error processing your payment.</p>
                  <button
                    onClick={() => setPaymentStatus('idle')}
                    className="btn btn-primary"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EkycOnboarding;