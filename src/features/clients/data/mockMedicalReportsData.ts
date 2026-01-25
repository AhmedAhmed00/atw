/**
 * Mock Medical Reports Data
 * Sample data for post-trip medical reports
 */

export interface VitalSign {
  label: string
  value: string | number
  unit: string
  isAbnormal?: boolean
}

export interface MedicalReport {
  id: string
  tripId: string
  tripName: string
  date: string
  doctorName: string
  vitals: {
    bloodPressure: VitalSign
    heartRate: VitalSign
    oxygenLevel: VitalSign
    temperature: VitalSign
    respiratoryRate: VitalSign
    glucose: VitalSign
    painLevel: VitalSign
  }
  medications: Array<{
    name: string
    dosage: string
  }>
  procedures: string[]
  tripOutcome: {
    destination: string
    arrivalCondition: string
    incidents: string | null
  }
  paramedicNotes: string
}

// Generate mock medical reports
export function generateMedicalReports(patientId: string, count: number = 5): MedicalReport[] {
  const destinations = [
    'Cairo University Hospital',
    'Alexandria Medical Center',
    'Mansoura General Hospital',
    'Aswan Medical Complex',
    'Port Said General Hospital',
  ]

  const doctors = [
    'Dr. Ahmed Hassan',
    'Dr. Fatima Ali',
    'Dr. Mohamed Ibrahim',
    'Dr. Sara Youssef',
    'Dr. Omar Mahmoud',
  ]

  const medications = [
    { name: 'Aspirin', dosage: '75mg' },
    { name: 'Metformin', dosage: '500mg' },
    { name: 'Insulin', dosage: '10 units' },
    { name: 'Paracetamol', dosage: '500mg' },
    { name: 'Morphine', dosage: '5mg' },
    { name: 'Oxygen', dosage: '2L/min' },
  ]

  const procedures = [
    'Oxygen support',
    'Blood pressure monitoring',
    'ECG monitoring',
    'IV fluid administration',
    'Wound dressing',
    'Medication administration',
  ]

  const arrivalConditions = [
    'Stable',
    'Stable - Improved',
    'Critical - Stable',
    'Stable - Monitored',
  ]

  const reports: MedicalReport[] = []

  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (i * 7 + Math.floor(Math.random() * 3)))
    const hours = Math.floor(Math.random() * 12) + 8
    const minutes = Math.floor(Math.random() * 4) * 15
    date.setHours(hours, minutes, 0)

    const bpSystolic = Math.floor(Math.random() * 40) + 110
    const bpDiastolic = Math.floor(Math.random() * 20) + 70
    const hr = Math.floor(Math.random() * 40) + 60
    const o2 = Math.floor(Math.random() * 10) + 90
    const temp = (Math.random() * 2 + 36.5).toFixed(1)
    const respRate = Math.floor(Math.random() * 10) + 12
    const glucose = Math.floor(Math.random() * 60) + 80
    const painLevel = Math.floor(Math.random() * 11)

    reports.push({
      id: `report-${patientId}-${i + 1}`,
      tripId: `TRIP-${patientId}-${String(i + 1).padStart(4, '0')}`,
      tripName: `Trip to ${destinations[Math.floor(Math.random() * destinations.length)]}`,
      date: date.toISOString(),
      doctorName: doctors[Math.floor(Math.random() * doctors.length)],
      vitals: {
        bloodPressure: {
          label: 'Blood Pressure',
          value: `${bpSystolic}/${bpDiastolic}`,
          unit: 'mmHg',
          isAbnormal: bpSystolic > 140 || bpDiastolic > 90,
        },
        heartRate: {
          label: 'Heart Rate',
          value: hr,
          unit: 'bpm',
          isAbnormal: hr < 60 || hr > 100,
        },
        oxygenLevel: {
          label: 'O₂ Saturation',
          value: o2,
          unit: '%',
          isAbnormal: o2 < 95,
        },
        temperature: {
          label: 'Temperature',
          value: temp,
          unit: '°C',
          isAbnormal: parseFloat(temp) > 37.5 || parseFloat(temp) < 36.0,
        },
        respiratoryRate: {
          label: 'Respiratory Rate',
          value: respRate,
          unit: '/min',
          isAbnormal: respRate < 12 || respRate > 20,
        },
        glucose: {
          label: 'Glucose',
          value: glucose,
          unit: 'mg/dL',
          isAbnormal: glucose < 70 || glucose > 140,
        },
        painLevel: {
          label: 'Pain Level',
          value: painLevel,
          unit: '/10',
          isAbnormal: painLevel > 7,
        },
      },
      medications: medications
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 2)
        .map((med) => ({ ...med })),
      procedures: procedures
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 2),
      tripOutcome: {
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        arrivalCondition: arrivalConditions[Math.floor(Math.random() * arrivalConditions.length)],
        incidents: Math.random() > 0.7 ? 'Minor delay due to traffic' : null,
      },
      paramedicNotes: `Patient was responsive throughout the trip. Vitals remained stable. ${Math.random() > 0.5 ? 'Patient reported mild discomfort but was manageable.' : 'No complaints during transport.'} Arrived at destination in good condition.`,
    })
  }

  return reports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Calculate summary stats
export function calculateReportStats(reports: MedicalReport[]) {
  if (reports.length === 0) {
    return {
      totalReports: 0,
      avgO2Level: 0,
      avgHeartRate: 0,
    }
  }

  const totalO2 = reports.reduce((sum, report) => {
    const o2Value = typeof report.vitals.oxygenLevel.value === 'number'
      ? report.vitals.oxygenLevel.value
      : parseFloat(report.vitals.oxygenLevel.value.toString())
    return sum + o2Value
  }, 0)

  const totalHR = reports.reduce((sum, report) => {
    const hrValue = typeof report.vitals.heartRate.value === 'number'
      ? report.vitals.heartRate.value
      : parseFloat(report.vitals.heartRate.value.toString())
    return sum + hrValue
  }, 0)

  return {
    totalReports: reports.length,
    avgO2Level: Math.round(totalO2 / reports.length),
    avgHeartRate: Math.round(totalHR / reports.length),
  }
}

