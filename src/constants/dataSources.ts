import { DataSourceCategory } from '../types';

export const dataSources: DataSourceCategory[] = [
  {
    category: 'Alt.Data',
    sources: [
      { name: 'Thurro', icon: '📊', description: 'Alternative data platform for financial markets' },
      { name: 'Auto Analytics', icon: '🚗', description: 'Vehicle registration and sales data' },
      { name: 'Banking Flows', icon: '🏦', description: 'Banking transactions and payment flows' }
    ]
  },
  {
    category: 'CRM',
    sources: [
      { name: 'Salesforce', icon: '💼', description: 'Customer relationship management data' },
      { name: 'HubSpot', icon: '🎯', description: 'Marketing and sales platform' },
      { name: 'Zoho', icon: '📊', description: 'Business and customer data' }
    ]
  },
  // ... other categories
];