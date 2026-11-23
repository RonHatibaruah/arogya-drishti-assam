# আৰোগ্য-দৃষ্টি অসম (Arogya-Drishti Assam)
### Cross-Programme NCD & Renal-Cardiovascular Intelligence Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![ABDM](https://img.shields.io/badge/ABDM-FHIR%20R4%20Compliant-emerald.svg)](https://abdm.gov.in/)
[![Government of Assam](https://img.shields.io/badge/Govt%20of%20Assam-NHM%20Assam-blue.svg)](https://nhm.assam.gov.in/)
[![Challenge Track](https://img.shields.io/badge/NESFIC--2026-Track%20NESFIC--D--28-orange.svg)](https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-28)

**Arogya-Drishti Assam** is an enterprise-grade digital health and biostatistical intelligence platform developed for the **North East Seva First Innovation Challenge (NESFIC 2026)** under Problem Statement **NESFIC-D-28**: *Cross-Programme NCD Analytics for Better Planning and Case Identification*, Department of Health & Family Welfare / National Health Mission (NHM), Government of Assam.

---

## 🎯 The Core Problem & Innovation
Public health data currently operates in isolated silos:
1. **Primary NCD Screening (CPHC-NCD)** logs basic blood pressure and glucose checklists via ASHAs and ANMs.
2. **Tertiary Renal Care (PMNDP / Ayushman Asom)** manages dialysis units and ICU beds reactively after kidneys have permanently failed.

**Arogya-Drishti Assam** bridges this divide by mathematically coupling community screening records with validated clinical risk equations (**KDIGO 2024 matrix** and the **Kidney Failure Risk Equation - KFRE**). It predicts 1-, 3-, and 5-year Chronic Kidney Disease (CKD) progression, enabling **early microalbuminuria triage at Ayushman Arogya Mandirs (AAMs)** and **predictive hemodialysis capacity planning for district hospitals**.

---

## 🚀 Key Modules
1. **District Geospatial Command Observatory**: Real-time cross-programme analytics across all 35 Assam districts grouped by administrative zones (Upper, Lower, Central, Barak Valley, North, Hills).
2. **5-Year Cohort Progression Forecaster**: Markov state-transition simulation modeling disease velocity (Diabetic cohort $\rightarrow$ CKD Stage 1-2 $\rightarrow$ Stage 3a/3b $\rightarrow$ Stage 4 $\rightarrow$ Stage 5 ESRD).
3. **PMNDP Hemodialysis Capacity & Logistics Planner**: District-level forecasting for hemodialysis machines, 2-shift vs. 3-shift operational capacity, RO ultra-pure water demand (L/day), consumables (dialyzers, bloodlines, EPO), and technician headcount.
4. **Targeted Early Case Identification & Triage Hub**: Microalbuminuria detection with instant electronic ABDM Clinical Referral Slip generation and QR codes.
5. **Health Economics Policy Simulator**: "What-If" modeling tool allowing health leadership to calculate cases averted and financial subsidies saved under Ayushman Asom.
6. **Proposal & Proof of Work Hub**: Complete 12-section NESFIC proposal text strictly audited to $<500$ words per section.

---

## 🛠️ Tech Stack & Architecture
- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide Icons
- **Data Visualizations**: Recharts, SVG/Canvas GIS Mapping
- **Clinical Modeling**: Kidney Failure Risk Equation (KFRE), KDIGO 2024 Prognosis Heatmap, Multi-State Markov Chains
- **Interoperability**: Ayushman Bharat Digital Mission (ABDM) FHIR R4 schema compliance

---

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/RonHatibaruah/arogya-drishti-assam.git
cd arogya-drishti-assam

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` (or the assigned port) in your browser.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
Developed for the Government of Assam / National Health Mission (NHM).
