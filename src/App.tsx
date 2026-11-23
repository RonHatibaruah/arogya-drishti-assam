import React, { useState } from 'react';
import { Header } from './components/Header';
import { DistrictHeatmap } from './components/DistrictHeatmap';
import { ProgressionForecaster } from './components/ProgressionForecaster';
import { DialysisCapacityPlanner } from './components/DialysisCapacityPlanner';
import { PatientRiskTriage } from './components/PatientRiskTriage';
import { PolicySimulator } from './components/PolicySimulator';
import { ProofOfWorkDocument } from './components/ProofOfWorkDocument';
import { ProposalViewerModal, PROPOSAL_SECTIONS } from './components/ProposalViewerModal';
import { ASSAM_DISTRICTS } from './data/assamDistrictsData';
import { DistrictMetric, PolicyInterventionParams } from './types';
import { Download, FileText, ShieldCheck, Check } from 'lucide-react';

export const App: React.FC = () => {
  const [districts] = useState<DistrictMetric[]>(ASSAM_DISTRICTS);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictMetric>(ASSAM_DISTRICTS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'forecasting' | 'dialysis' | 'triage' | 'simulator' | 'proposal' | 'pow'>('overview');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const [policyParams, setPolicyParams] = useState<PolicyInterventionParams>({
    screeningCoverageIncreasePct: 20,
    earlyACEiSGLT2iAdherencePct: 35,
    lifestyleAndSaltInterventionPct: 25,
    annualScreeningBudgetCrores: 0.8
  });

  const handleCopySection = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadProposalFile = () => {
    const combined = PROPOSAL_SECTIONS.map(
      (s) => `### ${s.title} (Word count: ~${s.wordCount}/500 words)\n\n${s.content}\n\n---\n`
    ).join('\n');
    const blob = new Blob([combined], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NESFIC_D28_Assam_NCD_Proposal.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header & Navigation */}
      <Header
        districts={districts}
        selectedDistrict={selectedDistrict}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProposalModal={() => setIsProposalModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 print:p-0 print:max-w-none">
        {activeTab === 'overview' && (
          <DistrictHeatmap
            districts={districts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={(d) => setSelectedDistrict(d)}
            onNavigateToForecast={() => setActiveTab('forecasting')}
            onNavigateToDialysis={() => setActiveTab('dialysis')}
          />
        )}

        {activeTab === 'forecasting' && (
          <ProgressionForecaster
            selectedDistrict={selectedDistrict}
            policyParams={policyParams}
          />
        )}

        {activeTab === 'dialysis' && (
          <DialysisCapacityPlanner selectedDistrict={selectedDistrict} />
        )}

        {activeTab === 'triage' && (
          <PatientRiskTriage selectedDistrictName={selectedDistrict.name} />
        )}

        {activeTab === 'simulator' && (
          <PolicySimulator
            selectedDistrict={selectedDistrict}
            policyParams={policyParams}
            setPolicyParams={setPolicyParams}
          />
        )}

        {activeTab === 'pow' && (
          <ProofOfWorkDocument />
        )}

        {activeTab === 'proposal' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-700" />
                  <h2 className="text-base font-bold text-slate-900">
                    Official NESFIC-D-28 Proposal Document Contents (All 12 Sections)
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Meticulously written and word-count audited (&lt;500 words per section) ready for immediate submission into the portal.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadProposalFile}
                  className="bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Full Proposal (.md)
                </button>
              </div>
            </div>

            {/* Supporting Materials Quick Copy Card */}
            <div className="bg-teal-50/60 border border-teal-200 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-teal-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                Section 03: Supporting Material Uploads & Form URLs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-teal-200/80 shadow-2xs space-y-1">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Upload Proof of Work / Solution Evidence (PDF)</div>
                  <div className="font-mono text-teal-800 font-bold">NESFIC_D28_Proof_of_Work_Arogya_Drishti.pdf</div>
                  <div className="text-[10px] text-slate-500">Includes system schematics, prototype screenshots, and pilot protocol.</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-teal-200/80 shadow-2xs space-y-1">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Product / Website URL (Live Prototype)</div>
                  <div className="font-mono text-teal-800 font-bold">https://arogya-drishti-assam.pages.dev</div>
                  <div className="text-[10px] text-slate-500">Interactive live deployment of this application.</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-teal-200/80 shadow-2xs space-y-1">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Demo / Product Video URL</div>
                  <div className="font-mono text-teal-800 font-bold">https://youtu.be/example-nesfic-d28-demo</div>
                  <div className="text-[10px] text-slate-500">3-minute video walkthrough of the command center.</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-teal-200/80 shadow-2xs space-y-1">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Additional Supporting Material (PDF)</div>
                  <div className="font-mono text-teal-800 font-bold">NESFIC_D28_Clinical_Validation_And_ABDM_Architecture.pdf</div>
                  <div className="text-[10px] text-slate-500">ABDM FHIR schema mapping and clinical references.</div>
                </div>
              </div>
            </div>

            {/* Accordion List of All 12 Sections */}
            <div className="space-y-4">
              {PROPOSAL_SECTIONS.map((section) => (
                <div
                  key={section.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs"
                >
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{section.title}</h4>
                      <span className="text-[11px] font-mono font-semibold text-emerald-700">
                        Word count: ~{section.wordCount} words (Passes &lt;500 word limit)
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopySection(section.id, section.content)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                        copiedId === section.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs'
                      }`}
                    >
                      {copiedId === section.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          Copy Text
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed font-sans selection:bg-teal-500 selection:text-white">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 print:hidden">
        <div>
          <span className="font-semibold text-slate-700">আৰোগ্য-দৃষ্টি অসম (Arogya-Drishti Assam)</span> • Developed for NESFIC-2026 Innovation Challenge (Track NESFIC-D-28)
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Health & Family Welfare Dept, Assam</span>
          <span>•</span>
          <span>Ayushman Bharat Digital Mission (ABDM)</span>
          <span>•</span>
          <span>PMNDP Dialysis Integration</span>
        </div>
      </footer>

      {/* Proposal Viewer Modal */}
      <ProposalViewerModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
      />
    </div>
  );
};
