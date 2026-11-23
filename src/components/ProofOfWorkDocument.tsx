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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              Official Proof of Work & Solution Evidence Document (PDF Ready)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Formatted to strict government whitepaper standards. Click "Print / Save as PDF" to generate the submission PDF.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-lg shadow-teal-950 transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Document Container */}
      <div className="bg-slate-900/90 text-slate-100 p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl space-y-10 max-w-5xl mx-auto print:bg-white print:text-slate-900 print:border-none print:shadow-none print:p-0 print:max-w-none">
        
        {/* DOCUMENT HEADER / COVER BANNER */}
        <div className="border-b-2 border-teal-500 pb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 print:text-slate-600 font-mono">
            <span>GOVERNMENT OF ASSAM • HEALTH & FAMILY WELFARE DEPARTMENT</span>
            <span>CHALLENGE TRACK: NESFIC-D-28</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0 print:bg-teal-700">
              AD
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white print:text-slate-900">
                আৰোগ্য-দৃষ্টি অসম (Arogya-Drishti Assam)
              </h1>
              <p className="text-sm font-semibold text-teal-400 print:text-teal-700 mt-0.5">
                Proof of Work, Technical Architecture & Clinical Evidence Whitepaper
              </p>
              <p className="text-xs text-slate-400 print:text-slate-500">
                Cross-Programme Non-Communicable Disease (NCD) & Renal-Cardiovascular Intelligence Platform
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-xs">
            <div className="bg-slate-950 print:bg-slate-100 p-2 rounded-lg border border-slate-800 print:border-slate-300">
              <span className="text-[10px] text-slate-400 print:text-slate-500 block">Department</span>
              <strong className="text-slate-200 print:text-slate-800">NHM Assam</strong>
            </div>
            <div className="bg-slate-950 print:bg-slate-100 p-2 rounded-lg border border-slate-800 print:border-slate-300">
              <span className="text-[10px] text-slate-400 print:text-slate-500 block">Platform State</span>
              <strong className="text-emerald-400 print:text-emerald-700 font-mono">MVP Operational</strong>
            </div>
            <div className="bg-slate-950 print:bg-slate-100 p-2 rounded-lg border border-slate-800 print:border-slate-300">
              <span className="text-[10px] text-slate-400 print:text-slate-500 block">Live URL</span>
              <a href="https://arogya-drishti-assam.pages.dev" className="text-teal-400 print:text-teal-700 underline truncate block font-mono">
                arogya-drishti-assam.pages.dev
              </a>
            </div>
            <div className="bg-slate-950 print:bg-slate-100 p-2 rounded-lg border border-slate-800 print:border-slate-300">
              <span className="text-[10px] text-slate-400 print:text-slate-500 block">Open Repository</span>
              <a href="https://github.com/RonHatibaruah/arogya-drishti-assam" className="text-teal-400 print:text-teal-700 underline truncate block font-mono">
                github.com/RonHatibaruah
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: THE CORE PROBLEM & CLOSED LOOP INFOGRAPHIC */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 print:bg-teal-100 print:text-teal-800 flex items-center justify-center font-bold text-xs">1</span>
            <h2 className="text-lg font-bold text-white print:text-slate-900">The Problem & The Arogya-Drishti Closed Loop</h2>
          </div>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
            While frontline health workers in Assam screen over 5.8 Lakh adults for Hypertension and Diabetes under the CPHC NP-NCD program, these records remain trapped in passive data silos. Patients silently progress through asymptomatic stages of Diabetic Nephropathy over 4 to 6 years, presenting only when kidneys fail irreversibly (CKD Stage 5 / ESRD). Arogya-Drishti closes this loop by connecting primary screening parameters to secondary renal triaging and predictive tertiary dialysis capacity planning.
          </p>

          {/* SVG Diagram: Broken Silo vs Closed Loop */}
          <div className="bg-slate-950 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-300">
            <div className="text-xs font-bold text-teal-300 print:text-teal-800 mb-3 uppercase tracking-wide">
              Figure 1: Current Broken Workflow vs. Arogya-Drishti Predictive Closed Loop
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Broken Silo */}
              <div className="border border-rose-900/40 bg-rose-950/20 print:bg-rose-50 print:border-rose-300 p-3.5 rounded-lg space-y-2">
                <span className="font-bold text-rose-400 print:text-rose-700 flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Current Broken Workflow (Reactive & Costly)
                </span>
                <div className="space-y-2 text-[11px] text-slate-300 print:text-slate-700">
                  <div className="p-2 bg-slate-900/60 print:bg-white rounded border border-rose-900/20">
                    <strong>1. ASHA Primary Screening:</strong> Logs BP (158/98) and RBS (230 mg/dL) on CPHC app.
                  </div>
                  <div className="p-2 bg-slate-900/60 print:bg-white rounded border border-rose-900/20">
                    <strong>2. Data Silo:</strong> Checklists stored in central database without automated progression alerts.
                  </div>
                  <div className="p-2 bg-slate-900/60 print:bg-white rounded border border-rose-900/20">
                    <strong>3. Silent Progression:</strong> Asymptomatic renal nephropathy worsens for 4-5 years undetected.
                  </div>
                  <div className="p-2 bg-slate-900/60 print:bg-white rounded border border-rose-900/20 text-rose-300 print:text-rose-800 font-medium">
                    <strong>4. Late Crisis Presentation:</strong> Patient arrives at GMCH with fluid overload; emergency dialysis needed (₹3.6 Lakhs/year/pt).
                  </div>
                </div>
              </div>

              {/* Connected Closed Loop */}
              <div className="border border-emerald-900/40 bg-emerald-950/20 print:bg-emerald-50 print:border-emerald-300 p-3.5 rounded-lg space-y-2">
                <span className="font-bold text-emerald-400 print:text-emerald-700 flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Arogya-Drishti Closed Loop (Predictive & Preventive)
                </span>
                <div className="space-y-2 text-[11px] text-slate-300 print:text-slate-700">
                  <div className="p-2 bg-slate-900/60 print:bg-white rounded border border-emerald-900/20">
                    <strong>1. Primary Ingestion:</strong> CPHC screening data ingested & normalized via FHIR R4.
                  </div>
                  <div className="p-2 bg-slate-900/60 print:bg-white rounded border border-emerald-900/20">
                    <strong>2. KFRE & KDIGO Trigger:</strong> Algorithm detects glycemic velocity and flags "Renal Vigilance Alert".
                  </div>
                  <div className="p-2 bg-slate-900/60 print:bg-white rounded border border-emerald-900/20">
                    <strong>3. Point-of-Care Urine Dipstick:</strong> CHO at Ayushman Arogya Mandir tests albuminuria; starts SGLT2i.
                  </div>
                  <div className="p-2 bg-slate-900/60 print:bg-white rounded border border-emerald-900/20 text-emerald-300 print:text-emerald-800 font-medium">
                    <strong>4. Dialysis Averted:</strong> Progression delayed by 7+ years; saving NHM Assam ₹18 Lakhs per patient.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-TIER ABDM ENTERPRISE ARCHITECTURE */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 print:bg-teal-100 print:text-teal-800 flex items-center justify-center font-bold text-xs">2</span>
            <h2 className="text-lg font-bold text-white print:text-slate-900">Solution & Enterprise Cloud Architecture</h2>
          </div>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
            The platform is built on a four-tier architecture complying with the Ayushman Bharat Digital Mission (ABDM) and the National Digital Health Blueprint (NDHB). It features a zero-knowledge de-identification gateway ensuring no patient PII is stored centrally.
          </p>

          {/* Architecture Visual Grid */}
          <div className="bg-slate-950 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-3">
            <div className="text-xs font-bold text-teal-300 print:text-teal-800 uppercase tracking-wide">
              Figure 2: 4-Tier Sovereign State Healthcare Architecture
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-slate-900 print:bg-white p-3 rounded-lg border border-slate-800 print:border-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-teal-400 print:text-teal-700">Tier 1: Ingestion</span>
                <p className="font-semibold text-slate-200 print:text-slate-800 text-[11px]">Primary Feeds</p>
                <ul className="text-[10px] text-slate-400 print:text-slate-600 list-disc list-inside">
                  <li>CPHC-NCD Screening</li>
                  <li>e-Sanjeevani Logs</li>
                  <li>HMIS Monthly Feeds</li>
                  <li>PMNDP Census</li>
                </ul>
              </div>

              <div className="bg-slate-900 print:bg-white p-3 rounded-lg border border-slate-800 print:border-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-400 print:text-purple-700">Tier 2: De-ID</span>
                <p className="font-semibold text-slate-200 print:text-slate-800 text-[11px]">Privacy Gateway</p>
                <ul className="text-[10px] text-slate-400 print:text-slate-600 list-disc list-inside">
                  <li>SHA-256 Pseudonyms</li>
                  <li>ABHA ID Tokenization</li>
                  <li>FHIR R4 Normalization</li>
                  <li>DPDP Act 2023 Rules</li>
                </ul>
              </div>

              <div className="bg-slate-900 print:bg-white p-3 rounded-lg border border-slate-800 print:border-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 print:text-amber-700">Tier 3: Core AI</span>
                <p className="font-semibold text-slate-200 print:text-slate-800 text-[11px]">Clinical Engines</p>
                <ul className="text-[10px] text-slate-400 print:text-slate-600 list-disc list-inside">
                  <li>KFRE 4-Variable Model</li>
                  <li>KDIGO 2024 Staging</li>
                  <li>Markov Cohort Sim</li>
                  <li>PMNDP Logistics Model</li>
                </ul>
              </div>

              <div className="bg-slate-900 print:bg-white p-3 rounded-lg border border-slate-800 print:border-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-700">Tier 4: Hosting</span>
                <p className="font-semibold text-slate-200 print:text-slate-800 text-[11px]">Sovereign Deployment</p>
                <ul className="text-[10px] text-slate-400 print:text-slate-600 list-disc list-inside">
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
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 print:bg-teal-100 print:text-teal-800 flex items-center justify-center font-bold text-xs">3</span>
            <h2 className="text-lg font-bold text-white print:text-slate-900">Clinical Risk Matrix & Algorithmic Validation</h2>
          </div>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
            The platform applies the international <strong>KDIGO 2024 Clinical Staging Grid</strong> and the validated <strong>Kidney Failure Risk Equation (KFRE)</strong> adapted for Indian phenotypes. The matrix maps eGFR against urine Albumin-to-Creatinine Ratio (uACR) or dipstick proteinuria to drive automated triage.
          </p>

          {/* KDIGO 2024 Table Visual */}
          <div className="bg-slate-950 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-2">
            <div className="text-xs font-bold text-teal-300 print:text-teal-800 uppercase tracking-wide">
              Table 1: KDIGO 2024 Clinical Heatmap Risk Matrix Implemented in Arogya-Drishti
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-600 text-[11px]">
                    <th className="p-2">eGFR (mL/min/1.73m²)</th>
                    <th className="p-2">A1: Normal (&lt;30 mg/g)</th>
                    <th className="p-2">A2: Microalbuminuria (30-300 mg/g)</th>
                    <th className="p-2">A3: Severe Proteinuria (&gt;300 mg/g)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-200 text-[11px]">
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-slate-800">G1: Normal (≥ 90)</td>
                    <td className="p-2 bg-emerald-950/40 print:bg-emerald-100 text-emerald-400 print:text-emerald-800 font-medium">Low Risk (Tier 4)</td>
                    <td className="p-2 bg-yellow-950/40 print:bg-yellow-100 text-yellow-400 print:text-yellow-800 font-medium">Moderate Risk (Tier 3)</td>
                    <td className="p-2 bg-amber-950/40 print:bg-amber-100 text-amber-400 print:text-amber-800 font-medium">High Risk (Tier 2)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-slate-800">G2: Mild (60–89)</td>
                    <td className="p-2 bg-emerald-950/40 print:bg-emerald-100 text-emerald-400 print:text-emerald-800 font-medium">Low Risk (Tier 4)</td>
                    <td className="p-2 bg-yellow-950/40 print:bg-yellow-100 text-yellow-400 print:text-yellow-800 font-medium">Moderate Risk (Tier 3)</td>
                    <td className="p-2 bg-amber-950/40 print:bg-amber-100 text-amber-400 print:text-amber-800 font-medium">High Risk (Tier 2)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-slate-800">G3a: Mild-Mod (45–59)</td>
                    <td className="p-2 bg-yellow-950/40 print:bg-yellow-100 text-yellow-400 print:text-yellow-800 font-medium">Moderate Risk (Tier 3)</td>
                    <td className="p-2 bg-amber-950/40 print:bg-amber-100 text-amber-400 print:text-amber-800 font-medium">High Risk (Tier 2)</td>
                    <td className="p-2 bg-rose-950/40 print:bg-rose-100 text-rose-400 print:text-rose-800 font-medium">Very High Risk (Tier 1)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-slate-800">G3b: Mod-Severe (30–44)</td>
                    <td className="p-2 bg-amber-950/40 print:bg-amber-100 text-amber-400 print:text-amber-800 font-medium">High Risk (Tier 2)</td>
                    <td className="p-2 bg-rose-950/40 print:bg-rose-100 text-rose-400 print:text-rose-800 font-medium">Very High Risk (Tier 1)</td>
                    <td className="p-2 bg-rose-950/60 print:bg-rose-200 text-rose-300 print:text-rose-900 font-bold">Critical (Tier 1 Urgent)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-slate-800">G4: Severe (15–29)</td>
                    <td className="p-2 bg-rose-950/40 print:bg-rose-100 text-rose-400 print:text-rose-800 font-medium">Very High Risk (Tier 1)</td>
                    <td className="p-2 bg-rose-950/60 print:bg-rose-200 text-rose-300 print:text-rose-900 font-bold">Critical (Tier 1 Urgent)</td>
                    <td className="p-2 bg-rose-950/80 print:bg-rose-300 text-rose-200 print:text-rose-950 font-extrabold">Emergency Dialysis Triage</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold text-slate-200 print:text-slate-800">G5: Kidney Failure (&lt;15)</td>
                    <td colSpan={3} className="p-2 bg-rose-950 print:bg-rose-300 text-rose-200 print:text-rose-950 font-extrabold text-center uppercase tracking-wider">
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
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 print:bg-teal-100 print:text-teal-800 flex items-center justify-center font-bold text-xs">4</span>
            <h2 className="text-lg font-bold text-white print:text-slate-900">Prototype Evidence & District Baseline Metrics</h2>
          </div>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
            Arogya-Drishti has been modeled using calibrated epidemiological constants from NFHS-5 Assam factsheets, ICMR-INDIAB, and NHM Assam CPHC operational outputs. The table below illustrates the cross-programmatic deficit calculations generated by the live prototype:
          </p>

          <div className="overflow-x-auto bg-slate-950 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-300">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-600 text-[11px]">
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
              <tbody className="divide-y divide-slate-800/60 print:divide-slate-200 text-[11px] text-slate-300 print:text-slate-800">
                {ASSAM_DISTRICTS.slice(0, 6).map((d) => (
                  <tr key={d.id}>
                    <td className="p-2 font-semibold text-white print:text-slate-900">{d.name}</td>
                    <td className="p-2 text-slate-400 print:text-slate-600">{d.zone}</td>
                    <td className="p-2 font-mono">{d.screeningCoveragePct}%</td>
                    <td className="p-2 font-mono text-amber-400 print:text-amber-700">{d.confirmedDiabetics.toLocaleString()}</td>
                    <td className="p-2 font-mono text-rose-400 print:text-rose-700 font-bold">{d.projectedCKDStage3to5.toLocaleString()}</td>
                    <td className="p-2 font-mono">{d.existingDialysisMachines} units</td>
                    <td className="p-2 font-mono text-rose-300 print:text-rose-800 font-bold">-{d.dialysisMachineShortfall}</td>
                    <td className="p-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        d.riskClassification === 'critical' ? 'bg-rose-500/20 text-rose-400 print:bg-rose-100 print:text-rose-800' :
                        d.riskClassification === 'high' ? 'bg-amber-500/20 text-amber-400 print:bg-amber-100 print:text-amber-800' :
                        'bg-emerald-500/20 text-emerald-400 print:bg-emerald-100 print:text-emerald-800'
                      }`}>
                        {d.riskClassification}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: PILOT VALIDATION PLAN (KAMRUP METRO & DIBRUGARH) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
            <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 print:bg-teal-100 print:text-teal-800 flex items-center justify-center font-bold text-xs">5</span>
            <h2 className="text-lg font-bold text-white print:text-slate-900">Field Pilot Validation Plan & Milestones</h2>
          </div>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
            The solution is scheduled for a 60-day field validation pilot across two contrasting demographic zones in Assam, achieving readiness for deployment at Month 8:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 print:bg-slate-50 p-3.5 rounded-xl border border-slate-800 print:border-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-300 print:text-teal-800">
                <MapPin className="w-4 h-4 text-teal-400" />
                Pilot District 1: Kamrup Metropolitan
              </div>
              <p className="text-[11px] text-slate-400 print:text-slate-600">
                Urban & peri-urban screening hub. Evaluates integration with tertiary nephrology at Gauhati Medical College & Hospital (GMCH) and high-volume urban PMNDP hemodialysis centers.
              </p>
            </div>

            <div className="bg-slate-950 print:bg-slate-50 p-3.5 rounded-xl border border-slate-800 print:border-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-300 print:text-teal-800">
                <MapPin className="w-4 h-4 text-teal-400" />
                Pilot District 2: Dibrugarh
              </div>
              <p className="text-[11px] text-slate-400 print:text-slate-600">
                Rural and tea-garden worker demographic. Evaluates frontline point-of-care microalbuminuria testing under rural primary health workflows and transit links to Assam Medical College (AMCH).
              </p>
            </div>
          </div>

          {/* Implementation Timeline Bar */}
          <div className="bg-slate-950 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-2 text-xs">
            <div className="text-xs font-bold text-teal-300 print:text-teal-800 uppercase tracking-wide">
              12-Month Project Implementation Schedule & Validation Gates
            </div>
            <div className="grid grid-cols-4 gap-2 text-[10px] text-center font-medium">
              <div className="bg-slate-900 print:bg-white p-2 rounded border border-slate-800 print:border-slate-300">
                <div className="font-bold text-teal-400 print:text-teal-700">Q1: Months 1–3</div>
                <div className="text-slate-400 print:text-slate-600 mt-1">Discovery & Clinical Calibration</div>
              </div>
              <div className="bg-slate-900 print:bg-white p-2 rounded border border-slate-800 print:border-slate-300">
                <div className="font-bold text-teal-400 print:text-teal-700">Q2: Months 4–6</div>
                <div className="text-slate-400 print:text-slate-600 mt-1">Core Modeling & FHIR Pipeline</div>
              </div>
              <div className="bg-teal-950/40 print:bg-teal-100 p-2 rounded border border-teal-800/60 print:border-teal-300">
                <div className="font-bold text-emerald-400 print:text-emerald-800">Q3: Months 7–9</div>
                <div className="text-slate-300 print:text-slate-700 mt-1">Ready for Validation (M8) & Pilot</div>
              </div>
              <div className="bg-slate-900 print:bg-white p-2 rounded border border-slate-800 print:border-slate-300">
                <div className="font-bold text-teal-400 print:text-teal-700">Q4: Months 10–12</div>
                <div className="text-slate-400 print:text-slate-600 mt-1">CERT-In Audit & State Handover</div>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENT FOOTER */}
        <div className="border-t border-slate-800 print:border-slate-300 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
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
