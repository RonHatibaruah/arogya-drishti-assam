import React from 'react';
import { ShieldAlert, Activity, FileText, Layers, Bell, CheckCircle2, Award, Printer } from 'lucide-react';
import { DistrictMetric } from '../types';

interface HeaderProps {
  districts: DistrictMetric[];
  selectedDistrict: DistrictMetric;
  activeTab: 'overview' | 'forecasting' | 'dialysis' | 'triage' | 'simulator' | 'proposal' | 'pow';
  setActiveTab: (tab: 'overview' | 'forecasting' | 'dialysis' | 'triage' | 'simulator' | 'proposal' | 'pow') => void;
  onOpenProposalModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  districts,
  selectedDistrict,
  activeTab,
  setActiveTab,
  onOpenProposalModal
}) => {
  // Aggregate stats across Assam
  const totalScreened = districts.reduce((acc, d) => acc + d.screenedPopulation, 0);
  const totalDiabetics = districts.reduce((acc, d) => acc + d.confirmedDiabetics, 0);
  const totalProjectedCKD = districts.reduce((acc, d) => acc + d.projectedCKDStage3to5, 0);
  const totalMachineShortfall = districts.reduce((acc, d) => acc + d.dialysisMachineShortfall, 0);

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 print:hidden">
      {/* Top Govt Bar */}
      <div className="bg-slate-950/80 px-4 py-1.5 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            GOVERNMENT OF ASSAM
          </span>
          <span className="text-slate-600">|</span>
          <span>Health & Family Welfare Department • National Health Mission (NHM)</span>
          <span className="text-slate-600">|</span>
          <span className="bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800 font-mono text-[10px]">
            NESFIC-D-28 Track
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            ABDM & FHIR R4 Compliant
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono">Assam CPHC NCD Integrated</span>
        </div>
      </div>

      {/* Main Branding & Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-900/30 border border-teal-400/30">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                আৰোগ্য-দৃষ্টি অসম <span className="text-teal-400 font-extrabold text-lg">Arogya-Drishti</span>
              </h1>
              <span className="text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                v2.6 Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Cross-Programme NCD & Renal-Cardiovascular Intelligence Platform (NHM Assam)
            </p>
          </div>
        </div>

        {/* Quick Statewide KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg px-2.5 py-1.5">
            <div className="text-[10px] text-slate-400">Statewide Screened</div>
            <div className="text-sm font-bold text-white font-mono">{(totalScreened / 100000).toFixed(1)} Lakhs</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg px-2.5 py-1.5">
            <div className="text-[10px] text-slate-400">Confirmed Diabetics</div>
            <div className="text-sm font-bold text-amber-400 font-mono">{(totalDiabetics / 1000).toFixed(0)}k</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg px-2.5 py-1.5">
            <div className="text-[10px] text-slate-400">Projected CKD (3-5)</div>
            <div className="text-sm font-bold text-rose-400 font-mono">{(totalProjectedCKD / 1000).toFixed(1)}k</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg px-2.5 py-1.5">
            <div className="text-[10px] text-slate-400">Dialysis Deficit</div>
            <div className="text-sm font-bold text-rose-300 font-mono">-{totalMachineShortfall} Units</div>
          </div>
        </div>

        {/* Action Button: Proposal & Proof of Work */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pow')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs px-3.5 py-2 rounded-lg shadow-md shadow-amber-950 border border-amber-400/40 transition-all hover:scale-[1.02]"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Proof of Work PDF</span>
          </button>
          <button
            onClick={onOpenProposalModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-medium text-xs px-3 py-2 rounded-lg shadow-md shadow-teal-900/30 border border-teal-400/30 transition-all hover:scale-[1.02]"
          >
            <FileText className="w-4 h-4" />
            <span>12 Proposal Texts</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 flex overflow-x-auto gap-2 py-2 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'overview'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          District Command Heatmap
        </button>

        <button
          onClick={() => setActiveTab('forecasting')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'forecasting'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          5-Year Cohort Forecaster
        </button>

        <button
          onClick={() => setActiveTab('dialysis')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'dialysis'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          PMNDP Dialysis Planner
        </button>

        <button
          onClick={() => setActiveTab('triage')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'triage'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          Targeted Case Triage (KDIGO/KFRE)
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'simulator'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          Policy "What-If" Simulator
        </button>

        <button
          onClick={() => setActiveTab('pow')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'pow'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
              : 'text-amber-400 hover:text-amber-200 hover:bg-slate-800/50'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          Proof of Work (PDF Ready)
        </button>

        <button
          onClick={() => setActiveTab('proposal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'proposal'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Official NESFIC-D-28 Text (12 Sections)
        </button>
      </div>
    </header>
  );
};
