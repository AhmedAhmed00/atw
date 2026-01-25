export interface Patient {
  id: string
  name: string
  nationalId: string
  condition: 'Dialysis' | 'Cancer Treatment' | 'Physical Therapy' | 'Other'
  region: string
  trips: number
  balance: number
  status: 'Good Standing' | 'Active' | 'Suspended' | 'Outstanding Debt'
}

export interface PatientStats {
  totalPatients: number
  totalTrips: number
  totalRevenue: number
  outstandingDebts: number
}

export interface MedicalConditionDistribution {
  name: string
  value: number
  color: string
}

export interface PatientStatusOverview {
  name: string
  value: number
  color: string
}

export interface TopActivePatient {
  name: string
  trips: number
  revenue: number
}

export const patientStats: PatientStats = {
  totalPatients: 1847,
  totalTrips: 5234,
  totalRevenue: 1875000,
  outstandingDebts: 89000,
}

export const medicalConditionDistribution: MedicalConditionDistribution[] = [
  { name: 'Dialysis', value: 756, color: '#09B0B6' },
  { name: 'Cancer Treatment', value: 523, color: '#05647A' },
  { name: 'Physical Therapy', value: 412, color: '#266BAC' },
  { name: 'Other', value: 156, color: '#3DCCD0' },
]

export const patientStatusOverview: PatientStatusOverview[] = [
  { name: 'Good Standing', value: 1456, color: '#10b981' },
  { name: 'Active', value: 287, color: '#3b82f6' },
  { name: 'Suspended', value: 78, color: '#f59e0b' },
  { name: 'Outstanding Debt', value: 26, color: '#ef4444' },
]

