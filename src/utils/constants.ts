// Constants used throughout the application
export const APP_CONFIG = {
  APP_NAME: 'Jarvis',
  VERSION: '1.0.0',
  API_VERSION: 'v1',
  DATE_FORMAT: 'YYYY-MM-DD',
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss'
};

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  CLIENT_DETAILS: '/clients/:id',
  BENCHMARKS: '/benchmarks',
  DATA_INGESTION: '/data-ingestion',
  GAP_ANALYSIS: '/gap-analysis',
  QUESTIONNAIRES: '/questionnaires',
  TRANSFORMATION_PLANS: '/transformation-plans',
  FUTURE_STATE: '/future-state',
  PROFILE: '/profile'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  SENIOR_CONSULTANT: 'senior_consultant',
  JUNIOR_ANALYST: 'junior_analyst',
  CLIENT: 'client'
} as const;

export const SUBSCRIPTION_TIERS = {
  FREEMIUM: 'Freemium',
  PROFESSIONAL: 'Professional',
  ENTERPRISE: 'Enterprise'
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    SESSION_EXPIRED: 'Your session has expired',
    UNAUTHORIZED: 'You are not authorized to perform this action'
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_MISMATCH: 'Passwords do not match',
    INVALID_PHONE: 'Please enter a valid phone number'
  }
};