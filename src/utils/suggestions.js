// Example suggestion generators for different input types
export const generateSuggestions = {
  projectName: async () => {
    const prefixes = ['Digital', 'Core', 'Enterprise', 'Next-Gen', 'Smart'];
    const domains = ['Banking', 'Payments', 'Lending', 'Wealth', 'Risk'];
    const suffixes = ['Transformation', 'Modernization', 'Innovation', 'Evolution', 'Platform'];
    
    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
    return `${randomItem(prefixes)} ${randomItem(domains)} ${randomItem(suffixes)}`;
  },

  clientName: async () => {
    const prefixes = ['Global', 'Future', 'United', 'Premier', 'Advanced'];
    const types = ['Bank', 'Financial', 'Capital', 'Trust', 'Investment'];
    const suffixes = ['Corporation', 'Partners', 'Group', 'Solutions', 'Services'];
    
    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
    return `${randomItem(prefixes)} ${randomItem(types)} ${randomItem(suffixes)}`;
  },

  projectTitle: async () => {
    const initiatives = ['Core System', 'Digital Channel', 'Payment Gateway', 'Risk Engine', 'Trading Platform'];
    const actions = ['Upgrade', 'Migration', 'Implementation', 'Integration', 'Enhancement'];
    
    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
    return `${randomItem(initiatives)} ${randomItem(actions)} Project`;
  }
};