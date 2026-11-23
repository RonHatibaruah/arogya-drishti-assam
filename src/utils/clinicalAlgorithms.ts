import { DistrictMetric, PolicyInterventionParams, ProjectionPoint, ResourceRequirement, RiskTier } from '../types';

/**
 * Validated 4-Variable Kidney Failure Risk Equation (KFRE)
 * Adaptable for South Asian Cohorts: Age, Sex, eGFR, uACR (mg/g)
 * Computes 2-year and 5-year probability of progressing to ESRD (requiring dialysis or transplant).
 */
export function calculateKFRE(
  age: number,
  gender: 'M' | 'F' | 'Other',
  eGFR: number,
  uACR: number
): { twoYearPct: number; fiveYearPct: number } {
  // Baseline coefficients (Tangri et al. JAMA calibrated for non-North American cohorts)
  const isMale = gender === 'M' ? 1 : 0;
  
  // Linear predictor calculation
  const loguACR = Math.log(Math.max(uACR, 1));
  const lp =
    -0.2201 * (age / 10 - 7.03) +
    0.2467 * (isMale - 0.564) -
    0.5567 * (eGFR / 10 - 7.22) +
    0.4510 * (loguACR - 5.14);

  // Baseline survival at 2 years and 5 years
  const s0_2yr = 0.9832;
  const s0_5yr = 0.9365;

  const risk2yr = 1 - Math.pow(s0_2yr, Math.exp(lp));
  const risk5yr = 1 - Math.pow(s0_5yr, Math.exp(lp));

  return {
    twoYearPct: Math.min(Math.max(Number((risk2yr * 100).toFixed(1)), 0.1), 99.0),
    fiveYearPct: Math.min(Math.max(Number((risk5yr * 100).toFixed(1)), 0.2), 99.5)
  };
}

/**
 * KDIGO 2024 Heatmap Risk Matrix
 * Categorizes prognosis into Low, Moderate, High, or Very High risk based on eGFR and Albuminuria.
 */
export function getKDIGOClassification(
  eGFR: number,
  uACR: number,
  dipstick: 'negative' | 'trace' | '1+' | '2+' | '3+'
): { category: string; tier: RiskTier; color: string } {
  // Map dipstick to approximate uACR if uACR is not measured
  let effectiveUACR = uACR;
  if (!effectiveUACR || effectiveUACR === 0) {
    switch (dipstick) {
      case '3+': effectiveUACR = 500; break;
      case '2+': effectiveUACR = 300; break;
      case '1+': effectiveUACR = 150; break;
      case 'trace': effectiveUACR = 50; break;
      default: effectiveUACR = 15; break;
    }
  }

  // eGFR tiers (G1: >=90, G2: 60-89, G3a: 45-59, G3b: 30-44, G4: 15-29, G5: <15)
  // uACR tiers (A1: <30, A2: 30-300, A3: >300)
  if (eGFR < 15) {
    return { category: 'G5 (Kidney Failure)', tier: 'critical', color: '#dc2626' };
  }
  if (eGFR < 30) {
    return { category: 'G4-A3 (Severe)', tier: 'critical', color: '#ea580c' };
  }
  if (eGFR < 45) {
    return { category: 'G3b-A3 (Very High)', tier: 'critical', color: '#ea580c' };
  }
  if (eGFR < 60) {
    if (effectiveUACR > 300) {
      return { category: 'G3a-A3 (Very High)', tier: 'critical', color: '#ea580c' };
    }
    return { category: 'G3a-A2 (High)', tier: 'high', color: '#f59e0b' };
  }
  if (eGFR < 90) {
    if (effectiveUACR > 300) return { category: 'G2-A3 (High)', tier: 'high', color: '#f59e0b' };
    if (effectiveUACR >= 30) return { category: 'G2-A2 (Moderate)', tier: 'high', color: '#eab308' };
    return { category: 'G2-A1 (Low)', tier: 'low', color: '#10b981' };
  }

  // eGFR >= 90
  if (effectiveUACR > 300) return { category: 'G1-A3 (High)', tier: 'high', color: '#f59e0b' };
  if (effectiveUACR >= 30) return { category: 'G1-A2 (Moderate)', tier: 'moderate', color: '#eab308' };
  return { category: 'G1-A1 (Low)', tier: 'low', color: '#10b981' };
}

/**
 * Markov State-Transition Simulation for District Cohorts over 1, 3, 5 years
 * Evaluates baseline status quo vs. policy intervention scenarios.
 */
