import React from 'react';
import { FiFileText, FiDownload } from 'react-icons/fi';
import useStore from '../store/store';
import { downloadMarkdown } from '../utils/downloadMarkdown';

const ActionView = () => {
  const latestRfp = useStore((state) => {
    const rfps = state.adminRfps || [];
    return rfps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  });

  const handleDownload = (rfp) => {
    downloadMarkdown(rfp.content, `${rfp.title.toLowerCase().replace(/\s+/g, '-')}.md`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Latest Client RFP</h2>
            <p className="text-gray-600">Most recent RFP submitted by clients</p>
          </div>
        </div>

        {latestRfp ? (
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{latestRfp.title}</h3>
                <p className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded mt-1">
                  {latestRfp.rfpId}
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">
                    Client: {latestRfp.clientName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Submitted: {new Date(latestRfp.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(latestRfp)}
                className="btn btn-secondary text-sm"
              >
                <FiDownload className="mr-2" /> Download
              </button>
            </div>

            {latestRfp.requirements && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements Overview</h4>
                <div className="space-y-4">
                  {latestRfp.requirements.map((req) => (
                    <div key={req.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
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
          </div>
        ) : (
          <div className="text-center py-8">
            <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No RFPs Available</h3>
            <p className="mt-1 text-sm text-gray-500">
              No RFPs have been submitted yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionView;