#!/usr/bin/env node

/**
 * Autonomous Gemini Pro 16:9 Technological Framework Infographic Generator
 * Uses Chrome DevTools Protocol (CDP) & Puppeteer on port 9222
 * Google Account: sumanzfilms@gmail.com
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const BASE_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(BASE_DIR, 'public', 'images');
const PORT = 9222;

const INFOGRAPHIC_PROMPTS = [
  {
    id: "figure1_workflow_comparison",
    title: "Clinical Workflow Transformation: Status Quo vs. Arogya-Drishti",
    filename: "figure1_workflow_comparison.png",
    prompt: "A master 16:9 widescreen technological architectural infographic on a clean white and light-gray blueprint grid background illustrating CLINICAL WORKFLOW TRANSFORMATION: CURRENT SILOED CARE VS AROGYA-DRISHTI CLOSED LOOP. The header features bold dark navy typography with subtitle Cross-Programme NCD & Renal-Cardiovascular Intelligence for Assam (NESFIC-D-28). The visual layout presents two horizontal comparative tracks: Top Track (Crimson/Slate): Current Fragmented Care (ASHA unlinked paper register -> Silent 5-year asymptomatic nephron collapse -> Emergency ICU crash presentation at GMCH -> Catastrophic ₹4.8L/year dialysis); Bottom Track (Teal/Emerald Green): Arogya-Drishti Closed Loop (e-Kavach ANMOL tablet screening with ABHA ID -> Automated 4-Variable KFRE risk trigger -> Point-of-care spot urine uACR dipstick -> Digital referral slip to MO-PHC with SGLT2i/Ramipril -> Pre-emptive PMNDP dialysis booking averting 81.3% of emergency crashes). Includes diagnostic metric badges: 81.3% ICU Admissions Averted, ₹18 Lakhs Lifetime Savings Per Patient, and 100% ABDM M1-M3 Compliance. Clean 2D flat vector aesthetic, royal blue, teal, emerald green, and crimson accents, ultra-sharp typography."
  },
  {
    id: "figure2_abdm_enterprise_architecture",
    title: "4-Tier Sovereign State Healthcare Cloud Architecture (ABDM Compliant)",
    filename: "figure2_abdm_enterprise_architecture.png",
    prompt: "An authoritative 16:9 widescreen technological enterprise cloud architecture infographic on a clean white blueprint background with subtle circuit gridlines illustrating AROGYA-DRISHTI: ABDM-COMPLIANT 4-TIER SOVEREIGN STATE HEALTHCARE CLOUD ARCHITECTURE. The header displays bold dark navy typography STATE DIGITAL HEALTH ENTERPRISE MESH FOR ASSAM with subtitle Multi-Tier Interoperability, Consent Management, and Edge Clinical AI. The graphic depicts 4 vertical or horizontal tiers: 1) Tier 1 (Slate Blue): Frontline Data Ingestion (e-Kavach, ANMOL, e-Sanjeevani, PHC semi-auto biochemistry analyzers, and PMNDP portal); 2) Tier 2 (Cyan / Sky Blue): Interoperability & Privacy Gateway (ABDM Gateway, ABHA ID Verification, FHIR R4 DiagnosticReport & Observation bundles, and SHA-256 zero-knowledge pseudonymization complying with DPDP Act 2023); 3) Tier 3 (Teal / Emerald): Predictive Analytics Core (Tangri 4-Variable KFRE engine, KDIGO 2024 staging, Markov multi-state progression simulator, and PMNDP capacity allocator); 4) Tier 4 (Dark Navy): Governance & Clinical Action Layer (State GIS Command Center at NHM Assam Directorate, District Dialysis Allocator, MO-PHC decision support, and Patient SMS referral slips). Clean 2D flat vector aesthetic, crisp lines, glowing data connectors, ultra-sharp typography."
  },
  {
    id: "figure3_kdigo_risk_heatmap",
    title: "KDIGO 2024 Clinical Prognosis Heatmap Matrix & Triage Protocols",
    filename: "figure3_kdigo_risk_heatmap.png",
    prompt: "A comprehensive 16:9 widescreen clinical matrix infographic on a clean white blueprint background illustrating KDIGO 2024 CLINICAL PROGNOSIS HEATMAP MATRIX & ASSAM CLINICAL ACTION PROTOCOL. The header displays bold dark navy typography CHRONIC KIDNEY DISEASE RISK STRATIFICATION MATRIX with subtitle Cross-Referencing eGFR and Persistent Albuminuria for Frontline Health Workers. The center presents a high-contrast clinical staging grid: Columns map Persistent Albuminuria (A1: Normal <30 mg/g, A2: Microalbuminuria 30-300 mg/g, A3: Severe Proteinuria >300 mg/g); Rows map eGFR filtration stages (G1 >=90, G2 60-89, G3a 45-59, G3b 30-44, G4 15-29, G5 <15 mL/min). Cells are color-coded in Emerald Green (Low Risk: Annual CPHC screen), Yellow (Moderate: Recheck in 6mo), Orange (High: Prescribe SGLT2i + ARB, e-Sanjeevani nephrology consult), and Deep Crimson (Very High / Failure: Immediate AV Fistula creation and pre-dialysis PMNDP reservation). Includes diagnostic callout boxes for KFRE equations and Assam SC-HWC standard operating procedures. Clean 2D flat vector aesthetic, crisp clinical borders, ultra-sharp typography."
  },
  {
    id: "figure4_pilot_map_and_timeline",
    title: "Geospatial Vulnerability Architecture & Two-District Pilot Blueprint",
    filename: "figure4_pilot_map_and_timeline.png",
    prompt: "A master 16:9 widescreen geospatial vulnerability and pilot deployment blueprint infographic on a clean white background with subtle topological gridlines illustrating GEOSPATIAL VULNERABILITY ARCHITECTURE & TWO-DISTRICT PILOT BLUEPRINT (ASSAM). The header displays bold dark navy typography ASSAM NCD & RENAL VULNERABILITY MAPPING with subtitle Targeted Field Validation in Kamrup Metropolitan and Dibrugarh Districts. The visual layout features an Assam state map highlighting 6 zones, spotlighting two contrasting pilot centers: 1) Pilot 1 (Teal Card): KAMRUP METROPOLITAN (Urban Tertiary Hub, 11.5L population, 34.2% HTN/DM burden, 1,280 active Stage 3-5 CKD cases, 48 dialysis stations, -14 machine deficit, 12-PHC referral loop to GMCH Guwahati); 2) Pilot 2 (Navy Card): DIBRUGARH (Upper Assam Tea Tribe Agro-Belt, 13.2L population, high pesticide and NSAID painkiller exposure, 1,140 active CKD cases, 32 dialysis stations, -12 machine deficit, tea garden hospital link to AMCH). Includes KPI badges: 48 HWC-ANMOL tablet kits, 2 Medical College nephrology hubs, and 60-day validation window. Clean 2D flat vector aesthetic, royal blue, teal, and crimson diagnostic accents."
  },
  {
    id: "figure5_patient_referral_flow",
    title: "Electronic ABHA Nephrology Referral Slip & Decision Support Triage",
    filename: "figure5_patient_referral_flow.png",
    prompt: "An authoritative 16:9 widescreen technological healthcare delivery infographic on a clean white background illustrating ELECTRONIC ABHA NEPHROLOGY REFERRAL SLIP & CLOSED-LOOP TRIAGE PASSPORT. The header features bold dark navy typography ZERO-PAPER CLINICAL REFERRAL & TRIAGE INFRASTRUCTURE with subtitle Frontline Ayushman Arogya Mandir to Tertiary Medical College Protocol. The center displays a detailed high-fidelity digital clinical referral slip mockup: Official Government of Assam and NHM header, Patient Barun Das (58/M, ABHA: 32-9481-2049-5819, Sonapur BPHC), recorded vitals (BP 152/94, HbA1c 8.6%, Serum Creatinine 2.6 mg/dL, eGFR 28 mL/min, uACR 420 mg/g). A highlighted alert badge displays: 4-VARIABLE KFRE SCORE: 34.8% (5-Year ESRD Progression Risk - CRITICAL ALERT). Below, automated clinical action protocols: 1) SGLT2i (Dapagliflozin 10mg) + Telmisartan 40mg prescription; 2) Fast-track GMCH Nephrology OPD slot (Room 104, Thursday 9:00 AM); 3) Vascular surgery AV fistula consult; 4) PMNDP pre-dialysis slot reservation. Flanked by an encrypted QR verification code and SMS dispatch indicator. Clean 2D flat vector aesthetic, crisp lines, emerald green, teal, and crimson diagnostic badges."
  },
  {
    id: "figure6_implementation_gantt_roadmap",
    title: "12-Month Phased Implementation Roadmap & Governance Gantt Chart",
    filename: "figure6_implementation_gantt_roadmap.png",
    prompt: "A master 16:9 widescreen institutional governance and engineering roadmap infographic on a clean white blueprint background illustrating 12-MONTH PHASED IMPLEMENTATION ROADMAP & GOVERNANCE GANTT CHART (NESFIC-D-28). The header displays bold dark navy typography ASSAM STATEWIDE DEPLOYMENT ROADMAP with subtitle Structured Execution Schedule and Month 8 Field Validation Benchmark. The layout features a 12-month timeline grid (M1 to M12) across four quarterly phases: Q1 (M1-M3: Discovery & ABDM Sandbox Integration); Q2 (M4-M6: Core Markov AI Engine & FHIR R4 Pipeline); Q3 (M7-M9: Two-District Field Pilot in Kamrup Metro & Dibrugarh - Ready for Validation at Month 8); Q4 (M10-M12: Statewide Scale-up across 35 Districts, AMSC Consumables Integration, and Full NHM Handover). Below the Gantt bars, four milestone verification checkpoint badges highlight: Checkpoint Alpha (M3 Ethics/Sandbox), Checkpoint Beta (M6 Pilot compliance >80%), Checkpoint Gamma (M9 20 Districts Live), and Handover (M12 State IT Cadre ownership). Clean 2D flat vector aesthetic, teal, indigo, and emerald green bars, ultra-sharp typography."
  },
  {
    id: "figure7_frontline_diagnostic_workflow",
    title: "Frontline ASHA & CHO Point-of-Care Diagnostic Workflow",
    filename: "figure7_frontline_diagnostic_workflow.png",
    prompt: "A visionary 16:9 widescreen technological healthcare delivery infographic on a clean white blueprint background illustrating FRONTLINE ASHA & CHO POINT-OF-CARE DIAGNOSTIC WORKFLOW (ASSAM CPHC). The header displays bold dark navy typography CLOSING THE PRIMARY HEALTHCARE SCREENING DIVIDE with subtitle Integrated Point-of-Care Renal Biomarker Ingestion at Ayushman Arogya Mandirs. The visual shows a 5-stage sequential clinical flow with sharp vector cards: 1) Community Doorstep Screening: ASHA worker with ANMOL/e-Kavach tablet conducting CBAC screening; 2) Sub-Centre HWC Biomarker Testing: CHO performing semi-quantitative urine dipstick uACR; 3) PHC Hub Biochemistry Link: Semi-automated clinical chemistry analyzer measuring serum creatinine and blood urea; 4) e-Sanjeevani Tele-Nephrology: CHO initiating real-time tele-consult with district medical officer; 5) Electronic Registry Sync: Immediate ABDM FHIR R4 bundle upload to state cloud. Clean 2D flat vector aesthetic, teal, cyan, and emerald green accents, ultra-sharp typography."
  },
  {
    id: "figure8_markov_disease_progression",
    title: "Markov Multi-State Disease Progression Model & SGLT2i Dynamics",
    filename: "figure8_markov_disease_progression.png",
    prompt: "An authoritative 16:9 widescreen clinical mathematical modeling infographic on a clean white blueprint background illustrating MARKOV MULTI-STATE DISEASE PROGRESSION MODEL & SGLT2I NEPHROPROTECTION DYNAMICS. The header displays bold dark navy typography MATHEMATICAL MODELING OF DIABETIC NEPHROPATHY IN ASSAM with subtitle Stochastic Markovian State Transitions and Pharmacological Delay Factors. The graphic depicts 5 discrete health states: S0 (Uncomplicated Type 2 Diabetes / HTN) -> S1 (Microalbuminuria / Early CKD G1-G2, A2) -> S2 (Macroalbuminuria / Moderate CKD G3a-G3b, A3) -> S3 (Severe Impairment G4) -> S4 (End-Stage Renal Disease G5 / Hemodialysis Dependency) and Absorbing State S5 (Cardiovascular Mortality). Arrows indicate annual transition probabilities lambda_ij calibrated to NFHS-5 Assam. A dual-track comparison demonstrates that early SGLT2i (Dapagliflozin) adherence delays transition to ESRD by an average of 7.2 years, reducing cohort dialysis entry rate by 41.6%. Clean 2D flat vector aesthetic, navy, purple, teal, and amber diagnostic badges, crisp mathematical notations."
  },
  {
    id: "figure9_pmndp_dialysis_supply_chain",
    title: "PMNDP Hemodialysis Logistics & Buffer Stock Supply Chain",
    filename: "figure9_pmndp_dialysis_supply_chain.png",
    prompt: "A master 16:9 widescreen industrial healthcare logistics and supply chain infographic on a clean white background illustrating PMNDP HEMODIALYSIS LOGISTICS & CONSUMABLES REVERSE-LOGISTICS BLUEPRINT. The header displays bold dark navy typography DIALYSIS OPERATIONS & BUFFER STOCK SUPPLY CHAIN FOR ASSAM with subtitle Engineering Sustainable Hemodialysis Across 35 District Civil Hospitals. The layout maps a 5-pillar supply chain network: 1) RO Water Purification Infrastructure: Dual-pass Reverse Osmosis plants delivering 85,200 Liters/day endotoxin-free water per 10-bed unit; 2) Hemodialysis Station Operations: 2-shift vs 3-shift machine duty cycles with bicarbonate concentrate lines; 3) Dialyzer Reprocessing & Tracking: Automated barcode tracking enforcing strict 6-reuse limits on high-flux F6/F7 dialyzers; 4) Pharmaceutical Cold-Chain: 2-8°C refrigerated logistics for Erythropoietin (EPO 4000 IU) and IV Iron; 5) Automated AMSC Replenishment: Real-time inventory telemetry triggering buffer restocks via Assam Medical Services Corporation. Clean 2D flat vector aesthetic, royal blue, teal, and amber accents."
  },
  {
    id: "figure10_health_economics_roi_waterfall",
    title: "State Macro-Fiscal Health Economics & ROI Waterfall",
    filename: "figure10_health_economics_roi_waterfall.png",
    prompt: "A comprehensive 16:9 widescreen health economics and public finance infographic on a clean white blueprint background illustrating MACRO-FISCAL HEALTH ECONOMICS & CATASTROPHIC OUT-OF-POCKET EXPENDITURE PREVENTION. The header displays bold dark navy typography FISCAL RETURN ON INVESTMENT: PREVENTIVE NCD SCREENING IN ASSAM with subtitle Cost-Benefit Analysis of Early CKD Case Identification Under PM-JAY and MMLSY. The visual presents a comparative financial waterfall: Left Panel (Cost of Inaction): Late-stage presentation requires emergency hemodialysis at ₹3.60 Lakhs per patient annually under government subsidies + catastrophic household OOP debt; Right Panel (Arogya-Drishti Preventive Model): Early detection cost (₹4,800/year for spot uACR dipstick, serum creatinine, and generic SGLT2i/Telmisartan). Center Waterfall Chart: For a cohort of 1,000 high-risk diabetic patients in Kamrup Metro, proactive intervention yields ₹4.26 Crores in net averted tertiary dialysis expenditures over 5 years, delivering a 4.2x Fiscal ROI Multiplier for NHM Assam. Clean 2D flat vector aesthetic, dark navy, emerald green, and gold diagnostic badges."
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAutomation() {
  console.log('=============================================================');
  console.log('🤖 AROGYA-DRISHTI ASSAM • GEMINI PRO 16:9 INFOGRAPHIC BOT');
  console.log('👤 Target Google Account : sumanzfilms@gmail.com');
  console.log('🔌 Chrome Remote Port    : 9222');
  console.log(`📁 Destination Assets    : ${OUTPUT_DIR}`);
  console.log(`📊 Total Infographics    : ${INFOGRAPHIC_PROMPTS.length}`);
  console.log('=============================================================\n');

  let browser;
  try {
    console.log(`⏳ Connecting to Chrome on http://127.0.0.1:${PORT}...`);
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${PORT}`,
      defaultViewport: null
    });
    console.log(`✅ Connected successfully to Google Chrome!`);
  } catch (err) {
    console.error(`❌ Could not connect to Chrome on port ${PORT}: ${err.message}`);
    process.exit(1);
  }

  const pages = await browser.pages();
  let geminiPage = pages.find(p => p.url().includes('gemini.google.com'));

  if (!geminiPage) {
    console.log(`🌐 Navigating to https://gemini.google.com/app...`);
    geminiPage = await browser.newPage();
    await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
  } else {
    console.log(`🌐 Found active Gemini tab: ${geminiPage.url()}`);
    await geminiPage.bringToFront();
  }

  await sleep(2000);

  for (let i = 0; i < INFOGRAPHIC_PROMPTS.length; i++) {
    const item = INFOGRAPHIC_PROMPTS[i];
    const targetPath = path.join(OUTPUT_DIR, item.filename);

    console.log(`\n-------------------------------------------------------------`);
    console.log(`[${i + 1}/${INFOGRAPHIC_PROMPTS.length}] 🎨 Generating: ${item.title}`);
    console.log(`   📄 Target File: ${item.filename}`);
    console.log(`-------------------------------------------------------------`);

    try {
      const existingImageUrls = await geminiPage.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean);
      });

      const fullPrompt = `Generate a high-quality 16:9 widescreen infographic image: ${item.prompt}`;

      await geminiPage.evaluate((text) => {
        const input = document.querySelector('rich-textarea p, rich-textarea div[contenteditable="true"], div[contenteditable="true"] p, div[contenteditable="true"], textarea');
        if (input) {
          input.focus();
          input.innerText = text;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, fullPrompt);

      await sleep(1000);

      const clicked = await geminiPage.evaluate(() => {
        const sendBtn = document.querySelector('button[aria-label="Send message"], button.send-button, mat-icon[data-mat-icon-name="send"]')?.closest('button');
        if (sendBtn && !sendBtn.disabled) {
          sendBtn.click();
          return true;
        }
        return false;
      });

      if (!clicked) {
        await geminiPage.keyboard.press('Enter');
      }

      console.log(`   📤 Prompt submitted to Gemini Pro. Awaiting Imagen 3 response...`);

      let imageBuffer = null;
      let waitCycles = 0;

      while (!imageBuffer && waitCycles < 25) {
        await sleep(3000);
        waitCycles++;

        const newImageData = await geminiPage.evaluate((existingUrls) => {
          const allImages = Array.from(document.querySelectorAll('img'));
          const candidates = allImages.filter(img => 
            img.src && 
            !existingUrls.includes(img.src) &&
            (img.src.includes('googleusercontent.com') || img.src.startsWith('blob:') || img.src.startsWith('data:image')) &&
            img.naturalWidth > 350
          );

          if (candidates.length > 0) {
            const latest = candidates[candidates.length - 1];
            return { src: latest.src, width: latest.naturalWidth, height: latest.naturalHeight };
          }
          return null;
        }, existingImageUrls);

        if (newImageData) {
          console.log(`   🖼️ Image detected in Gemini chat (${newImageData.width}x${newImageData.height})! Extracting base64...`);

          const base64Data = await geminiPage.evaluate((imgSrc) => {
            const img = Array.from(document.querySelectorAll('img')).find(i => i.src === imgSrc);
            if (!img || !img.complete || img.naturalWidth === 0) return null;
            try {
              const canvas = document.createElement('canvas');
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const dataUrl = canvas.toDataURL('image/png', 0.95);
              return dataUrl.split(',')[1];
            } catch (e) {
              return null;
            }
          }, newImageData.src);

          if (base64Data) {
            imageBuffer = Buffer.from(base64Data, 'base64');
          }
        }
      }

      if (imageBuffer) {
        fs.writeFileSync(targetPath, imageBuffer);
        console.log(`   ✅ Saved image to: ${targetPath} (${Math.round(imageBuffer.length / 1024)} KB)`);
      } else {
        console.log(`   ⚠️ Gemini did not return a generated image within timeout for ${item.id}. Will keep existing/rendered vector asset.`);
      }

      await sleep(2000);

    } catch (err) {
      console.error(`   ❌ Error generating ${item.id}:`, err.message);
    }
  }

  console.log(`\n🎉 Infographic automation completed!`);
}

runAutomation();
