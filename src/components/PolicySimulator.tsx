import React from 'react';
import { Sliders, Sparkles, DollarSign, HeartHandshake, ShieldCheck, RefreshCw } from 'lucide-react';
import { DistrictMetric, PolicyInterventionParams } from '../types';
import { generateProgressionProjections } from '../utils/clinicalAlgorithms';

interface PolicySimulatorProps {
  selectedDistrict: DistrictMetric;
  policyParams: PolicyInterventionParams;
  setPolicyParams: React.Dispatch<React.SetStateAction<PolicyInterventionParams>>;
}

export const PolicySimulator: React.FC<PolicySimulatorProps> = ({
  selectedDistrict,
  policyParams,
  setPolicyParams
}) => {
  const projections = generateProgressionProjections(selectedDistrict, 5, policyParams);
  const totalAverted = projections.reduce((acc, p) => acc + p.avertedCasesWithIntervention, 0);
  const totalSavingsCrores = projections.reduce((acc, p) => acc + p.costSavingsCroresWithIntervention, 0);

  // ROI calculation
  const totalCostCrores = (policyParams.annualScreeningBudgetCrores || 0.8) * 5;
  const netBenefitCrores = Math.max(totalSavingsCrores - totalCostCrores, 0);
  const roiMultiplier = totalCostCrores > 0 ? (totalSavingsCrores / totalCostCrores).toFixed(1) : '4.2';

  const applyPreset = (preset: 'statusQuo' | 'screening' | 'intensive') => {
    switch (preset) {
      case 'statusQuo':
        setPolicyParams({
          screeningCoverageIncreasePct: 0,
          earlyACEiSGLT2iAdherencePct: 0,
          lifestyleAndSaltInterventionPct: 0,
          annualScreeningBudgetCrores: 0.2
        });
        break;
      case 'screening':
        setPolicyParams({
          screeningCoverageIncreasePct: 25,
          earlyACEiSGLT2iAdherencePct: 35,
          lifestyleAndSaltInterventionPct: 20,
          annualScreeningBudgetCrores: 0.8
        });
        break;
      case 'intensive':
        setPolicyParams({
          screeningCoverageIncreasePct: 45,
          earlyACEiSGLT2iAdherencePct: 70,
          lifestyleAndSaltInterventionPct: 40,
          annualScreeningBudgetCrores: 1.5
        });
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-700" />
            <h2 className="text-base font-bold text-slate-900">
              Health Economics & Public Health Policy "What-If" Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Simulate the clinical and fiscal returns of early interventions versus late-stage dialysis expenditure in{' '}
            <span className="font-bold text-teal-800">{selectedDistrict.name}</span>.
          </p>
        </div>

        {/* Preset buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-600 px-1 text-[11px] font-medium">Policy Presets:</span>
          <button
            onClick={() => applyPreset('statusQuo')}
            className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors shadow-2xs font-medium"
          >
            Status Quo
          </button>
          <button
            onClick={() => applyPreset('screening')}
            className="px-2.5 py-1 rounded bg-teal-100 text-teal-900 border border-teal-300 hover:bg-teal-200 transition-colors font-bold shadow-2xs"
          >
            PHC Screening Drive
          </button>
          <button
            onClick={() => applyPreset('intensive')}
            className="px-2.5 py-1 rounded bg-purple-100 text-purple-900 border border-purple-300 hover:bg-purple-200 transition-colors font-bold shadow-2xs"
          >
            Full Intensive Protocol
          </button>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Real-Time Outcomes on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center justify-between">
            <span>Intervention Levers</span>
            <button
              onClick={() => applyPreset('statusQuo')}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </h3>

          {/* Lever 1: Screening Expansion */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-800 font-medium">Primary CPHC Screening Coverage Increase:</span>
              <span className="text-teal-800 font-mono font-bold">
                +{policyParams.screeningCoverageIncreasePct}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={policyParams.screeningCoverageIncreasePct}
              onChange={(e) =>
                setPolicyParams((prev) => ({
                  ...prev,
                  screeningCoverageIncreasePct: Number(e.target.value)
                }))
              }
              className="w-full accent-teal-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Baseline (Current)</span>
              <span>+25% ASHA expansion</span>
              <span>+50% Saturation</span>
            </div>
          </div>

          {/* Lever 2: SGLT2i / ACEi-ARB adherence */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-800 font-medium">Early SGLT2i / ACEi-ARB Therapeutic Adherence:</span>
              <span className="text-purple-800 font-mono font-bold">
                {policyParams.earlyACEiSGLT2iAdherencePct}% of high-risk cohort
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={policyParams.earlyACEiSGLT2iAdherencePct}
              onChange={(e) =>
                setPolicyParams((prev) => ({
                  ...prev,
                  earlyACEiSGLT2iAdherencePct: Number(e.target.value)
                }))
              }
              className="w-full accent-purple-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% (Standard care)</span>
              <span>40% (PHC stock availability)</span>
              <span>80% (Universal distribution)</span>
            </div>
          </div>

          {/* Lever 3: Lifestyle & Salt reduction */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-800 font-medium">Dietary Salt & Betel Nut Tobacco Reduction:</span>
              <span className="text-amber-800 font-mono font-bold">
                {policyParams.lifestyleAndSaltInterventionPct}% compliance
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={policyParams.lifestyleAndSaltInterventionPct}
              onChange={(e) =>
                setPolicyParams((prev) => ({
                  ...prev,
                  lifestyleAndSaltInterventionPct: Number(e.target.value)
                }))
              }
              className="w-full accent-amber-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0%</span>
              <span>30% Community awareness</span>
              <span>60% Tea estate welfare drive</span>
            </div>
          </div>

          {/* Context note */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600">
            <strong>Biological Rationale:</strong> Clinical trials (CREDENCE, DAPA-CKD) confirm SGLT2 inhibitors and ARBs decelerate eGFR decline from -4.5 mL/min/year down to -1.8 mL/min/year in diabetic kidney disease, delaying dialysis onset by 4.2 to 7.8 years.
          </div>
        </div>

        {/* Real-time Outcomes Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            5-Year Projected Health Economics Impact
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-1.5 text-emerald-800 text-[11px] mb-1 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" /> ESRD Cases Averted
              </div>
              <div className="text-3xl font-extrabold text-emerald-800 font-mono">
                {totalAverted.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-600 mt-1">
                Patients spared from irreversible renal replacement therapy
              </div>
            </div>

            <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200">
              <div className="flex items-center gap-1.5 text-teal-800 text-[11px] mb-1 font-bold">
                <DollarSign className="w-4 h-4 text-teal-600" /> Gross Subsidy Savings
              </div>
              <div className="text-3xl font-extrabold text-teal-800 font-mono">
                ₹{totalSavingsCrores.toFixed(2)} Cr
              </div>
              <div className="text-[10px] text-slate-600 mt-1">
                Averted PMNDP & Ayushman Asom claims
              </div>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center gap-1.5 text-purple-800 text-[11px] mb-1 font-bold">
                <ShieldCheck className="w-4 h-4 text-purple-600" /> Dialysis Machine Load
              </div>
              <div className="text-2xl font-extrabold text-purple-800 font-mono">
                -{Math.ceil(totalAverted / 7)} Units
              </div>
              <div className="text-[10px] text-slate-600 mt-1">
                Reduced physical capital expenditure
              </div>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center gap-1.5 text-amber-800 text-[11px] mb-1 font-bold">
                <HeartHandshake className="w-4 h-4 text-amber-600" /> Estimated ROI Multiplier
              </div>
              <div className="text-2xl font-extrabold text-amber-800 font-mono">
                {roiMultiplier}x
              </div>
              <div className="text-[10px] text-slate-600 mt-1">
                ₹ saved per ₹ invested in early detection
              </div>
            </div>
          </div>

          {/* Policy Recommendation Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-slate-50 border border-teal-200 text-xs space-y-1.5">
            <div className="font-bold text-teal-900 text-sm">
              Executive Policy Recommendation for Health & Family Welfare:
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              Investing ₹{totalCostCrores.toFixed(1)} Crores over 5 years in early dipstick microalbuminuria testing and SGLT2i availability at {selectedDistrict.name}'s Ayushman Arogya Mandirs yields a direct return of <strong className="text-emerald-800 font-bold">₹{totalSavingsCrores.toFixed(2)} Crores</strong> in averted tertiary hemodialysis subsidies, while preserving quality of life for <strong className="text-slate-900 font-bold">{totalAverted} citizens</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
