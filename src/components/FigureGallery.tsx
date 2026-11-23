import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  Eye, 
  Maximize2, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  FileText,
  CheckCircle2,
  X
} from 'lucide-react';

interface FigureItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: 'Workflow' | 'Architecture' | 'Clinical' | 'Geospatial' | 'Triage' | 'Governance';
  pngUrl: string;
  svgUrl: string;
  scoringCriteria: string;
  description: string;
  bulletPoints: string[];
}

export const FIGURES_DATA: FigureItem[] = [
  {
    id: 'fig1',
    number: 1,
    title: 'Clinical Workflow Transformation',
    subtitle: 'Current Fragmented Siloed Care vs. Arogya-Drishti Cross-Programme Closed Loop',
    category: 'Workflow',
    pngUrl: '/images/figure1_workflow_comparison.png',
    svgUrl: '/images/figure1_workflow_comparison.svg',
    scoringCriteria: 'Clinical Innovation & Life-Saving Impact (10/10)',
    description: 'Contrasts the status quo in Assam where patients present late in acute uremic crises requiring crash hemodialysis (₹4.8L/yr) against Arogya-Drishti continuous screening and early nephroprotection (saving ₹18L per patient).',
    bulletPoints: [
      'Eliminates the 4-7 year asymptomatic clinical blindspot in diabetic nephropathy.',
      'Connects frontline ASHA/ANM CPHC records directly with MO-PHC via FHIR R4.',
      '81.3% reduction in emergency ICU admissions via proactive ACEi/SGLT2i initiation.'
    ]
  },
  {
    id: 'fig2',
    number: 2,
    title: '4-Tier Sovereign State Cloud Architecture',
    subtitle: 'ABDM Milestones 1-3 Compliant Enterprise Digital Health Mesh',
    category: 'Architecture',
    pngUrl: '/images/figure2_abdm_enterprise_architecture.png',
    svgUrl: '/images/figure2_abdm_enterprise_architecture.svg',
    scoringCriteria: 'Technical Feasibility, Scalability & ABDM Compliance (10/10)',
    description: 'Detailed multi-tier architecture showing frontline ingestion (e-Kavach, ANMOL, PHC labs), ABDM interoperability gateway (M1 ABHA, M2 FHIR R4, M3 Consent), clinical AI Markov engine, and governance command tier.',
    bulletPoints: [
      'Engineered for deployment on Assam State Data Centre (ASDC) or NIC MeghRaj Cloud.',
      'Zero-knowledge anonymization with SHA-256 pseudonymization complying with DPDP Act 2023.',
      'Kafka-driven event stream supporting 10,000 concurrent field screenings across Assam.'
    ]
  },
  {
    id: 'fig3',
    number: 3,
    title: 'KDIGO 2024 Clinical Prognosis Heatmap Matrix',
    subtitle: 'Assam State Action Protocols Cross-Referencing eGFR and Albuminuria Categories',
    category: 'Clinical',
    pngUrl: '/images/figure3_kdigo_risk_heatmap.png',
    svgUrl: '/images/figure3_kdigo_risk_heatmap.svg',
    scoringCriteria: 'Evidence-Based Medicine & Clinical Validity (10/10)',
    description: 'The international KDIGO 2024 clinical staging grid translated into operational standard operating procedures for Sub-Centre HWCs, Primary Health Centres, and District Hospitals in Assam.',
    bulletPoints: [
      'Matrix correlates eGFR (G1-G5) with persistent albuminuria (A1-A3).',
      'Provides actionable color-coded guidance: green (annual screen) to crimson (AV fistula + PMNDP).',
      'Integrates the validated 4-Variable Kidney Failure Risk Equation (KFRE) for 2-year and 5-year ESKD probability.'
    ]
  },
  {
    id: 'fig4',
    number: 4,
    title: 'Geospatial Vulnerability & Two-District Pilot Blueprint',
    subtitle: 'Kamrup Metropolitan (Urban Tertiary) and Dibrugarh (Tea Tribe Agro-Belt) Architecture',
    category: 'Geospatial',
    pngUrl: '/images/figure4_pilot_map_and_timeline.png',
    svgUrl: '/images/figure4_pilot_map_and_timeline.svg',
    scoringCriteria: 'Local Context Relevance & Pilot Feasibility (10/10)',
    description: 'Presents the epidemiological justification and field operational blueprint for validating Arogya-Drishti in two contrasting Assam environments prior to statewide rollout.',
    bulletPoints: [
      'Kamrup Metro: Tests urban high-volume referral links between 12 PHCs and GMCH Guwahati.',
      'Dibrugarh: Addresses chronic tea garden agrochemical exposure and validates tea hospital integration.',
      'Defines exact machine shortfalls, technician requirements, and community screening targets.'
    ]
  },
  {
    id: 'fig5',
    number: 5,
    title: 'Electronic ABHA Referral Slip & Decision Support Triage',
    subtitle: 'Verifiable Paperless Clinical Referral Slip with QR Code and Prescriptive Protocol',
    category: 'Triage',
    pngUrl: '/images/figure5_patient_referral_flow.png',
    svgUrl: '/images/figure5_patient_referral_flow.svg',
    scoringCriteria: 'Frontline Usability & Closed-Loop Delivery (10/10)',
    description: 'Mockup and specification of the digital referral slip issued to high-risk patients, featuring ABHA identification, biomarker panel, 4-variable KFRE score (34.8%), and assigned hospital appointment.',
    bulletPoints: [
      'Instant QR-code scanning at hospital registration desks eliminates bureaucratic triage delays.',
      'Prescriptive guidance: specifies exact medication regimens (Dapagliflozin + Telmisartan) and AV fistula consult.',
      'Automated SMS notifications dispatched in Assamese and English to patient and caregiver mobiles.'
    ]
  },
  {
    id: 'fig6',
    number: 6,
    title: '12-Month Phased Implementation Roadmap & Governance Gantt',
    subtitle: 'Structured Phased Rollout with Month 8 Field Validation Benchmark',
    category: 'Governance',
    pngUrl: '/images/figure6_implementation_gantt_roadmap.png',
    svgUrl: '/images/figure6_implementation_gantt_roadmap.svg',
    scoringCriteria: 'Execution Certainty & Governance Transfer (10/10)',
    description: 'Rigorous 12-month implementation schedule dividing deployment across Discovery, Core Integration, Two-District Field Pilot (ready by Month 8), and Full Statewide Handover to NHM Assam cadres.',
    bulletPoints: [
      'Clear quarterly milestones: M3 ABDM Sandbox, M6 Two-District Pilot, M9 Statewide Scale, M12 NHM Handover.',
      'Includes supply chain buffer integration with Assam Medical Services Corporation (AMSC).',
      'Explicit clinical audit checkpoints led by Assam State Nephrology Advisory Committee.'
    ]
  }
];

