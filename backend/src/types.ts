export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export enum IdeaStatus {
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum ServiceTier {
  VALIDATION = 'VALIDATION',
  BLUEPRINT = 'BLUEPRINT',
  LAUNCH_READY = 'LAUNCH_READY',
  ENTERPRISE = 'ENTERPRISE'
}

export enum DeliverableType {
  MARKET_RESEARCH = 'MARKET_RESEARCH',
  BUSINESS_PLAN = 'BUSINESS_PLAN',
  BRAND_IDENTITY = 'BRAND_IDENTITY',
  FINANCIAL_MODEL = 'FINANCIAL_MODEL',
  TEAM_RECOMMENDATIONS = 'TEAM_RECOMMENDATIONS',
  LEGAL_STRUCTURE = 'LEGAL_STRUCTURE',
  MARKETING_STRATEGY = 'MARKETING_STRATEGY',
  TECHNICAL_REQUIREMENTS = 'TECHNICAL_REQUIREMENTS'
}

export enum DeliverableStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum MessageSender {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  industry: string;
  targetAudience?: string;
  status: IdeaStatus;
  tier: ServiceTier;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  deliverables?: Deliverable[];
  payments?: Payment[];
  files?: IdeaFile[];
  messages?: Message[];
}

export interface Deliverable {
  id: string;
  name: string;
  description?: string;
  type: DeliverableType;
  fileUrl?: string;
  content?: string;
  status: DeliverableStatus;
  ideaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripePaymentId?: string;
  userId: string;
  ideaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IdeaFile {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  ideaId: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: MessageSender;
  ideaId: string;
  createdAt: Date;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  imageUrl?: string;
  tier: ServiceTier;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceTierInfo {
  tier: ServiceTier;
  name: string;
  price: number;
  description: string;
  features: string[];
  deliverables: DeliverableType[];
  timeline: string;
}

export const SERVICE_TIERS: ServiceTierInfo[] = [
  {
    tier: ServiceTier.VALIDATION,
    name: 'Idea Validation',
    price: 499,
    description: 'Quick market assessment to validate your business idea',
    features: [
      'Market size analysis',
      'Competitor research',
      'Target audience identification',
      'Feasibility assessment',
      '2-week turnaround'
    ],
    deliverables: [DeliverableType.MARKET_RESEARCH],
    timeline: '2 weeks'
  },
  {
    tier: ServiceTier.BLUEPRINT,
    name: 'Business Blueprint',
    price: 2999,
    description: 'Complete business foundation with detailed strategy',
    features: [
      'Everything in Validation',
      'Comprehensive business plan',
      'Financial projections',
      'Go-to-market strategy',
      'Brand identity basics',
      '4-6 week turnaround'
    ],
    deliverables: [
      DeliverableType.MARKET_RESEARCH,
      DeliverableType.BUSINESS_PLAN,
      DeliverableType.FINANCIAL_MODEL,
      DeliverableType.MARKETING_STRATEGY,
      DeliverableType.BRAND_IDENTITY
    ],
    timeline: '4-6 weeks'
  },
  {
    tier: ServiceTier.LAUNCH_READY,
    name: 'Launch-Ready Package',
    price: 9999,
    description: 'Everything you need to launch your business',
    features: [
      'Everything in Blueprint',
      'Complete brand identity',
      'Legal structure setup',
      'Team hiring plan',
      'Technical requirements',
      'Investor pitch deck',
      '8-10 week turnaround'
    ],
    deliverables: [
      DeliverableType.MARKET_RESEARCH,
      DeliverableType.BUSINESS_PLAN,
      DeliverableType.FINANCIAL_MODEL,
      DeliverableType.MARKETING_STRATEGY,
      DeliverableType.BRAND_IDENTITY,
      DeliverableType.LEGAL_STRUCTURE,
      DeliverableType.TEAM_RECOMMENDATIONS,
      DeliverableType.TECHNICAL_REQUIREMENTS
    ],
    timeline: '8-10 weeks'
  },
  {
    tier: ServiceTier.ENTERPRISE,
    name: 'Enterprise Innovation',
    price: 25000,
    description: 'Custom enterprise solutions and innovation programs',
    features: [
      'Custom scope and timeline',
      'Dedicated team assignment',
      'Multiple idea development',
      'Innovation process setup',
      'Training and workshops',
      'Ongoing support'
    ],
    deliverables: [
      DeliverableType.MARKET_RESEARCH,
      DeliverableType.BUSINESS_PLAN,
      DeliverableType.FINANCIAL_MODEL,
      DeliverableType.MARKETING_STRATEGY,
      DeliverableType.BRAND_IDENTITY,
      DeliverableType.LEGAL_STRUCTURE,
      DeliverableType.TEAM_RECOMMENDATIONS,
      DeliverableType.TECHNICAL_REQUIREMENTS
    ],
    timeline: 'Custom'
  }
];

export interface IdeaSubmissionData {
  title: string;
  description: string;
  industry: string;
  targetAudience: string;
  tier: ServiceTier;
  files?: File[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}