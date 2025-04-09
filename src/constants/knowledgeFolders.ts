import { KnowledgeFolder } from '../types';
import { FiFolder } from 'react-icons/fi';

export const knowledgeFolders: KnowledgeFolder[] = [
  {
    name: 'Alt.Data (Powered by Thurro)',
    icon: <FiFolder className="text-purple-500" />,
    categories: {
      'Auto': {
        preview: ['Registrations by Segment', 'OEM Wise Registration', 'Fuel Mix Registrations'],
        all: ['Registrations by Segment', 'OEM Wise Registration', 'Fuel Mix Registrations', 'Prices']
      },
      // ... other categories
    }
  },
  // ... other folders
];