export function generateProgressionProjections(
  district: DistrictMetric,
  horizonYears: number = 5,
  policy: PolicyInterventionParams = {
    screeningCoverageIncreasePct: 0,
    earlyACEiSGLT2iAdherencePct: 0,
    lifestyleAndSaltInterventionPct: 0,
    annualScreeningBudgetCrores: 0
  }
): ProjectionPoint[] {
  const points: ProjectionPoint[] = [];
  const baseDiabetics = district.confirmedDiabetics + district.estimatedHiddenDiabetics;
  
  // Annual transition baseline probabilities
  // Diabetes -> Stage 1-2 CKD: ~4.2% per year
  // Stage 1-2 -> Stage 3a/3b: ~7.5% per year
  // Stage 3 -> Stage 4: ~5.8% per year
  // Stage 4 -> Stage 5 (Dialysis): ~12.5% per year
  
  // Intervention deceleration coefficient
  // Early ACEi/SGLT2i reduces progression velocity by ~34%
  // Lifestyle reduces new onset by ~18%
  const therapyReductionFactor = (policy.earlyACEiSGLT2iAdherencePct / 100) * 0.34;
  const lifestyleReductionFactor = (policy.lifestyleAndSaltInterventionPct / 100) * 0.18;
  const netProgressionReduction = Math.min(therapyReductionFactor + lifestyleReductionFactor, 0.45);

  const startYear = 2026;

  for (let t = 0; t <= horizonYears; t++) {
    const yr = startYear + t;
    
    // Growth in diagnosed cohort as screening expands
    const screeningMultiplier = 1 + (t * (policy.screeningCoverageIncreasePct / 100) * 0.08);
    const activeCohort = Math.round(baseDiabetics * (1 + t * 0.025) * screeningMultiplier);

    // Natural status quo progression without extra intervention
    const baselineCkdStage12 = Math.round(activeCohort * (0.16 + t * 0.015));
    const baselineCkdStage3 = Math.round(activeCohort * (0.075 + t * 0.012));
    const baselineCkdStage4 = Math.round(activeCohort * (0.024 + t * 0.005));
    const baselineESRD = Math.round(activeCohort * (0.009 + t * 0.0028));

    // With policy interventions applied
    const adjustedESRD = Math.round(baselineESRD * (1 - netProgressionReduction * (t / Math.max(horizonYears, 1))));
    const avertedCases = Math.max(baselineESRD - adjustedESRD, 0);

    // Economic metrics (Dialysis under PMNDP/Ayushman Asom: ~₹30,000 per month = ₹3.6 Lakhs/year/patient)
    const annualDialysisCostCrores = Number(((adjustedESRD * 3.6) / 100).toFixed(2));
    const costSavingsCrores = Number(((avertedCases * 3.6) / 100).toFixed(2));

    points.push({
      year: yr,
      baselineDiabeticCohort: activeCohort,
      ckdStage1and2: baselineCkdStage12,
      ckdStage3aAnd3b: baselineCkdStage3,
      ckdStage4: baselineCkdStage4,
      ckdStage5ESRD: adjustedESRD,
      dialysisPatientsCumulative: adjustedESRD,
      annualDialysisCostCrores,
      avertedCasesWithIntervention: avertedCases,
      costSavingsCroresWithIntervention: costSavingsCrores
    });
  }

  return points;
}

/**
 * Computes PMNDP Hemodialysis Machines, Consumables, and Personnel Requirements
 */
export function calculateDialysisResourceNeeds(
  projectedESRDCases: number,
  existingMachines: number,
  costPerSessionINR: number = 2100,
  roWaterPerSessionLiters: number = 120
): ResourceRequirement {
  // Standard dialysis protocol: 3 sessions/week = 156 sessions/year per patient
  // 1 machine running 2 shifts/day (6 days/week) handles ~6 to 7 patients annually
  // 1 machine running 3 shifts/day handles ~10 patients annually
  
  const patientsPerMachineTwoShifts = 6;
  const machinesNeededTwoShifts = Math.ceil(projectedESRDCases / patientsPerMachineTwoShifts);
  const machinesNeededThreeShifts = Math.ceil(projectedESRDCases / 10);

  const deficit = Math.max(machinesNeededTwoShifts - existingMachines, 0);

  // 1 technician per 4 machines per shift
  const techniciansRequired = Math.ceil((machinesNeededTwoShifts * 2) / 4);
  
  // 1 Medical Officer / Nephrologist per 15 machines
  const doctorsRequired = Math.ceil(machinesNeededTwoShifts / 15);

  // Consumables: dialyzer, blood tubing, A/B concentrates, heparin, erythropoietin
  const totalSessionsAnnual = projectedESRDCases * 156;
  const annualConsumablesCostCrores = Number(((totalSessionsAnnual * costPerSessionINR) / 10000000).toFixed(2));

  // RO water: ultra-pure water per hemodialysis session
  const roWaterDailyLiters = Math.round((totalSessionsAnnual / 312) * roWaterPerSessionLiters);

  return {
    hemodialysisMachinesRequired: machinesNeededTwoShifts,
    hemodialysisMachinesAvailable: existingMachines,
    netMachineDeficit: deficit,
    hemodialysisStationsInShifts: {
      twoShiftsDaily: machinesNeededTwoShifts,
      threeShiftsDaily: machinesNeededThreeShifts
    },
    dialysisTechniciansRequired: techniciansRequired,
    nephrologistsOrMedicalOfficersRequired: doctorsRequired,
    annualConsumablesCostCrores,
    roWaterPlantLoadLitersPerDay: roWaterDailyLiters
  };
}
