import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, DollarSign, HeartPulse, ShieldAlert, Sparkles } from 'lucide-react';
import { DistrictMetric, PolicyInterventionParams } from '../types';
import { generateProgressionProjections } from '../utils/clinicalAlgorithms';

interface ProgressionForecasterProps {
  selectedDistrict: DistrictMetric;
  policyParams: PolicyInterventionParams;
}

export const ProgressionForecaster: React.FC<ProgressionForecasterProps> = ({
  selectedDistrict,
  policyParams
}) => {
  const [horizonYears, setHorizonYears] = useState<number>(5);

  const projectionData = generateProgressionProjections(selectedDistrict, horizonYears, policyParams);

  // Latest year statistics
  const finalPoint = projectionData[projectionData.length - 1];
  const initialPoint = projectionData[0];

  const totalAverted = projectionData.reduce((acc, p) => acc + p.avertedCasesWithIntervention, 0);
  const totalSavingsCrores = projectionData.reduce((acc, p) => acc + p.costSavingsCroresWithIntervention, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold text-slate-900">
              Multi-Year Cross-Programmatic Disease Progression Engine (Markov Model)
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Simulating cohort transitions from baseline Diabetes / Hypertension into Chronic Kidney Disease (Stages 1–5) for{' '}
            <span className="font-bold text-teal-800">{selectedDistrict.name}</span>.
          </p>
        </div>

        {/* Horizon Picker */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-600 px-2 font-medium">Forecasting Horizon:</span>
          {[1, 3, 5].map((yrs) => (
            <button
              key={yrs}
              onClick={() => setHorizonYears(yrs)}
              className={`px-3 py-1 rounded font-bold transition-colors ${
                horizonYears === yrs
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {yrs} {yrs === 1 ? 'Year' : 'Years'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-medium">Projected CKD (Stage 3-4)</span>
            <HeartPulse className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-amber-800">
            {finalPoint.ckdStage3aAnd3b.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Up from {initialPoint.ckdStage3aAnd3b.toLocaleString()} at baseline
          </div>
        </div>

        <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-xs bg-rose-50/30">
          <div className="flex items-center justify-between text-rose-800 mb-1">
            <span className="font-medium">Predicted ESRD on Dialysis</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-rose-700">
            {finalPoint.ckdStage5ESRD.toLocaleString()}
          </div>
          <div className="text-[11px] text-rose-600 mt-1 font-medium">
            Requires continuous PMNDP machine capacity
          </div>
        </div>

        <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-xs bg-emerald-50/30">
          <div className="flex items-center justify-between text-emerald-800 mb-1">
            <span className="font-medium">Dialysis Cases Averted</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-700">
            {totalAverted.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">
            Via early screening & ACEi/SGLT2i adherence
          </div>
        </div>

        <div className="bg-white border border-teal-200 rounded-xl p-4 shadow-xs bg-teal-50/30">
          <div className="flex items-center justify-between text-teal-800 mb-1">
            <span className="font-medium">Cumulative Cost Averted</span>
            <DollarSign className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-teal-800">
            ₹{totalSavingsCrores.toFixed(2)} Cr
          </div>
          <div className="text-[11px] text-teal-700 mt-1 font-medium">
            Ayushman Asom / PMNDP public savings
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Cohort Stage Trajectories ({initialPoint.year} – {finalPoint.year})
            </h3>
            <p className="text-xs text-slate-500">
              Stacking patient transitions across progressive disease states under current epidemiological velocity.
            </p>
          </div>
          <div className="text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-700 font-medium">
            Markov State Transitions: <span className="text-teal-700 font-mono font-bold">KDIGO Calibrated</span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCkd12" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCkd3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCkd4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCkd5" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#475569', fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#475569', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                  color: '#0f172a',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="ckdStage1and2" name="CKD Stage 1-2 (Early)" stroke="#0d9488" fillOpacity={1} fill="url(#colorCkd12)" />
              <Area type="monotone" dataKey="ckdStage3aAnd3b" name="CKD Stage 3a-3b (Moderate)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorCkd3)" />
              <Area type="monotone" dataKey="ckdStage4" name="CKD Stage 4 (Severe)" stroke="#ea580c" fillOpacity={1} fill="url(#colorCkd4)" />
              <Area type="monotone" dataKey="ckdStage5ESRD" name="CKD Stage 5 (Dialysis / ESRD)" stroke="#dc2626" fillOpacity={1} fill="url(#colorCkd5)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Narrative Clinical Callout */}
        <div className="bg-teal-50/60 p-3.5 rounded-lg border border-teal-200 text-xs text-slate-800 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-teal-900">Cross-Programme Clinical Insight:</div>
            <p className="mt-0.5 text-slate-700 leading-relaxed">
              Without active intervention, approximately <strong className="text-amber-800">12.5% of CKD Stage 4 patients</strong> in {selectedDistrict.name} will transition to End-Stage Renal Disease (ESRD) annually, requiring continuous hemodialysis. Early identification via urine dipstick / uACR and SGLT2i / ACEi-ARB therapeutic initiation at the Ayushman Arogya Mandir (AAM) level can decelerate this progression curve by up to <strong className="text-emerald-700 font-bold">34%</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
