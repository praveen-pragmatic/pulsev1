// User Types
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'senior_consultant' | 'junior_analyst' | 'client' | 'partner';
  avatar: string;
  permissions: string[];
  clientId?: string;
  companyName?: string;
  metrics?: ClientMetrics;
  companyDetails?: PartnerDetails;
}

export interface PartnerDetails {
  location: string;
  expertise: string[];
  teamSize: string;
  established: string;
}

export type UserRole = 'admin' | 'senior_consultant' | 'junior_consultant' | 'client' | 'partner';

// Client Types
export interface ClientMetrics {
  diagnosticProgress: number;
  criticalGaps: number;
  completedActions: number;
  pendingActions: number;
  tier: SubscriptionTier;
  mrr: string;
  category?: string;
}

export type SubscriptionTier = 'Freemium' | 'Professional' | 'Enterprise';

// Activity Types
export interface Activity {
  type: 'document' | 'analysis' | 'response';
  icon: string;
  iconBg: string;
  message: string;
  timestamp: string;
}

// Store Types
export interface StoreState {
  selectedClient: string | null;
  modals: ModalState;
  demoMode: boolean;
  toggleDemoMode: () => void;
}

export interface DiagnosticData {
  id: number;
  client: string;
  category: string;
  status: 'Completed' | 'In Progress' | 'Planning';
  completion: number;
  date: string;
  tier: SubscriptionTier;
}

export interface ModalState {
  ekyc: boolean;
  partner: boolean;
  settings: boolean;
  profile: boolean;
}

// S3 Types
export interface S3Config {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  bucket: string;
}

export interface FileUpload {
  id: number;
  name: string;
  type: string;
  size: string;
  status: 'complete' | 'processing' | 'error';
  timestamp: string;
  s3Key?: string;
}

export interface DataSource {
  name: string;
  icon: string;
  description: string;
}

export interface DataSourceCategory {
  category: string;
  sources: DataSource[];
}

export interface KnowledgeCategory {
  preview: string[];
  all: string[];
}

export interface KnowledgeFolder {
  name: string;
  icon: JSX.Element;
  documents?: string[];
  categories?: Record<string, KnowledgeCategory>;
}

export interface ConnectedSource {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  lastSync: string;
}