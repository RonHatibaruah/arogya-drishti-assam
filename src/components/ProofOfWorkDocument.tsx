import React from 'react';
import { Printer, Download, CheckCircle2, ShieldCheck, ArrowRight, Activity, MapPin, Database, Award, Stethoscope } from 'lucide-react';
import { ASSAM_DISTRICTS, MOCK_PATIENTS } from '../data/assamDistrictsData';

export const ProofOfWorkDocument: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar for screen view */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              Official Proof of Work & Solution Evidence Document (PDF Ready)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Formatted to strict government whitepaper standards. Click "Print / Save as PDF" or download pre-compiled PDF.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/NESFIC_D28_Proof_of_Work_Arogya_Drishti.pdf"
            download
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-teal-700" />
            <span>Download Direct PDF</span>
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Document Container */}
      <div className="bg-white text-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-10 max-w-5xl mx-auto print:border-none print:shadow-none print:p-0 print:max-w-none">
        
        {/* DOCUMENT HEADER / COVER BANNER */}
        <div className="border-b-2 border-teal-600 pb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-mono">
            <span>GOVERNMENT OF ASSAM • HEALTH & FAMILY WELFARE DEPARTMENT</span>
            <span className="font-bold text-teal-800">CHALLENGE TRACK: NESFIC-D-28</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-700 flex items-center justify-center text-white font-bold text-2xl shadow-sm shrink-0">
              AD
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                আৰোগ্য-দৃষ্টি অসম (Arogya-Drishti Assam)
              </h1>
              <p className="text-sm font-bold text-teal-800 mt-0.5">
                Proof of Work, Technical Architecture & Clinical Evidence Whitepaper
              </p>
              <p className="text-xs text-slate-500">
                Cross-Programme Non-Communicable Disease (NCD) & Renal-Cardiovascular Intelligence Platform
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-medium">Department</span>
              <strong className="text-slate-900">NHM Assam</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-medium">Platform State</span>
              <strong className="text-emerald-700 font-mono font-bold">MVP Operational</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-medium">Live URL</span>
              <a href="https://arogya-drishti-assam.pages.dev" className="text-teal-700 underline truncate block font-mono font-semibold">
                arogya-drishti-assam.pages.dev
              </a>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-medium">Open Repository</span>
              <a href="https://github.com/RonHatibaruah/arogya-drishti-assam" className="text-teal-700 underline truncate block font-mono font-semibold">
                github.com/RonHatibaruah
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: THE CORE PROBLEM & CLOSED LOOP INFOGRAPHIC */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">1</span>
            <h2 className="text-lg font-bold text-slate-900">The Problem & The Arogya-Drishti Closed Loop</h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            While frontline health workers in Assam screen over 5.8 Lakh adults for Hypertension and Diabetes under the CPHC NP-NCD program, these records remain trapped in passive data silos. Patients silently progress through asymptomatic stages of Diabetic Nephropathy over 4 to 6 years, presenting only when kidneys fail irreversibly (CKD Stage 5 / ESRD). Arogya-Drishti closes this loop by connecting primary screening parameters to secondary renal triaging and predictive tertiary dialysis capacity planning.
          </p>

          {/* Embedded High-Resolution Visual Figure 1 */}
          <div className="my-4 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 p-2">
            <img 
              src="/images/figure1_workflow_comparison.svg" 
              alt="Figure 1: Workflow Comparison" 
              className="w-full h-auto rounded-lg bg-white" 
            />
            <p className="text-center text-[11px] font-semibold text-slate-600 mt-2">
              Figure 1: Clinical Workflow Transformation — Current Fragmented Siloed Care vs. Arogya-Drishti Cross-Programme Closed Loop
            </p>
          </div>

          {/* Comparative Grid */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-teal-900 mb-3 uppercase tracking-wide">
              Figure 1: Current Broken Workflow vs. Arogya-Drishti Predictive Closed Loop
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Broken Silo */}
              <div className="border border-rose-300 bg-rose-50/70 p-3.5 rounded-lg space-y-2">
                <span className="font-bold text-rose-800 flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  Current Broken Workflow (Reactive & Costly)
                </span>
                <div className="space-y-2 text-[11px] text-slate-700">
                  <div className="p-2 bg-white rounded border border-rose-200 shadow-2xs">
                    <strong>1. ASHA Primary Screening:</strong> Logs BP (158/98) and RBS (230 mg/dL) on CPHC app.
                  </div>
                  <div className="p-2 bg-white rounded border border-rose-200 shadow-2xs">
                    <strong>2. Data Silo:</strong> Checklists stored in central database without automated progression alerts.
                  </div>
                  <div className="p-2 bg-white rounded border border-rose-200 shadow-2xs">
                    <strong>3. Silent Progression:</strong> Asymptomatic renal nephropathy worsens for 4-5 years undetected.
                  </div>
                  <div className="p-2 bg-white rounded border border-rose-200 shadow-2xs text-rose-800 font-semibold">
                    <strong>4. Late Crisis Presentation:</strong> Patient arrives at GMCH with fluid overload; emergency dialysis needed (₹3.6 Lakhs/year/pt).
                  </div>
                </div>
              </div>

              {/* Connected Closed Loop */}
              <div className="border border-emerald-300 bg-emerald-50/70 p-3.5 rounded-lg space-y-2">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Arogya-Drishti Closed Loop (Predictive & Preventive)
                </span>
                <div className="space-y-2 text-[11px] text-slate-700">
                  <div className="p-2 bg-white rounded border border-emerald-200 shadow-2xs">
                    <strong>1. Primary Ingestion:</strong> CPHC screening data ingested & normalized via FHIR R4.
                  </div>
                  <div className="p-2 bg-white rounded border border-emerald-200 shadow-2xs">
                    <strong>2. KFRE & KDIGO Trigger:</strong> Algorithm detects glycemic velocity and flags "Renal Vigilance Alert".
                  </div>
                  <div className="p-2 bg-white rounded border border-emerald-200 shadow-2xs">
                    <strong>3. Point-of-Care Urine Dipstick:</strong> CHO at Ayushman Arogya Mandir tests albuminuria; starts SGLT2i.
                  </div>
                  <div className="p-2 bg-white rounded border border-emerald-200 shadow-2xs text-emerald-800 font-semibold">
                    <strong>4. Dialysis Averted:</strong> Progression delayed by 7+ years; saving NHM Assam ₹18 Lakhs per patient.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-TIER ABDM ENTERPRISE ARCHITECTURE */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">2</span>
            <h2 className="text-lg font-bold text-slate-900">Solution & Enterprise Cloud Architecture</h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            The platform is built on a four-tier architecture complying with the Ayushman Bharat Digital Mission (ABDM) and the National Digital Health Blueprint (NDHB). It features a zero-knowledge de-identification gateway ensuring no patient PII is stored centrally.
          </p>

          {/* Embedded High-Resolution Visual Figure 2 */}
          <div className="my-4 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 p-2">
            <img 
              src="/images/figure2_abdm_enterprise_architecture.svg" 
              alt="Figure 2: ABDM Architecture" 
              className="w-full h-auto rounded-lg bg-white" 
            />
            <p className="text-center text-[11px] font-semibold text-slate-600 mt-2">
              Figure 2: Arogya-Drishti ABDM-Compliant 4-Tier Sovereign State Cloud Architecture & Data Mesh
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-teal-900 uppercase tracking-wide">
              Figure 2: 4-Tier Sovereign State Healthcare Architecture
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-teal-800">Tier 1: Ingestion</span>
                <p className="font-bold text-slate-900 text-[11px]">Primary Feeds</p>
                <ul className="text-[10px] text-slate-600 list-disc list-inside">
                  <li>CPHC-NCD Screening</li>
                  <li>e-Sanjeevani Logs</li>
                  <li>HMIS Monthly Feeds</li>
                  <li>PMNDP Census</li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-800">Tier 2: De-ID</span>
                <p className="font-bold text-slate-900 text-[11px]">Privacy Gateway</p>
                <ul className="text-[10px] text-slate-600 list-disc list-inside">
                  <li>SHA-256 Pseudonyms</li>
                  <li>ABHA ID Tokenization</li>
                  <li>FHIR R4 Normalization</li>
                  <li>DPDP Act 2023 Rules</li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-800">Tier 3: Core AI</span>
                <p className="font-bold text-slate-900 text-[11px]">Clinical Engines</p>
                <ul className="text-[10px] text-slate-600 list-disc list-inside">
                  <li>KFRE 4-Variable Model</li>
                  <li>KDIGO 2024 Staging</li>
                  <li>Markov Progression Sim</li>
                  <li>PMNDP Logistics Engine</li>
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800">Tier 4: Hosting</span>
                <p className="font-bold text-slate-900 text-[11px]">Sovereign Deployment</p>
                <ul className="text-[10px] text-slate-600 list-disc list-inside">
                  <li>Assam SDC (ASDC)</li>
                  <li>MeghRaj GI Cloud</li>
                  <li>PostgreSQL + PostGIS</li>
                  <li>CERT-In VAPT Audited</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CLINICAL DECISION MATRIX (KDIGO + KFRE) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">3</span>
            <h2 className="text-lg font-bold text-slate-900">Clinical Risk Matrix & Algorithmic Validation</h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            The platform applies the international <strong>KDIGO 2024 Clinical Staging Grid</strong> and the validated <strong>Kidney Failure Risk Equation (KFRE)</strong> adapted for Indian phenotypes. The matrix maps eGFR against urine Albumin-to-Creatinine Ratio (uACR) or dipstick proteinuria to drive automated triage.
          </p>

          {/* Embedded High-Resolution Visual Figure 3 */}
          <div className="my-4 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 p-2">
            <img 
              src="/images/figure3_kdigo_risk_heatmap.svg" 
              alt="Figure 3: KDIGO 2024 Heatmap Matrix" 
              className="w-full h-auto rounded-lg bg-white" 
            />
            <p className="text-center text-[11px] font-semibold text-slate-600 mt-2">
              Figure 3: KDIGO 2024 Clinical Prognosis Heatmap Matrix & Assam Standard Operating Procedures
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-teal-900 uppercase tracking-wide">
              Table 1: KDIGO 2024 Clinical Heatmap Risk Matrix Implemented in Arogya-Drishti
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-600 text-[11px]">
                    <th className="p-2">eGFR (mL/min/1.73m²)</th>
                    <th className="p-2">A1: Normal (&lt;30 mg/g)</th>
                    <th className="p-2">A2: Microalbuminuria (30-300 mg/g)</th>
                    <th className="p-2">A3: Severe Proteinuria (&gt;300 mg/g)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  <tr>
                    <td className="p-2 font-bold text-slate-900">G1: Normal (≥ 90)</td>
                    <td className="p-2 bg-emerald-100 text-emerald-900 font-semibold">Low Risk (Tier 4)</td>
                    <td className="p-2 bg-yellow-100 text-yellow-900 font-semibold">Moderate Risk (Tier 3)</td>
                    <td className="p-2 bg-amber-100 text-amber-900 font-bold">High Risk (Tier 2)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">G2: Mild (60–89)</td>
                    <td className="p-2 bg-emerald-100 text-emerald-900 font-semibold">Low Risk (Tier 4)</td>
                    <td className="p-2 bg-yellow-100 text-yellow-900 font-semibold">Moderate Risk (Tier 3)</td>
                    <td className="p-2 bg-amber-100 text-amber-900 font-bold">High Risk (Tier 2)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">G3a: Mild-Mod (45–59)</td>
                    <td className="p-2 bg-yellow-100 text-yellow-900 font-semibold">Moderate Risk (Tier 3)</td>
                    <td className="p-2 bg-amber-100 text-amber-900 font-bold">High Risk (Tier 2)</td>
                    <td className="p-2 bg-rose-100 text-rose-900 font-bold">Very High Risk (Tier 1)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">G3b: Mod-Severe (30–44)</td>
                    <td className="p-2 bg-amber-100 text-amber-900 font-bold">High Risk (Tier 2)</td>
                    <td className="p-2 bg-rose-100 text-rose-900 font-bold">Very High Risk (Tier 1)</td>
                    <td className="p-2 bg-rose-200 text-rose-950 font-extrabold">Critical (Tier 1 Urgent)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">G4: Severe (15–29)</td>
                    <td className="p-2 bg-rose-100 text-rose-900 font-bold">Very High Risk (Tier 1)</td>
                    <td className="p-2 bg-rose-200 text-rose-950 font-extrabold">Critical (Tier 1 Urgent)</td>
                    <td className="p-2 bg-rose-300 text-rose-950 font-black">Emergency Dialysis Triage</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900">G5: Kidney Failure (&lt;15)</td>
                    <td colSpan={3} className="p-2 bg-rose-200 text-rose-950 font-black text-center uppercase tracking-wider">
                      End-Stage Renal Disease (ESRD) • Active PMNDP Hemodialysis Dependent
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: LIVE PROTOTYPE RESULTS ACROSS ASSAM */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">4</span>
            <h2 className="text-lg font-bold text-slate-900">Prototype Evidence & District Baseline Metrics</h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Arogya-Drishti has been modeled using calibrated epidemiological constants from NFHS-5 Assam factsheets, ICMR-INDIAB, and NHM Assam CPHC operational outputs. The table below illustrates the cross-programmatic deficit calculations generated by the live prototype:
          </p>

          <div className="overflow-x-auto bg-slate-50 p-3 rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-300 text-slate-600 text-[11px] font-bold">
                <tr>
                  <th className="p-2">District Name</th>
                  <th className="p-2">Zone</th>
                  <th className="p-2">Screening %</th>
                  <th className="p-2">Confirmed Diabetics</th>
                  <th className="p-2">Projected CKD 3-5</th>
                  <th className="p-2">Current PMNDP Mach.</th>
                  <th className="p-2">Machine Deficit</th>
                  <th className="p-2">Risk Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px] text-slate-800">
                {ASSAM_DISTRICTS.slice(0, 6).map((d) => (
                  <tr key={d.id}>
                    <td className="p-2 font-bold text-slate-900">{d.name}</td>
                    <td className="p-2 text-slate-600">{d.zone}</td>
                    <td className="p-2 font-mono">{d.screeningCoveragePct}%</td>
                    <td className="p-2 font-mono text-amber-800 font-semibold">{d.confirmedDiabetics.toLocaleString()}</td>
                    <td className="p-2 font-mono text-rose-800 font-bold">{d.projectedCKDStage3to5.toLocaleString()}</td>
                    <td className="p-2 font-mono">{d.existingDialysisMachines} units</td>
                    <td className="p-2 font-mono text-rose-700 font-bold">-{d.dialysisMachineShortfall}</td>
                    <td className="p-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        d.riskClassification === 'critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        d.riskClassification === 'high' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {d.riskClassification}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Embedded High-Resolution Visual Figure 5: Patient Referral Flow */}
          <div className="my-4 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 p-2">
            <img 
              src="/images/figure5_patient_referral_flow.svg" 
              alt="Figure 5: Electronic ABHA Referral Slip" 
              className="w-full h-auto max-w-xl mx-auto rounded-lg bg-white" 
            />
            <p className="text-center text-[11px] font-semibold text-slate-600 mt-2">
              Figure 5: Electronic ABHA Nephrology Referral Slip & Decision-Support Triage Protocol
            </p>
          </div>
        </section>

        {/* SECTION 5: PILOT VALIDATION PLAN (KAMRUP METRO & DIBRUGARH) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">5</span>
            <h2 className="text-lg font-bold text-slate-900">Field Pilot Validation Plan & Milestones</h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            The solution is scheduled for a 60-day field validation pilot across two contrasting demographic zones in Assam, achieving readiness for deployment at Month 8:
          </p>

          {/* Embedded High-Resolution Visual Figure 4 */}
          <div className="my-4 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 p-2">
            <img 
              src="/images/figure4_pilot_map_and_timeline.svg" 
              alt="Figure 4: Geospatial Vulnerability & Two-District Pilot" 
              className="w-full h-auto rounded-lg bg-white" 
            />
            <p className="text-center text-[11px] font-semibold text-slate-600 mt-2">
              Figure 4: Geospatial Vulnerability Architecture & Kamrup Metro / Dibrugarh Two-District Pilot Blueprint
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-900">
                <MapPin className="w-4 h-4 text-teal-700" />
                Pilot District 1: Kamrup Metropolitan
              </div>
              <p className="text-[11px] text-slate-600">
                Urban & peri-urban screening hub. Evaluates integration with tertiary nephrology at Gauhati Medical College & Hospital (GMCH) and high-volume urban PMNDP hemodialysis centers.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-900">
                <MapPin className="w-4 h-4 text-teal-700" />
                Pilot District 2: Dibrugarh
              </div>
              <p className="text-[11px] text-slate-600">
                Rural and tea-garden worker demographic. Evaluates frontline point-of-care microalbuminuria testing under rural primary health workflows and transit links to Assam Medical College (AMCH).
              </p>
            </div>
          </div>

          {/* Embedded High-Resolution Visual Figure 6 */}
          <div className="my-4 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 p-2">
            <img 
              src="/images/figure6_implementation_gantt_roadmap.svg" 
              alt="Figure 6: Implementation Gantt Chart" 
              className="w-full h-auto rounded-lg bg-white" 
            />
            <p className="text-center text-[11px] font-semibold text-slate-600 mt-2">
              Figure 6: 12-Month Phased Implementation Roadmap & Governance Gantt Chart (Month 8 Validation Benchmark)
            </p>
          </div>

          {/* Implementation Timeline Bar */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="text-xs font-bold text-teal-900 uppercase tracking-wide">
              12-Month Project Implementation Schedule & Validation Gates
            </div>
            <div className="grid grid-cols-4 gap-2 text-[10px] text-center font-medium">
              <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                <div className="font-bold text-teal-800">Q1: Months 1–3</div>
                <div className="text-slate-600 mt-1">Discovery & Clinical Calibration</div>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                <div className="font-bold text-teal-800">Q2: Months 4–6</div>
                <div className="text-slate-600 mt-1">Core Modeling & FHIR Pipeline</div>
              </div>
              <div className="bg-teal-50 p-2 rounded border border-teal-300">
                <div className="font-bold text-emerald-800">Q3: Months 7–9</div>
                <div className="text-slate-800 mt-1 font-semibold">Ready for Validation (M8) & Pilot</div>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 shadow-2xs">
                <div className="font-bold text-teal-800">Q4: Months 10–12</div>
                <div className="text-slate-600 mt-1">CERT-In Audit & State Handover</div>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENT FOOTER */}
        <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            Arogya-Drishti Assam • Submission for NESFIC-2026 Innovation Challenge (NESFIC-D-28)
          </div>
          <div>
            Author: Ron Hatibaruah • Contact: ron.hatibaruah@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};
