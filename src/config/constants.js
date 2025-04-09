// Move static data to separate config files
export const DIAGNOSTIC_CHECKS = {
  clientData: {
    title: 'Client Data Management',
    checks: [
      'Client profile completeness',
      'Contact information validation', 
      'Investment preferences documentation',
      'Risk profile assessment',
      'KYC documentation'
    ]
  },
  portfolioManagement: {
    title: 'Portfolio Management', 
    checks: [
      'Investment strategy documentation',
      'Portfolio rebalancing frequency',
      'Performance reporting structure',
      'Asset allocation tracking',
      'Risk management protocols'
    ]
  }
  // ... other checks
};

export const DATA_SOURCES = [
  {
    category: 'CRM',
    sources: [
      { name: 'Salesforce', icon: '💼', description: 'Customer relationship management data' },
      { name: 'HubSpot', icon: '🎯', description: 'Marketing and sales platform' },
      { name: 'Zoho', icon: '📊', description: 'Business and customer data' }
    ]
  }
  // ... other sources
];

export const DEPARTMENT_OPTIONS = [
  'Retail Banking',
  'Corporate Banking',
  'Investment Banking',
  // ... other departments
];