export const topActivePatients: TopActivePatient[] = [
  { name: 'Ahmed Mohamed Hassan', trips: 142, revenue: 28500 },
  { name: 'Fatima Ali Ibrahim', trips: 128, revenue: 25600 },
  { name: 'Mohamed Salah El-Din', trips: 115, revenue: 23000 },
  { name: 'Sara Mahmoud Abdel-Rahman', trips: 103, revenue: 20600 },
  { name: 'Omar Youssef Ali', trips: 98, revenue: 19600 },
]

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Ahmed Mohamed Hassan',
    nationalId: '29005123456789',
    condition: 'Dialysis',
    region: 'Cairo',
    trips: 142,
    balance: 28500,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Fatima Ali Ibrahim',
    nationalId: '29506234567890',
    condition: 'Cancer Treatment',
    region: 'Alexandria',
    trips: 128,
    balance: 25600,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Mohamed Salah El-Din',
    nationalId: '28007345678901',
    condition: 'Dialysis',
    region: 'Cairo',
    trips: 115,
    balance: 23000,
    status: 'Good Standing',
  },
  {
    id: '4',
    name: 'Sara Mahmoud Abdel-Rahman',
    nationalId: '29708456789012',
    condition: 'Physical Therapy',
    region: 'Giza',
    trips: 103,
    balance: 20600,
    status: 'Active',
  },
  {
    id: '5',
    name: 'Omar Youssef Ali',
    nationalId: '28909567890123',
    condition: 'Dialysis',
    region: 'Cairo',
    trips: 98,
    balance: 19600,
    status: 'Good Standing',
  },
  {
    id: '6',
    name: 'Nour Hassan Mohamed',
    nationalId: '29810678901234',
    condition: 'Cancer Treatment',
    region: 'Alexandria',
    trips: 87,
    balance: 17400,
    status: 'Active',
  },
  {
    id: '7',
    name: 'Youssef Ahmed Farouk',
    nationalId: '28111789012345',
    condition: 'Physical Therapy',
    region: 'Mansoura',
    trips: 76,
    balance: 15200,
    status: 'Good Standing',
  },
  {
    id: '8',
    name: 'Mariam Samir Ibrahim',
    nationalId: '29612890123456',
    condition: 'Dialysis',
    region: 'Cairo',
    trips: 94,
    balance: 18800,
    status: 'Outstanding Debt',
  },
  {
    id: '9',
    name: 'Khaled Mohamed Ali',
    nationalId: '28213901234567',
    condition: 'Other',
    region: 'Aswan',
    trips: 65,
    balance: 13000,
    status: 'Good Standing',
  },
  {
    id: '10',
    name: 'Layla Abdel-Rahman Hassan',
    nationalId: '29514012345678',
    condition: 'Cancer Treatment',
    region: 'Cairo',
    trips: 82,
    balance: 16400,
    status: 'Active',
  },
  {
    id: '11',
    name: 'Tamer Youssef Mohamed',
    nationalId: '28315123456789',
    condition: 'Dialysis',
    region: 'Port Said',
    trips: 71,
    balance: 14200,
    status: 'Good Standing',
  },
  {
    id: '12',
    name: 'Dina Mahmoud Ali',
    nationalId: '29416234567890',
    condition: 'Physical Therapy',
    region: 'Cairo',
    trips: 59,
    balance: 11800,
    status: 'Suspended',
  },
  {
    id: '13',
    name: 'Hassan Mohamed Farouk',
    nationalId: '28417345678901',
    condition: 'Dialysis',
    region: 'Luxor',
    trips: 88,
    balance: 17600,
    status: 'Active',
  },
  {
    id: '14',
    name: 'Rania Salah Ibrahim',
    nationalId: '29318456789012',
    condition: 'Cancer Treatment',
    region: 'Cairo',
    trips: 73,
    balance: 14600,
    status: 'Good Standing',
  },
  {
    id: '15',
    name: 'Amr Youssef Hassan',
    nationalId: '28519567890123',
    condition: 'Physical Therapy',
    region: 'Alexandria',
    trips: 67,
    balance: 13400,
    status: 'Active',
  },
  {
    id: '16',
    name: 'Heba Ali Mohamed',
    nationalId: '29220678901234',
    condition: 'Dialysis',
    region: 'Giza',
    trips: 81,
    balance: 16200,
    status: 'Good Standing',
  },
  {
    id: '17',
    name: 'Waleed Mahmoud Abdel-Rahman',
    nationalId: '28621789012345',
    condition: 'Other',
    region: 'Cairo',
    trips: 54,
    balance: 10800,
    status: 'Active',
  },
  {
    id: '18',
    name: 'Nada Samir Ibrahim',
    nationalId: '29122890123456',
    condition: 'Cancer Treatment',
    region: 'Mansoura',
    trips: 69,
    balance: 13800,
    status: 'Good Standing',
  },
  {
    id: '19',
    name: 'Karim Youssef Ali',
    nationalId: '28723901234567',
    condition: 'Dialysis',
    region: 'Cairo',
    trips: 77,
    balance: 15400,
    status: 'Active',
  },
  {
    id: '20',
    name: 'Salma Hassan Mohamed',
    nationalId: '29024012345678',
    condition: 'Physical Therapy',
    region: 'Aswan',
    trips: 63,
    balance: 12600,
    status: 'Good Standing',
  },
  {
    id: '21',
    name: 'Mahmoud Farouk Ali',
    nationalId: '28825123456789',
    condition: 'Dialysis',
    region: 'Cairo',
    trips: 85,
    balance: 17000,
    status: 'Outstanding Debt',
  },
  {
    id: '22',
    name: 'Reem Ibrahim Hassan',
    nationalId: '28926234567890',
    condition: 'Cancer Treatment',
    region: 'Alexandria',
    trips: 70,
    balance: 14000,
    status: 'Active',
  },
  {
    id: '23',
    name: 'Bassem Mohamed Youssef',
    nationalId: '28027345678901',
    condition: 'Other',
    region: 'Port Said',
    trips: 48,
    balance: 9600,
    status: 'Good Standing',
  },
  {
    id: '24',
    name: 'Noha Ali Mahmoud',
    nationalId: '29128456789012',
    condition: 'Dialysis',
    region: 'Cairo',
    trips: 79,
    balance: 15800,
    status: 'Active',
  },
  {
    id: '25',
    name: 'Sherif Salah Ibrahim',
    nationalId: '28229567890123',
    condition: 'Physical Therapy',
    region: 'Luxor',
    trips: 61,
    balance: 12200,
    status: 'Good Standing',
  },
  {
    id: '26',
    name: 'Mona Hassan Abdel-Rahman',
    nationalId: '29320678901234',
    condition: 'Cancer Treatment',
    region: 'Cairo',
    trips: 68,
    balance: 13600,
    status: 'Suspended',
  },
  {
    id: '27',
    name: 'Adel Youssef Mohamed',
    nationalId: '28421789012345',
    condition: 'Dialysis',
    region: 'Giza',
    trips: 75,
    balance: 15000,
    status: 'Active',
  },
  {
    id: '28',
    name: 'Sanaa Ali Farouk',
    nationalId: '29522890123456',
    condition: 'Other',
    region: 'Cairo',
    trips: 52,
    balance: 10400,
    status: 'Good Standing',
  },
  {
    id: '29',
    name: 'Ibrahim Mahmoud Hassan',
    nationalId: '28623901234567',
    condition: 'Dialysis',
    region: 'Mansoura',
    trips: 83,
    balance: 16600,
    status: 'Active',
  },
  {
    id: '30',
    name: 'Samira Youssef Ibrahim',
    nationalId: '29724012345678',
    condition: 'Cancer Treatment',
    region: 'Cairo',
    trips: 66,
    balance: 13200,
    status: 'Good Standing',
  },
]

