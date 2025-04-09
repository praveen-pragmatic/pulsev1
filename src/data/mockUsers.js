// Move mockUsers from auth/mockUsers.js to here
export const mockUsers = [
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
  }
]; // Just keep 1 example user, add more as needed