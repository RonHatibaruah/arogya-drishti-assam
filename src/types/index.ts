export type RiskTier = 'critical' | 'high' | 'moderate' | 'low';

export interface DistrictMetric {
  id: string;
  name: string;
  zone: 'Upper Assam' | 'Lower Assam' | 'Central Assam' | 'Barak Valley' | 'North Assam' | 'Hills';
  populationTotal: number;
  adultPopulationEligible: number; // 30+ years
  screenedPopulation: number;
  screeningCoveragePct: number;
  confirmedDiabetics: number;
  confirmedHypertensives: number;
  estimatedHiddenDiabetics: number;
  projectedCKDStage3to5: number;
  existingDialysisCenters: number;
  existingDialysisMachines: number;
  dialysisDemandAnnualCases: number;
  dialysisMachineShortfall: number;
  estimatedAnnualSubsidiesINR: number; // in Lakhs
  riskClassification: RiskTier;
  topContributingFactors: string[];
}

export interface PatientRecord {
  id: string;
  abhaId: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  district: string;
  block: string;
  facility: string; // Ayushman Arogya Mandir / PHC
  systolicBP: number;
  diastolicBP: number;
  bloodSugarRandom: number;
  bloodSugarFasting?: number;
  hba1c?: number;
  serumCreatinine?: number;
  urineAlbuminDipstick: 'negative' | 'trace' | '1+' | '2+' | '3+';
  uACR?: number; // mg/g
  eGFR?: number; // mL/min/1.73m2
  kfreScore2YrPct: number;
  kfreScore5YrPct: number;
  kdigoCategory: 'G1-A1 (Low)' | 'G2-A2 (Moderate)' | 'G3a-A2 (High)' | 'G3b-A3 (Very High)' | 'G4-A3 (Severe)' | 'G5 (Kidney Failure)';
  riskTier: RiskTier;
  recommendedAction: string;
  referralFacility: string;
  status: 'Pending Review' | 'Alert Sent' | 'Referred' | 'Follow-up Scheduled';
  lastScreeningDate: string;
}

export interface ProjectionPoint {
  year: number;
  baselineDiabeticCohort: number;
  ckdStage1and2: number;
  ckdStage3aAnd3b: number;
  ckdStage4: number;
  ckdStage5ESRD: number;
  dialysisPatientsCumulative: number;
  annualDialysisCostCrores: number;
  avertedCasesWithIntervention: number;
  costSavingsCroresWithIntervention: number;
}

export interface ResourceRequirement {
  hemodialysisMachinesRequired: number;
  hemodialysisMachinesAvailable: number;
  netMachineDeficit: number;
  hemodialysisStationsInShifts: {
    twoShiftsDaily: number;
    threeShiftsDaily: number;
  };
  dialysisTechniciansRequired: number;
  nephrologistsOrMedicalOfficersRequired: number;
  annualConsumablesCostCrores: number;
  roWaterPlantLoadLitersPerDay: number;
}

export interface PolicyInterventionParams {
  screeningCoverageIncreasePct: number; // 0 to 50%
  earlyACEiSGLT2iAdherencePct: number; // 0 to 80%
  lifestyleAndSaltInterventionPct: number; // 0 to 60%
  annualScreeningBudgetCrores: number;
}
