export type UserRole = 'User' | 'Mediator' | 'Lawyer' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  location?: string;
  avatar?: string;
  rating?: number;
  experience?: string;
  isVerified?: boolean;
}

export interface Case {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'Family' | 'Marriage' | 'Land' | 'Business' | 'Other';
  location: string;
  status: 'Pending' | 'Active' | 'Resolved' | 'Rejected';
  mediatorId?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  caseId: string;
  senderId: string;
  text: string;
  timestamp: string;
}