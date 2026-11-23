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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-semibold text-white">
              Multi-Year Cross-Programmatic Disease Progression Engine (Markov Model)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulating cohort transitions from baseline Diabetes / Hypertension into Chronic Kidney Disease (Stages 1–5) for{' '}
            <span className="font-semibold text-teal-300">{selectedDistrict.name}</span>.
          </p>
        </div>

        {/* Horizon Picker */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-xs">
          <span className="text-slate-400 px-2">Forecasting Horizon:</span>
          {[1, 3, 5].map((yrs) => (
            <button
              key={yrs}
              onClick={() => setHorizonYears(yrs)}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                horizonYears === yrs
                  ? 'bg-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {yrs} {yrs === 1 ? 'Year' : 'Years'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Projected CKD (Stage 3-4)</span>
            <HeartPulse className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {finalPoint.ckdStage3aAnd3b.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Up from {initialPoint.ckdStage3aAnd3b.toLocaleString()} at baseline
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Predicted ESRD on Dialysis</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">
            {finalPoint.ckdStage5ESRD.toLocaleString()}
          </div>
          <div className="text-[11px] text-rose-300/80 mt-1">
            Requires continuous PMNDP machine capacity
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Dialysis Cases Averted</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {totalAverted.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-1">
            Via early screening & ACEi/SGLT2i adherence
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Cumulative Cost Averted</span>
            <DollarSign className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-teal-300">
            ₹{totalSavingsCrores.toFixed(2)} Cr
          </div>
          <div className="text-[11px] text-teal-400/80 mt-1">
            Ayushman Asom / PMNDP public savings
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Cohort Stage Trajectories ({initialPoint.year} – {finalPoint.year})
            </h3>
            <p className="text-xs text-slate-400">
              Stacking patient transitions across progressive disease states under current epidemiological velocity.
            </p>
          </div>
          <div className="text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-slate-300">
            Markov State Transitions: <span className="text-teal-400 font-mono">KDIGO Calibrated</span>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '12px'
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
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white">Cross-Programme Clinical Insight:</div>
            <p className="mt-0.5 text-slate-400 leading-relaxed">
              Without active intervention, approximately <strong className="text-amber-300">12.5% of CKD Stage 4 patients</strong> in {selectedDistrict.name} will transition to End-Stage Renal Disease (ESRD) annually, requiring continuous hemodialysis. Early identification via urine dipstick / uACR and SGLT2i / ACEi-ARB therapeutic initiation at the Ayushman Arogya Mandir (AAM) level can decelerate this progression curve by up to <strong className="text-emerald-400">34%</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
