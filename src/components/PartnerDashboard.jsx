import React, { useState } from 'react';
import { FiFileText, FiClock, FiCheckCircle, FiX, FiSend, FiDownload } from 'react-icons/fi';
import useStore from '../store/store';
import { useAuth } from '../auth/AuthContext';
import { generatePartnerSpec } from '../utils/exportPartnerSpec';
import { downloadMarkdown } from '../utils/downloadMarkdown';

const getPartnerRfps = (adminRfps, partnerId) => {
  return adminRfps.filter(rfp => 
    rfp.assignedPartners && 
    rfp.assignedPartners.includes(partnerId) &&
    rfp.status === 'bidding'
  );
};

const PartnerDashboard = () => {
  const { currentUser } = useAuth();
  const {
    rfps,
    partnerBids,
    submitPartnerBid,
    adminRfps
  } = useStore((state) => ({
    rfps: state.rfps || [],
    partnerBids: state.partnerBids || {},
    submitPartnerBid: state.submitPartnerBid,
    adminRfps: state.adminRfps || []
  }));
  
  // Get RFPs assigned to this partner
  const filteredRfps = React.useMemo(() => 
    getPartnerRfps(adminRfps, currentUser.id),
    [adminRfps, currentUser.id]
  );
  
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidData, setBidData] = useState({
    estimatedCost: '',
    estimatedDuration: '',
    teamSize: '',
    teamComposition: '',
    technicalApproach: '',
    timeline: '',
    methodology: '',
    riskMitigation: '',
    costBreakdown: {
      development: '',
      testing: '',
      projectManagement: '',
      maintenance: '',
      infrastructure: ''
    },
    valueAdditions: ''
  });
  
  const handleSubmitBid = (rfpId) => {
    setShowBidForm(true);
    setSelectedRfp(rfpId);
  };

  const handleBidSubmission = async () => {
    if (!selectedRfp) return;

    try {
      await submitPartnerBid(selectedRfp.rfpId, currentUser.id, {
        partnerId: currentUser.id,
        partnerName: currentUser.name,
        companyDetails: currentUser.companyDetails,
        ...bidData
      });

      // Reset form and close modal
      setBidData({
        estimatedCost: '',
        estimatedDuration: '',
        teamSize: '',
        teamComposition: '',
        technicalApproach: '',
        timeline: '',
        methodology: '',
        riskMitigation: '',
        costBreakdown: {
          development: '',
          testing: '',
          projectManagement: '',
          maintenance: '',
          infrastructure: ''
        },
        valueAdditions: ''
      });
      setSelectedRfp(null);
      alert('Bid submitted successfully!');
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again.');
    }
  };

  const getBidStatus = (rfpId) => {
    return partnerBids[currentUser.id]?.[rfpId] ? 'submitted' : 'pending';
  };

  const handleExportSpec = (rfp) => {
    const spec = generatePartnerSpec(rfp.requirements, rfp.phases, {
      data: {
        projectName: rfp.projectName,
        clientName: rfp.clientName,
        engagementTypes: rfp.engagementTypes || [],
        startDate: rfp.startDate,
        endDate: rfp.endDate
      }
    });
    // Download spec as markdown
    downloadMarkdown(spec, `${rfp.projectName.toLowerCase().replace(/\s+/g, '-')}-spec.md`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Available RFPs</h2>
            <p className="text-gray-600">Review and submit bids for assigned RFPs</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredRfps.length} RFPs assigned
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRfps.map((rfp) => (
            <div key={rfp.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{rfp.title}</h3>
                  <p className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded mt-1">
                    {rfp.rfpId}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      Client: {rfp.clientName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Received: {new Date(rfp.createdAt).toLocaleDateString()}
                    </p>
                    {rfp.bidDetails?.deadline && (
                      <p className="text-sm text-red-600">
                        Bid Deadline: {new Date(rfp.bidDetails.deadline).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleExportSpec(rfp)}
                    className="btn btn-secondary text-sm"
                  >
                    <FiDownload className="mr-2" /> Download
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRfp(rfp);
                      setShowBidForm(true);
                    }}
                    className="btn btn-primary text-sm"
                  >
                    Submit Bid
                  </button>
                </div>
              </div>

              {rfp.requirements && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements Overview</h4>
                  <div className="space-y-4">
                    {rfp.requirements.map((req, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                                {req.requirementId}
                              </span>
                              <h5 className="font-medium text-gray-900">{req.title}</h5>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Area: {req.area}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            req.priority === 'high' ? 'bg-red-100 text-red-800' :
                            req.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {req.priority.charAt(0).toUpperCase() + req.priority.slice(1)} Priority
                          </span>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div>
                            <h6 className="text-xs font-medium text-gray-700 uppercase">Impact</h6>
                            <p className="text-sm text-gray-600">{req.impact}</p>
                          </div>
                          <div>
                            <h6 className="text-xs font-medium text-gray-700 uppercase">Recommendation</h6>
                            <p className="text-sm text-gray-600">{req.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Project Type</h4>
                  <p className="text-sm text-gray-600">{rfp.projectType || 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Timeline</h4>
                  <p className="text-sm text-gray-600">
                    {rfp.startDate && rfp.endDate ? `${rfp.startDate} to ${rfp.endDate}` : 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {filteredRfps.length === 0 && (
            <div className="text-center py-8">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No RFPs Available</h3>
              <p className="mt-1 text-sm text-gray-500">
                You have not been assigned any RFPs yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Bids</h3>
        <div className="space-y-4">
          {Object.entries(partnerBids).map(([rfpId, rfpBids]) => {
            const partnerBid = rfpBids.find(bid => bid.partnerId === currentUser.id);
            if (!partnerBid) return null;
            
            const rfp = adminRfps.find(r => r.id.toString() === rfpId);
            if (!rfp) return null;

            return (
              <div key={rfpId} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{rfp.projectName}</h4>
                    <p className="text-sm text-gray-600">{rfp.clientName}</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Under Review
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">Estimated Cost</h5>
                    <p className="text-sm text-gray-600">₹{partnerBid.estimatedCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">Duration</h5>
                    <p className="text-sm text-gray-600">{partnerBid.estimatedDuration}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">Team Size</h5>
                    <p className="text-sm text-gray-600">{partnerBid.proposedTeam}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Bid Submission Modal */}
      {showBidForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Submit Bid</h3>
              <button onClick={() => setShowBidForm(false)} className="text-gray-400 hover:text-gray-500">
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost & Timeline Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Cost & Timeline</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Estimated Cost (₹)</label>
                  <input
                    type="number"
                    className="input-field mt-1"
                    value={bidData.estimatedCost}
                    onChange={(e) => setBidData({ ...bidData, estimatedCost: e.target.value })}
                    placeholder="Enter total cost in INR"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cost Breakdown</label>
                  <div className="space-y-2 mt-2">
                    {Object.entries({
                      development: 'Development',
                      testing: 'Testing & QA',
                      projectManagement: 'Project Management',
                      maintenance: 'Support & Maintenance',
                      infrastructure: 'Infrastructure & Tools'
                    }).map(([key, label]) => (
                      <div key={key}>
                        <label className="text-xs text-gray-600">{label} (₹)</label>
                        <input
                          type="number"
                          className="input-field mt-1"
                          value={bidData.costBreakdown[key]}
                          onChange={(e) => setBidData({
                            ...bidData,
                            costBreakdown: {
                              ...bidData.costBreakdown,
                              [key]: e.target.value
                            }
                          })}
                          placeholder={`Enter ${label.toLowerCase()} cost`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estimated Duration</label>
                  <input
                    type="text"
                    className="input-field mt-1"
                    value={bidData.estimatedDuration}
                    onChange={(e) => setBidData({ ...bidData, estimatedDuration: e.target.value })}
                    placeholder="e.g., 6 months"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Implementation Timeline</label>
                  <textarea
                    className="input-field mt-1"
                    rows="4"
                    value={bidData.timeline}
                    onChange={(e) => setBidData({ ...bidData, timeline: e.target.value })}
                    placeholder="Describe your implementation phases and milestones"
                  ></textarea>
                </div>
              </div>
              
              {/* Team & Technical Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Team & Technical Approach</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Size</label>
                  <input
                    type="text"
                    className="input-field mt-1"
                    value={bidData.teamSize}
                    onChange={(e) => setBidData({ ...bidData, teamSize: e.target.value })}
                    placeholder="e.g., 8-10 members"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Composition</label>
                  <textarea
                    className="input-field mt-1"
                    rows="3"
                    value={bidData.teamComposition}
                    onChange={(e) => setBidData({ ...bidData, teamComposition: e.target.value })}
                    placeholder="List key roles and expertise (e.g., 1 Tech Lead, 3 Senior Developers...)"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technical Approach</label>
                  <textarea
                    className="input-field mt-1"
                    rows="4"
                    value={bidData.technicalApproach}
                    onChange={(e) => setBidData({ ...bidData, technicalApproach: e.target.value })}
                    placeholder="Describe your technical solution and architecture"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Methodology</label>
                  <textarea
                    className="input-field mt-1"
                    rows="3"
                    value={bidData.methodology}
                    onChange={(e) => setBidData({ ...bidData, methodology: e.target.value })}
                    placeholder="Describe your development methodology and processes"
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Additional Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Risk Mitigation Strategy</label>
                <textarea
                  className="input-field mt-1"
                  rows="3"
                  value={bidData.riskMitigation}
                  onChange={(e) => setBidData({ ...bidData, riskMitigation: e.target.value })}
                  placeholder="Describe potential risks and your mitigation strategies"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Value Additions</label>
                <textarea
                  className="input-field mt-1"
                  rows="3"
                  value={bidData.valueAdditions}
                  onChange={(e) => setBidData({ ...bidData, valueAdditions: e.target.value })}
                  placeholder="Describe any additional value or features you'll provide"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setShowBidForm(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleBidSubmission} className="btn btn-primary">
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerDashboard;