import React, { useState } from 'react';
import { Search, AlertOctagon, Filter, FileText, X, CheckCircle, Share2, Stethoscope, QrCode } from 'lucide-react';
import { PatientRecord, RiskTier } from '../types';
import { MOCK_PATIENTS } from '../data/assamDistrictsData';

interface PatientRiskTriageProps {
  selectedDistrictName: string;
}

export const PatientRiskTriage: React.FC<PatientRiskTriageProps> = ({ selectedDistrictName }) => {
  const [patients, setPatients] = useState<PatientRecord[]>(MOCK_PATIENTS);
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeModalPatient, setActiveModalPatient] = useState<PatientRecord | null>(null);

  const filtered = patients.filter((p) => {
    const matchesTier = selectedTier === 'all' || p.riskTier === selectedTier;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.abhaId.includes(searchTerm) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.facility.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const getTierBadge = (tier: RiskTier) => {
    switch (tier) {
      case 'critical':
        return (
          <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded text-[11px] font-semibold uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            Critical (Tier 1)
          </span>
        );
      case 'high':
        return (
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[11px] font-semibold uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            High (Tier 2)
          </span>
        );
      case 'moderate':
        return (
          <span className="bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 px-2 py-0.5 rounded text-[11px] font-semibold uppercase">
            Moderate (Tier 3)
          </span>
        );
      case 'low':
        return (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-semibold uppercase">
            Low (Tier 4)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-semibold text-white">
              Targeted Early Case Identification & Renal Triage Console
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmic microalbuminuria and nephropathy risk identification linking primary CPHC-NCD screenings to secondary care.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-xs">
          <span className="text-slate-400 px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Risk Filter:
          </span>
          {['all', 'critical', 'high', 'moderate'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              className={`px-2.5 py-1 rounded capitalize transition-colors ${
                selectedTier === t
                  ? 'bg-teal-600 text-white font-medium shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Filter by patient name, ABHA ID, village facility, or district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
        />
      </div>

      {/* Patient Triage Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-medium">
              <tr>
                <th className="py-3 px-4">Patient & ABHA ID</th>
                <th className="py-3 px-3">Location / Facility</th>
                <th className="py-3 px-3">BP & Blood Sugar</th>
                <th className="py-3 px-3">eGFR & uACR</th>
                <th className="py-3 px-3">KDIGO Staging</th>
                <th className="py-3 px-3">KFRE 5-Yr Risk</th>
                <th className="py-3 px-3">Risk Tier</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{p.name}</div>
                    <div className="font-mono text-[10px] text-teal-400">{p.abhaId}</div>
                    <div className="text-[10px] text-slate-500">
                      {p.gender}, {p.age} yrs • ID: {p.id}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-200">{p.facility}</div>
                    <div className="text-[10px] text-slate-400">
                      {p.block}, {p.district}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <div className={p.systolicBP >= 160 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                      {p.systolicBP}/{p.diastolicBP} mmHg
                    </div>
                    <div className="text-[10px] text-amber-400">
                      RBS: {p.bloodSugarRandom} mg/dL (HbA1c {p.hba1c}%)
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <div className={p.eGFR && p.eGFR < 45 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                      eGFR: {p.eGFR} mL/min
                    </div>
                    <div className="text-[10px] text-slate-400">
                      uACR: {p.uACR} mg/g (Dipstick {p.urineAlbuminDipstick})
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                      {p.kdigoCategory}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <div className={p.kfreScore5YrPct >= 20 ? 'text-rose-400 font-bold text-sm' : 'text-amber-300'}>
                      {p.kfreScore5YrPct}%
                    </div>
                    <div className="text-[10px] text-slate-500">
                      2-Yr: {p.kfreScore2YrPct}%
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    {getTierBadge(p.riskTier)}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => setActiveModalPatient(p)}
                      className="bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-300 px-2.5 py-1 rounded text-[11px] font-medium border border-slate-700 transition-colors flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      Referral Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referral Slip Modal */}
      {activeModalPatient && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveModalPatient(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-slate-800 pb-3 flex items-start justify-between">
              <div>
                <div className="text-[10px] font-semibold text-teal-400 uppercase tracking-wider">
                  Government of Assam • National Health Mission
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  ABDM Electronic Clinical Referral Slip
                </h3>
                <p className="text-xs text-slate-400">
                  Cross-Programme NP-NCD to Nephrology / Tertiary Care Fast-Track
                </p>
              </div>
              <QrCode className="w-12 h-12 text-slate-300 bg-white p-1 rounded" />
            </div>

            {/* Patient Info Card */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">{activeModalPatient.name}</span>
                <span className="font-mono text-teal-400">{activeModalPatient.abhaId}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-400 text-[11px]">
                <div>Age/Gender: <strong className="text-slate-200">{activeModalPatient.age} yrs / {activeModalPatient.gender}</strong></div>
                <div>Origin Facility: <strong className="text-slate-200">{activeModalPatient.facility}</strong></div>
                <div>Block & District: <strong className="text-slate-200">{activeModalPatient.block}, {activeModalPatient.district}</strong></div>
                <div>Screening Date: <strong className="text-slate-200">{activeModalPatient.lastScreeningDate}</strong></div>
              </div>
            </div>

            {/* Clinical Evidence Box */}
            <div className="bg-rose-950/20 border border-rose-900/40 p-3.5 rounded-xl text-xs space-y-1.5">
              <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-rose-400" />
                Algorithmic Risk Triaging Justification:
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-300">
                <div>Blood Pressure: <strong className="text-rose-400">{activeModalPatient.systolicBP}/{activeModalPatient.diastolicBP} mmHg</strong></div>
                <div>Blood Sugar (RBS): <strong className="text-amber-400">{activeModalPatient.bloodSugarRandom} mg/dL</strong></div>
                <div>eGFR: <strong className="text-rose-400">{activeModalPatient.eGFR} mL/min</strong></div>
                <div>uACR: <strong className="text-rose-400">{activeModalPatient.uACR} mg/g</strong></div>
                <div>KDIGO Category: <strong>{activeModalPatient.kdigoCategory}</strong></div>
                <div>5-Year KFRE ESRD Risk: <strong className="text-rose-400">{activeModalPatient.kfreScore5YrPct}%</strong></div>
              </div>
            </div>

            {/* Recommended Facility */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
              <div className="text-[10px] text-slate-400">Designated Referral Destination:</div>
              <div className="font-bold text-teal-300 text-sm mt-0.5">
                {activeModalPatient.referralFacility}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Clinical Recommendation: {activeModalPatient.recommendedAction}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Referral slip for ${activeModalPatient.name} (ABHA: ${activeModalPatient.abhaId}) dispatched to ${activeModalPatient.referralFacility} via ABDM Gateway.`);
                  setActiveModalPatient(null);
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Dispatch via ABDM Gateway
              </button>
              <button
                onClick={() => window.print()}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
              >
                Print PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
