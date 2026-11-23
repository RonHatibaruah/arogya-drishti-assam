import React from 'react';
import { ShieldAlert, Activity, FileText, Layers, Bell, CheckCircle2, Award, Printer, Image as ImageIcon, BookOpen, HelpCircle } from 'lucide-react';
import { DistrictMetric } from '../types';

interface HeaderProps {
  districts: DistrictMetric[];
  selectedDistrict: DistrictMetric;
  activeTab: 'overview' | 'forecasting' | 'dialysis' | 'triage' | 'simulator' | 'proposal' | 'pow' | 'gallery';
  setActiveTab: (tab: 'overview' | 'forecasting' | 'dialysis' | 'triage' | 'simulator' | 'proposal' | 'pow' | 'gallery') => void;
  onOpenProposalModal: () => void;
  onOpenTutorialModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  districts,
  selectedDistrict,
  activeTab,
  setActiveTab,
  onOpenProposalModal,
  onOpenTutorialModal
}) => {
  // Aggregate stats across Assam
  const totalScreened = districts.reduce((acc, d) => acc + d.screenedPopulation, 0);
  const totalDiabetics = districts.reduce((acc, d) => acc + d.confirmedDiabetics, 0);
  const totalProjectedCKD = districts.reduce((acc, d) => acc + d.projectedCKDStage3to5, 0);
  const totalMachineShortfall = districts.reduce((acc, d) => acc + d.dialysisMachineShortfall, 0);

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 print:hidden shadow-xs">
      {/* Top Govt Bar */}
      <div className="bg-slate-100 px-4 py-1.5 border-b border-slate-200 text-xs flex flex-wrap items-center justify-between text-slate-700">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-slate-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            GOVERNMENT OF ASSAM
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-medium text-slate-700">Health & Family Welfare Department • National Health Mission (NHM)</span>
          <span className="text-slate-300">|</span>
          <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded border border-teal-300 font-mono text-[10px] font-semibold">
            NESFIC-D-28 Track
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={onOpenTutorialModal}
            className="flex items-center gap-1 font-semibold text-teal-800 bg-white hover:bg-teal-50 px-2.5 py-0.5 rounded border border-teal-300 transition-colors shadow-2xs cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
            <span>Platform Tutorial & Guide</span>
          </button>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ABDM & FHIR R4 Compliant
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-mono font-medium">Assam CPHC NCD Integrated</span>
        </div>
      </div>

      {/* Main Branding & Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-900/10 border border-teal-600">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                আৰোগ্য-দৃষ্টি অসম <span className="text-teal-700 font-extrabold text-lg">Arogya-Drishti</span>
              </h1>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                v2.6 Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Cross-Programme NCD & Renal-Cardiovascular Intelligence Platform (NHM Assam)
            </p>
          </div>
        </div>

        {/* Quick Statewide KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <div className="text-[10px] text-slate-500 font-medium">Statewide Screened</div>
            <div className="text-sm font-bold text-slate-900 font-mono">{(totalScreened / 100000).toFixed(1)} Lakhs</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <div className="text-[10px] text-slate-500 font-medium">Confirmed Diabetics</div>
            <div className="text-sm font-bold text-amber-700 font-mono">{(totalDiabetics / 1000).toFixed(0)}k</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <div className="text-[10px] text-slate-500 font-medium">Projected CKD (3-5)</div>
            <div className="text-sm font-bold text-rose-700 font-mono">{(totalProjectedCKD / 1000).toFixed(1)}k</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <div className="text-[10px] text-slate-500 font-medium">Dialysis Deficit</div>
            <div className="text-sm font-bold text-rose-700 font-mono">-{totalMachineShortfall} Units</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTutorialModal}
            className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs px-3.5 py-2 rounded-lg border border-slate-300 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
            title="Interactive walkthrough of features and clinical workflows"
          >
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span>Tutorial Guide</span>
          </button>
          <button
            onClick={() => setActiveTab('pow')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all hover:scale-[1.02]"
          >
            <Printer className="w-4 h-4" />
            <span>Proof of Work PDF</span>
          </button>
          <button
            onClick={onOpenProposalModal}
            className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-600 text-white font-medium text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all hover:scale-[1.02]"
          >
            <FileText className="w-4 h-4" />
            <span>12 Proposal Texts</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 border-t border-slate-200 flex overflow-x-auto gap-2 py-2 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'overview'
              ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          District Command Heatmap
        </button>

        <button
          onClick={() => setActiveTab('forecasting')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'forecasting'
              ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          5-Year Cohort Forecaster
        </button>

        <button
          onClick={() => setActiveTab('dialysis')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'dialysis'
              ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          PMNDP Dialysis Planner
        </button>

        <button
          onClick={() => setActiveTab('triage')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'triage'
              ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          Targeted Case Triage (KDIGO/KFRE)
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'simulator'
              ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
          Policy "What-If" Simulator
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'gallery'
              ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
          Visual Blueprints (6 Figures)
        </button>

        <button
          onClick={() => setActiveTab('pow')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'pow'
              ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
              : 'text-amber-800 hover:text-amber-900 hover:bg-amber-50'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-600" />
          Proof of Work (PDF Doc)
        </button>

        <button
          onClick={() => setActiveTab('proposal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
            activeTab === 'proposal'
              ? 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Official NESFIC-D-28 Text (12 Sections)
        </button>
      </div>
    </header>
  );
};
