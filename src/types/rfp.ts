export interface RfpData {
  id: number;
  rfpId: string;
  title: string;
  content: string;
  requirements: Requirement[];
  clientName: string;
  clientId: string;
  projectType: string;
  status: RfpStatus;
  createdAt: string;
  assignedPartners?: string[];
  crmContent?: string;
  phases?: Phase[];
  submittedBy: number;
  submitterRole: string;
  visibleToAdmin: boolean;
  bidDetails?: BidDetails;
  stageHistory?: StageHistory[];
  version: number;
  lastModified: string;
  reviewChecklist?: {
    completeness: boolean;
    clarity: boolean;
    feasibility: boolean;
    compliance: boolean;
    budget: boolean;
    timeline: boolean;
  };
  reviewNotes?: string;
  evaluationMatrix?: {
    technicalFit: number;
    costEffectiveness: number;
    timeline: number;
    riskProfile: number;
    vendorCapability: number;
  };
}

export type RfpStatus = 
  | 'new'
  | 'pending_review'
  | 'enrichment'
  | 'prototype'
  | 'evaluation'
  | 'approved'
  | 'rejected';

export interface Requirement {
  id: string;
  requirementId: string;
  title: string;
  area: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  recommendation: string;
}

export interface Phase {
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
  objectives: string[];
  deliverables: string[];
}

export interface BidDetails {
  deadline: string;
  requirements: string;
  evaluationCriteria: string;
  createdAt: string;
  status: 'open' | 'closed';
}

export interface StageHistory {
  from: RfpStatus;
  to: RfpStatus;
  timestamp: string;
  note: string;
}