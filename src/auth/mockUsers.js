const mockUsers = [
  {
    id: 1,
    email: 'admin@iouring.com',
    password: 'partner123',
    name: 'iOuring',
    role: 'partner',
    avatar: 'IO',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Bangalore, India',
      expertise: ['Digital Transformation', 'Cloud Migration', 'Custom Development'],
      teamSize: '50-100',
      established: '2015'
    }
  },
  {
    id: 2,
    name: 'Codifi',
    email: 'admin@codifi.dev',
    password: 'partner123',
    role: 'partner',
    avatar: 'CD',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Chennai, India',
      expertise: ['Enterprise Solutions', 'Legacy Modernization', 'DevOps'],
      teamSize: '100-200',
      established: '2012'
    }
  },
  {
    id: 4,
    name: 'CodeBoard',
    email: 'admin@codeboard.tech',
    password: 'partner123',
    role: 'partner',
    avatar: 'CB',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Hyderabad, India',
      expertise: ['Product Development', 'UI/UX Design', 'Mobile Apps'],
      teamSize: '20-50',
      established: '2018'
    }
  },
  {
    id: 5,
    name: '10Decoders',
    email: 'admin@10decoders.com',
    password: 'partner123',
    role: 'partner',
    avatar: '10D',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Coimbatore, India',
      expertise: ['AI/ML', 'Data Analytics', 'Blockchain'],
      teamSize: '100-200',
      established: '2010'
    }
  },
  {
    id: 6,
    name: 'PIT Solutions',
    email: 'admin@pitsolutions.com',
    password: 'partner123',
    role: 'partner',
    avatar: 'PIT',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Trivandrum, India',
      expertise: ['Digital Transformation', 'Web Development', 'Mobile Apps'],
      teamSize: '200-500',
      established: '2008'
    }
  },
  {
    id: 7,
    name: 'Kinitous',
    email: 'admin@kinitous.com',
    password: 'partner123',
    role: 'partner',
    avatar: 'KN',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Bangalore, India',
      expertise: ['Product Engineering', 'Cloud Native', 'DevOps'],
      teamSize: '20-50',
      established: '2019'
    }
  },
  {
    id: 8,
    name: 'Gig Worker',
    email: 'admin@gigworker.com',
    password: 'partner123',
    role: 'partner',
    avatar: 'GW',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Mumbai, India',
      expertise: ['Enterprise Solutions', 'Digital Transformation', 'Data Analytics'],
      teamSize: '50-100',
      established: '2017'
    }
  },
  {
    id: 16,
    name: 'Squaircle',
    email: 'admin@squaircle.dev',
    password: 'partner123',
    role: 'partner',
    avatar: 'SQ',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Bangalore, India',
      expertise: ['Product Development', 'Cloud Solutions', 'Digital Innovation'],
      teamSize: '100-200',
      established: '2016'
    }
  },
  {
    id: 17,
    name: 'Thurro',
    email: 'admin@thurro.tech',
    password: 'partner123',
    role: 'partner',
    avatar: 'TH',
    permissions: ['view_rfps', 'submit_bids', 'view_documents'],
    companyDetails: {
      location: 'Pune, India',
      expertise: ['Fintech Solutions', 'Payment Systems', 'Banking Integration'],
      teamSize: '50-100',
      established: '2018'
    }
  },
  {
    id: 9,
    email: 'admin@pragmatic.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'AU',
    permissions: ['all'],
    clientId: null
  },
  {
    id: 10,
    email: 'sealteam6@pragmatic.com',
    password: 'seal123',
    name: 'Seal Team 6',
    role: 'senior_consultant', 
    avatar: 'ST6',
    assignedClients: ['integrated-india', 'abc-financial-services', 'xyz-banking-corp'],
    expertise: ['Special Operations', 'Crisis Management', 'Strategic Planning'],
    permissions: ['view_clients', 'edit_diagnostics', 'create_reports'],
    clientId: null
  },
  {
    id: 11,
    email: 'agents@pragmatic.com',
    password: 'agent123',
    name: 'Field Agents',
    role: 'junior_consultant',
    avatar: 'FA',
    assignedClients: ['global-investments', 'secure-payments'],
    expertise: ['Field Operations', 'Data Collection', 'Client Relations'],
    permissions: ['view_clients', 'view_diagnostics'],
    clientId: null
  },
  {
    id: 12,
    email: 'agents2@pragmatic.com', 
    password: 'agent123',
    name: 'Field Agents Team 2',
    role: 'junior_consultant',
    avatar: 'FA2',
    assignedClients: ['xyz-banking', 'integrated-india'],
    expertise: ['Process Analysis', 'Requirements Gathering', 'Client Support'],
    permissions: ['view_clients', 'view_diagnostics'],
    clientId: null
  },
  {
    id: 13,
    email: 'lokesh@integrated-india.com',
    password: 'client123',
    name: 'Lokesh Kumar',
    role: 'client',
    avatar: 'LK',
    permissions: ['view_own_data'],
    clientId: 'integrated-india',
    companyName: 'Integrated India',
    metrics: {
      diagnosticProgress: 35,
      criticalGaps: 3,
      completedActions: 12,
      pendingActions: 8,
      tier: 'Enterprise',
      mrr: '₹12.0L'
    }
  },
  {
    id: 14,
    email: 'fintech1@client.com',
    password: 'client123',
    name: 'John Smith',
    role: 'client',
    avatar: 'JS',
    permissions: ['view_own_data'],
    clientId: 'fintech-one',
    companyName: 'Fintech One Solutions',
    metrics: {
      diagnosticProgress: 15,
      criticalGaps: 8,
      completedActions: 5,
      pendingActions: 15,
      tier: 'Freemium',
      mrr: '₹1.5L'
    }
  },
  {
    id: 15,
    email: 'fintech2@client.com',
    password: 'client123',
    name: 'Emma Davis',
    role: 'client',
    avatar: 'ED',
    permissions: ['view_own_data'],
    clientId: 'fintech-two',
    companyName: 'Fintech Two Analytics',
    metrics: {
      diagnosticProgress: 20,
      criticalGaps: 7,
      completedActions: 6,
      pendingActions: 14,
      tier: 'Freemium',
      mrr: '₹1.4L'
    }
  }
];
export { mockUsers };