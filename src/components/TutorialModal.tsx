import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  Layers, 
  Activity, 
  ShieldAlert, 
  Bell, 
  Sliders, 
  FileText, 
  Download, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'overview' | 'forecasting' | 'dialysis' | 'triage' | 'simulator' | 'proposal' | 'pow' | 'gallery') => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "1. Platform Overview & NHM Assam Mandate",
      tab: 'overview' as const,
      icon: Laptop,
      badge: "NESFIC-D-28 Mandate",
      summary: "Understanding the Cross-Programme Health Challenge",
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>The Challenge:</strong> In Assam, adult hypertension stands at ~28% and diabetes affects over 15% of the adult cohort. While ASHAs and ANMs screen over 5.8 Lakh individuals under the Comprehensive Primary Health Care (CPHC) NP-NCD program, these records sit in isolated databases.
          </p>
          <p>
            <strong>The Blindspot:</strong> Diabetic nephropathy progresses asymptomatically for 4 to 6 years. Without automated longitudinal tracking, patients present in acute renal failure at tertiary Medical Colleges (GMCH Guwahati, AMCH Dibrugarh), overwhelming Pradhan Mantri National Dialysis Programme (PMNDP) hemodialysis centers.
          </p>
          <div className="bg-teal-50 border border-teal-200 p-3 rounded-lg text-teal-900 font-medium">
            <strong>The Arogya-Drishti Solution:</strong> A sovereign, ABDM-compliant clinical AI engine that links primary glycemic screening with KDIGO 2024 and KFRE risk equations, generating early referrals to prevent kidney failure and forecasting 5-year district dialysis demand.
          </div>
        </div>
      )
    },
    {
      title: "2. District Command Heatmap",
      tab: 'overview' as const,
      icon: Layers,
      badge: "Geospatial Command",
      summary: "Statewide Surveillance & Resource Allocation Across 35 Districts",
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>How to use this feature:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600">
            <li><strong>Zone Filter:</strong> Filter Assam districts across 6 administrative zones (Lower Assam, Central Assam, Upper Assam, North Assam, Barak Valley, Hills/BTAD).</li>
            <li><strong>Metric Selector:</strong> Toggle views between Diabetic Prevalence, Projected CKD (Stages 3–5), Active PMNDP Hemodialysis Stations, and Net Machine Deficits.</li>
            <li><strong>District Selection:</strong> Click on any district card (e.g., <em>Kamrup Metro</em> or <em>Dibrugarh</em>) to dynamically bind its epidemiological profile across all forecasters and clinical tools.</li>
          </ul>
          <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-700">Explore Kamrup Metro & Dibrugarh baseline metrics:</span>
            <button
              onClick={() => { onNavigateTab('overview'); onClose(); }}
              className="text-xs bg-teal-700 hover:bg-teal-800 text-white font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1"
            >
              Open Heatmap <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )
    },
    {
      title: "3. 5-Year Cohort Forecaster",
      tab: 'forecasting' as const,
      icon: Activity,
      badge: "Markov AI Simulation",
      summary: "Predicting Disease Trajectory & Averting Dialysis Crashes",
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>How to use this feature:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600">
            <li><strong>Multi-State Markov Progression:</strong> View how the selected district's diabetic cohort transitions annually from Stage 1 ($G_1$) through Stage 5 ($G_5$/ESRD) over 5 consecutive years.</li>
            <li><strong>Intervention Impact:</strong> Toggle the "With Preventive Intervention" curve to observe how early SGLT2i (Dapagliflozin) and ACEi/ARB therapy flattens the progression curve.</li>
            <li><strong>Outcome Metrics:</strong> Inspect exact numbers of averted dialysis dependencies and life-years gained.</li>
          </ul>
        </div>
      )
    },
    {
      title: "4. PMNDP Dialysis Capacity Planner",
      tab: 'dialysis' as const,
      icon: ShieldAlert,
      badge: "Supply Chain & Operations",
      summary: "2-Shift vs 3-Shift Optimization & Consumable Logistics",
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>How to use this feature:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600">
            <li><strong>Shift Modeling:</strong> Compare standard 2-shift operations with a 3-shift operational schedule to increase machine patient-handling capacity by 33% without CapEx.</li>
            <li><strong>Consumables Logistics:</strong> Calculate precise annual requirements for High-Flux Dialyzers (F6/F7 with 6-cycle reuse), AV bloodlines, RO treated water (liters/day), and Erythropoietin (EPO 4000 IU).</li>
            <li><strong>Technician Sizing:</strong> Verify certified dialysis technician and nurse staffing ratios to prevent staff burnout.</li>
          </ul>
        </div>
      )
    },
    {
      title: "5. Targeted Case Triage & Digital ABHA Referral",
      tab: 'triage' as const,
      icon: Bell,
      badge: "KDIGO 2024 & KFRE",
      summary: "Frontline Patient Screening & Paperless QR Referral Slips",
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>How to use this feature:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600">
            <li><strong>Clinical Cohort Triage:</strong> Review patient records flagged by e-Kavach/ANMOL based on age, sex, eGFR (CKD-EPI), and spot urine uACR.</li>
            <li><strong>4-Variable KFRE Calculation:</strong> Inspect the calculated 2-year and 5-year Kidney Failure Risk Equation scores (e.g. 34.8% critical risk).</li>
            <li><strong>Generate Printable Referral Slip:</strong> Click "Generate ABHA Referral Slip" to open a verified, QR-coded electronic referral slip with GMCH/AMCH OPD routing and prescriptive pharmacotherapy orders.</li>
          </ul>
        </div>
      )
    },
    {
      title: "6. Policy 'What-If' Simulation Laboratory",
      tab: 'simulator' as const,
      icon: Sliders,
      badge: "Economic ROI Engine",
      summary: "Interactive Health Economics & Budget Allocation Sliders",
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>How to use this feature:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600">
            <li><strong>Adjust Policy Sliders:</strong> Move the sliders for Primary Screening Coverage (+10% to +50%), Early SGLT2i Adherence %, Community Salt Reduction %, and Annual Screening Budget.</li>
            <li><strong>Live Economic Impact:</strong> Observe real-time recalculation of Net Dialysis Costs Averted (₹ Crores), ESRD cases delayed, and the <strong>Fiscal ROI Multiplier</strong> (up to 4.2x return).</li>
          </ul>
        </div>
      )
    },
    {
      title: "7. Visual Blueprints & Official Proposal Documents",
      tab: 'gallery' as const,
      icon: FileText,
      badge: "Official Submissions",
      summary: "16:9 Widescreen Technological Infographics & Pre-Compiled PDFs",
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>Official Deliverables Ready for Evaluation:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600">
            <li><strong>Visual Blueprints Gallery:</strong> Inspect and download all 16:9 widescreen technological framework infographics in high-res PNG (300 DPI) and Vector SVG formats.</li>
            <li><strong>Proof of Work PDF (8 Pages):</strong> Complete technical architecture, clinical equations, KDIGO grid, and district capacity tables.</li>
            <li><strong>Official NESFIC-D-28 Proposal PDF (13 Pages):</strong> All 12 portal sections, strictly audited under 500 words per section, complete with matching embedded figures.</li>
          </ul>
        </div>
      )
    }
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                  Interactive User Guide
                </span>
                <span className="text-xs text-slate-500 font-medium">NHM Assam • NESFIC-D-28</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                How to Use Arogya-Drishti Assam
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div className="px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-all text-[11px] ${
                activeStep === idx
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>

        {/* Step Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {current.badge}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">{current.summary}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <StepIcon className="w-4 h-4 text-teal-700" />
                {current.title}
              </h3>
            </div>

            <button
              onClick={() => {
                onNavigateTab(current.tab);
                onClose();
              }}
              className="text-xs bg-slate-100 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300 border border-slate-300 font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Go to Feature</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
            </button>
          </div>

          <div className="py-2">
            {current.content}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className={`text-xs font-semibold px-3.5 py-2 rounded-lg border transition-all ${
              activeStep === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
            }`}
          >
            Previous Step
          </button>

          <div className="text-xs text-slate-500 font-mono">
            {activeStep + 1} of {steps.length}
          </div>

          {activeStep < steps.length - 1 ? (
            <button
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                onNavigateTab('overview');
                onClose();
              }}
              className="text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Start Exploring Platform</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