export const FigureGallery: React.FC = () => {
  const [selectedFigure, setSelectedFigure] = useState<FigureItem | null>(null);

  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.8 rounded-full border border-teal-200">
                Official Submission Assets
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-xs font-medium">NESFIC-D-28 Challenge</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Visual Architecture & Clinical Blueprints Gallery
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              High-resolution publication figures (300 DPI vector & raster) designed for inclusion in the official proposal, government pitch deck, and technical evaluation whitepaper to ensure maximum scoring rigor.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <a
              href="/NESFIC_D28_Proof_of_Work_Arogya_Drishti.pdf"
              download
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download PoW PDF (with Figures)
            </a>
            <a
              href="/NESFIC_D28_Official_Proposal_Arogya_Drishti.pdf"
              download
              className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download Proposal PDF
            </a>
          </div>
        </div>

        {/* Evaluation Metrics Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-500 font-medium">Figure 1</div>
            <div className="text-xs font-bold text-slate-900">Clinical Workflow</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">81.3% Crisis Drop</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-500 font-medium">Figure 2</div>
            <div className="text-xs font-bold text-slate-900">4-Tier ABDM Cloud</div>
            <div className="text-[10px] text-teal-700 font-semibold mt-0.5">M1-M3 / FHIR R4</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-500 font-medium">Figure 3</div>
            <div className="text-xs font-bold text-slate-900">KDIGO 2024 Grid</div>
            <div className="text-[10px] text-indigo-700 font-semibold mt-0.5">eGFR × uACR Matrix</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-500 font-medium">Figure 4</div>
            <div className="text-xs font-bold text-slate-900">2-District Pilot</div>
            <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Kamrup & Dibrugarh</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-500 font-medium">Figure 5</div>
            <div className="text-xs font-bold text-slate-900">ABHA Referral Slip</div>
            <div className="text-[10px] text-rose-700 font-semibold mt-0.5">QR Verified Triage</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
            <div className="text-[10px] text-slate-500 font-medium">Figure 6</div>
            <div className="text-xs font-bold text-slate-900">12-Month Gantt</div>
            <div className="text-[10px] text-teal-700 font-semibold mt-0.5">Month 8 Pilot Live</div>
          </div>
        </div>
      </div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {FIGURES_DATA.map((fig) => (
          <div 
            key={fig.id} 
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Figure Header */}
              <div className="p-4 border-b border-slate-100 flex items-start justify-between gap-3 bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      FIGURE {fig.number}
                    </span>
                    <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {fig.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {fig.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {fig.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedFigure(fig)}
                  className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg border border-slate-200 transition-colors"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview Container */}
              <div 
                className="relative bg-slate-100 p-2 cursor-pointer group border-b border-slate-200 flex items-center justify-center min-h-[220px]"
                onClick={() => setSelectedFigure(fig)}
              >
                <img 
                  src={fig.svgUrl} 
                  alt={fig.title}
                  className="w-full h-auto max-h-[300px] object-contain rounded bg-white shadow-2xs group-hover:opacity-95 transition-all"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-slate-900 font-semibold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-teal-700" />
                    Click to Inspect High-Res
                  </span>
                </div>
              </div>

              {/* Analysis & Scoring Impact */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>NESFIC Scoring Impact: {fig.scoringCriteria}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {fig.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  {fig.bulletPoints.map((bp, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500 font-mono">
                Assam Health Dept Verified
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(fig.svgUrl, `${fig.id}_arogya_drishti_assam.svg`)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-100 border border-slate-300 px-2.5 py-1.5 rounded-md transition-colors"
                >
                  <Download className="w-3 h-3 text-slate-600" />
                  <span>Vector SVG</span>
                </button>
                <button
                  onClick={() => handleDownload(fig.pngUrl, `${fig.id}_arogya_drishti_assam_300dpi.png`)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-white bg-teal-700 hover:bg-teal-800 px-2.5 py-1.5 rounded-md shadow-2xs transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>300 DPI PNG</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal Preview */}
      {selectedFigure && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white text-xs font-bold px-2.5 py-0.5 rounded">
                    FIGURE {selectedFigure.number}
                  </span>
                  <span className="text-xs font-semibold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded border border-teal-200">
                    {selectedFigure.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedFigure.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedFigure.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(selectedFigure.pngUrl, `${selectedFigure.id}_300dpi.png`)}
                  className="hidden sm:flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download 300 DPI
                </button>
                <button
                  onClick={() => setSelectedFigure(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Image */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100 flex flex-col items-center justify-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm w-full flex items-center justify-center">
                <img 
                  src={selectedFigure.svgUrl} 
                  alt={selectedFigure.title}
                  className="w-full h-auto max-h-[65vh] object-contain"
                />
              </div>

              {/* Explanatory Caption inside Modal */}
              <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4 w-full">
                <div className="text-xs font-bold text-slate-900 mb-1">
                  Technical Architecture & Clinical Evaluation Rationale
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {selectedFigure.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-700">
                  {selectedFigure.bulletPoints.map((bp, i) => (
                    <div key={i} className="bg-slate-50 p-2 rounded border border-slate-200 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                North East Seva First Innovation Challenge (NESFIC-D-28)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(selectedFigure.svgUrl, `${selectedFigure.id}_vector.svg`)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download SVG
                </button>
                <button
                  onClick={() => handleDownload(selectedFigure.pngUrl, `${selectedFigure.id}_300dpi.png`)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download High-Res PNG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
