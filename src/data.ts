import { User, Case } from './types';

export const MOCK_MEDIATORS: User[] = [
  {
    id: 'm1',
    name: 'Abebe Kebede',
    email: 'abebe@example.com',
    phone: '+251911123456',
    role: 'Mediator',
    location: 'Addis Ababa',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/mediator-1-0ae64a19-1774377636621.webp',
    rating: 4.8,
    experience: '15 years',
    isVerified: true
  },
  {
    id: 'm2',
    name: 'Selamawit Tadesse',
    email: 'selam@example.com',
    phone: '+251922234567',
    role: 'Lawyer',
    location: 'Bahar Dar',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/mediator-2-b48287e0-1774377648156.webp',
    rating: 4.9,
    experience: '8 years',
    isVerified: true
  },
  {
    id: 'm3',
    name: 'Gashe Solomon',
    email: 'solomon@example.com',
    phone: '+251933345678',
    role: 'Mediator',
    location: 'Adama',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/0edc293f-a0fb-408a-8e48-d357bbdabc58/mediator-3-802a2b99-1774377645211.webp',
    rating: 5.0,
    experience: '30 years',
    isVerified: true
  }
];

export const MOCK_CASES: Case[] = [
  {
    id: 'c1',
    userId: 'u1',
    title: 'Land Boundary Dispute',
    description: 'Agreement on fence location between neighbors.',
    category: 'Land',
    location: 'Addis Ababa',
    status: 'Active',
    mediatorId: 'm3',
    createdAt: '2023-10-01'
  }
];