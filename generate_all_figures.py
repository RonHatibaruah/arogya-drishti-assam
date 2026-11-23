import os
import numpy as np

os.environ['MPLCONFIGDIR'] = '/tmp/mpl_cache'
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Arrow
import matplotlib.patheffects as patheffects

OUTPUT_DIR = "public/images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Common styling
plt.rcParams['font.sans-serif'] = 'Helvetica, Arial, DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#cbd5e1'
plt.rcParams['axes.linewidth'] = 0.8

def save_dual(fig, base_name):
    png_path = os.path.join(OUTPUT_DIR, f"{base_name}.png")
    svg_path = os.path.join(OUTPUT_DIR, f"{base_name}.svg")
    fig.savefig(png_path, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    fig.savefig(svg_path, format='svg', bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close(fig)
    print(f"Generated: {png_path} and {svg_path}")

# ==============================================================================
# FIGURE 1: WORKFLOW TRANSFORMATION (CURRENT VS AROGYA-DRISHTI)
# ==============================================================================
def create_figure1():
    fig = plt.figure(figsize=(14, 8), facecolor='#ffffff')
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 140)
    ax.set_ylim(0, 85)
    ax.axis('off')

    # Title & Header
    ax.text(70, 81, "CLINICAL WORKFLOW TRANSFORMATION: CURRENT SILOED CARE VS. AROGYA-DRISHTI", 
            ha='center', va='center', fontsize=16, fontweight='bold', color='#0f172a')
    ax.text(70, 77.5, "National Health Mission Assam • Challenge NESFIC-D-28: Cross-Programme NCD & Renal Care Integration", 
            ha='center', va='center', fontsize=11, fontweight='medium', color='#0f766e')

    # Top Section: Fragmented Care (Red / Grey)
    box_frag = FancyBboxPatch((4, 42), 132, 31, boxstyle="round,pad=1,rounding_size=2", 
                              facecolor='#fff5f5', edgecolor='#fecaca', linewidth=1.5)
    ax.add_patch(box_frag)

    ax.text(8, 70, "CURRENT SCENARIO: FRAGMENTED, UNLINKED NCD & DIALYSIS PATHWAY (STATUS QUO)", 
            ha='left', va='center', fontsize=11, fontweight='bold', color='#991b1b')

    frag_steps = [
        ("Step 1: Isolated Screening", "ASHA / CHO records BP & glucose in physical register\n• No digital linkage to district labs\n• Urine protein tests rarely done", 14),
        ("Step 2: Silent Progression", "Diabetic / Hypertensive patient remains unmonitored\n• Serum creatinine never checked\n• eGFR drops silently from G1 to G4", 41),
        ("Step 3: No Early Alert", "Zero risk scoring (No KFRE calculation)\n• No nephrology referral or SGLT2i\n• Silent loss of nephrons over 5-7 years", 68),
        ("Step 4: Emergency Crash", "Patient arrives in fluid overload & uremic encephalopathy\n• Emergency ICU admission at GMCH/AMCH\n• Crash central venous catheter insertion", 95),
        ("Step 5: Crisis Dialysis", "Urgent PMNDP hemodialysis with zero bed planning\n• ₹4.8 Lakhs/year catastrophic household expense\n• 42% 1-year mortality on emergency hemodialysis", 122)
    ]

    for title, desc, cx in frag_steps:
        box = FancyBboxPatch((cx - 11.5, 45), 23, 21, boxstyle="round,pad=0.6,rounding_size=1.5",
                             facecolor='#ffffff', edgecolor='#f87171', linewidth=1.2)
        ax.add_patch(box)
        ax.text(cx, 63, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#991b1b')
        ax.plot([cx - 9, cx + 9], [60.5, 60.5], color='#fca5a5', lw=1)
        ax.text(cx, 52.5, desc, ha='center', va='center', fontsize=7.2, color='#475569', linespacing=1.3)

    for i in range(len(frag_steps) - 1):
        x1 = frag_steps[i][2] + 11.5
        x2 = frag_steps[i+1][2] - 11.5
        ax.annotate("", xy=(x2, 55.5), xytext=(x1, 55.5),
                    arrowprops=dict(arrowstyle="->", color="#ef4444", lw=2, mutation_scale=15))

    # Bottom Section: Arogya-Drishti (Teal / Emerald)
    box_sol = FancyBboxPatch((4, 4), 132, 34, boxstyle="round,pad=1,rounding_size=2", 
                             facecolor='#f0fdfa', edgecolor='#99f6e4', linewidth=1.5)
    ax.add_patch(box_sol)

    ax.text(8, 35, "PROPOSED AROGYA-DRISHTI: CROSS-PROGRAMME CLOSED-LOOP CLINICAL INTELLIGENCE", 
            ha='left', va='center', fontsize=11, fontweight='bold', color='#0f766e')

    sol_steps = [
        ("1. CPHC & e-Kavach", "ASHA captures BP/sugar on ANMOL / e-Kavach with ABHA ID\n• Protocol prompts spot uACR dipstick\n• Instant FHIR R4 cloud sync", 14),
        ("2. Cloud KFRE Engine", "Automated 4-Variable KFRE score computed instantly\n• eGFR & uACR cross-indexed with KDIGO matrix\n• High-risk flag raised (Risk >15%)", 41),
        ("3. Digital Referral Slip", "Automated ABHA-linked referral with QR code\n• MO-PHC alerted with decision-support\n• Initiates Telmisartan + Dapagliflozin", 68),
        ("4. Predictive Dialysis", "Markov progression model forecasts ESKD trajectory\n• Pre-emptive AV fistula creation at DH/Medical College\n• Avoids emergency temporary catheter", 95),
        ("5. Scheduled PMNDP", "3-shift dialysis capacity dynamically allocated\n• Zero waitlist crash; consumable supply assured\n• 81.3% reduction in emergency admissions", 122)
    ]

    for title, desc, cx in sol_steps:
        box = FancyBboxPatch((cx - 11.5, 7), 23, 24, boxstyle="round,pad=0.6,rounding_size=1.5",
                             facecolor='#ffffff', edgecolor='#14b8a6', linewidth=1.2)
        ax.add_patch(box)
        ax.text(cx, 28, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#0f766e')
        ax.plot([cx - 9, cx + 9], [25.5, 25.5], color='#99f6e4', lw=1)
        ax.text(cx, 16.5, desc, ha='center', va='center', fontsize=7.2, color='#334155', linespacing=1.3)

    for i in range(len(sol_steps) - 1):
        x1 = sol_steps[i][2] + 11.5
        x2 = sol_steps[i+1][2] - 11.5
        ax.annotate("", xy=(x2, 19), xytext=(x1, 19),
                    arrowprops=dict(arrowstyle="->", color="#0d9488", lw=2.2, mutation_scale=15))

    save_dual(fig, "figure1_workflow_comparison")

# ==============================================================================
# FIGURE 2: ABDM 4-TIER ENTERPRISE CLOUD ARCHITECTURE
# ==============================================================================
def create_figure2():
    fig = plt.figure(figsize=(14, 9), facecolor='#ffffff')
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 140)
    ax.set_ylim(0, 90)
    ax.axis('off')

    # Header
    ax.text(70, 86.5, "AROGYA-DRISHTI: ABDM-COMPLIANT 4-TIER ENTERPRISE CLOUD ARCHITECTURE", 
            ha='center', va='center', fontsize=15, fontweight='bold', color='#0f172a')
    ax.text(70, 83, "Interoperable, Secure, and Scalable Digital Health Infrastructure for Assam", 
            ha='center', va='center', fontsize=10.5, color='#0f766e')

    tiers = [
        ("TIER 4: CLINICAL & GOVERNANCE ACTION LAYER", [
            ("State GIS Command Center", "NHM Assam NCD Directorate\n• 35-District surveillance\n• Machine deficit alerting"),
            ("District NCD Dialysis Planner", "District Hospital / CM&HO\n• 2-shift vs 3-shift optimizer\n• RO & consumable burn-rate"),
            ("PHC Clinical Decision Support", "Medical Officer Dashboard\n• Nephroprotection guidelines\n• Automated e-Prescription"),
            ("Patient M-Health & ABHA Slip", "Patient Smartphone / SMS\n• QR code referral verification\n• Assamese / Bengali alert")
        ], 63, '#0f172a', '#f8fafc', '#94a3b8'),

        ("TIER 3: PREDICTIVE ANALYTICS & CLINICAL AI ENGINE", [
            ("4-Variable KFRE Engine", "Validated Tangri et al. formula\n• Age, Sex, eGFR, uACR\n• 2-yr & 5-yr ESKD risk score"),
            ("Markov Multi-State Simulator", "Annual progression dynamics\n• State G1 -> G5 & Death\n• SGLT2i delay simulation"),
            ("PMNDP Capacity Forecaster", "Queuing theory & Poisson loads\n• Session duration (4 hrs)\n• Machine & staff requirement"),
            ("Supply Chain Buffer Model", "Dialyzer & Blood tubing line\n• Acid bicarbonate concentrates\n• Buffer stock risk index")
        ], 43, '#0f766e', '#f0fdfa', '#5eead4'),

        ("TIER 2: INTEROPERABILITY & CONSENT LAYER (ABDM GATEWAY)", [
            ("ABDM Milestone 1 (M1)", "ABHA ID Verification\n• Aadhaar & OTP validation\n• Demographic matching"),
            ("ABDM Milestone 2 (M2)", "FHIR R4 Bundle Ingestion\n• Observation (eGFR, uACR)\n• DiagnosticReport (Labs)"),
            ("ABDM Milestone 3 (M3)", "HIP / HIU Consent Manager\n• Patient-mediated data grant\n• End-to-end encrypted transfer"),
            ("Enterprise Data Mesh", "Kafka Event Streaming\n• PostgreSQL / TimescaleDB\n• ISO 27001 & DISHA Security")
        ], 23, '#0284c7', '#f0f9ff', '#7dd3fc'),

        ("TIER 1: FIELD DATA & CLINICAL INGESTION LAYER", [
            ("e-Kavach / ANMOL", "ASHA & CHO field app\n• Population-based screening\n• Non-communicable diseases"),
            ("e-Sanjeevani Tele-Consult", "CHO to Doctor tele-medicine\n• Specialty nephrology review\n• Digital clinical notes"),
            ("PHC / CHC Lab Analyzers", "Semi-auto biochemistry\n• Serum creatinine, urea\n• Urine Albumin Dipstick"),
            ("PMNDP National Portal", "Hemodialysis registry\n• Dialysis session logs\n• Machine serial number & status")
        ], 3, '#475569', '#f8fafc', '#cbd5e1')
    ]

    for title, cards, y_base, hdr_color, bg_color, border_color in tiers:
        # Outer container
        rect = FancyBboxPatch((4, y_base), 132, 17, boxstyle="round,pad=0.5,rounding_size=1.5",
                              facecolor=bg_color, edgecolor=border_color, linewidth=1.2)
        ax.add_patch(rect)
        
        # Header tag
        ax.text(8, y_base + 14.5, title, ha='left', va='center', fontsize=9.5, fontweight='bold', color=hdr_color)

        for idx, (c_title, c_sub) in enumerate(cards):
            cx = 10 + idx * 31.5
            c_box = FancyBboxPatch((cx, y_base + 1.8), 28.5, 10.5, boxstyle="round,pad=0.4,rounding_size=1",
                                   facecolor='#ffffff', edgecolor=border_color, linewidth=1)
            ax.add_patch(c_box)
            ax.text(cx + 14.25, y_base + 9.8, c_title, ha='center', va='center', fontsize=7.8, fontweight='bold', color='#1e293b')
            ax.text(cx + 14.25, y_base + 5.5, c_sub, ha='center', va='center', fontsize=6.8, color='#475569', linespacing=1.2)

    # Inter-tier connectors
    for y_arrow in [20.5, 40.5, 60.5]:
        ax.annotate("", xy=(70, y_arrow + 2.5), xytext=(70, y_arrow - 0.5),
                    arrowprops=dict(arrowstyle="<->", color="#0f766e", lw=2, mutation_scale=14))
        ax.text(73, y_arrow + 1, "Encrypted TLS 1.3 / FHIR R4 JSON", fontsize=6.8, color='#0f766e', fontweight='bold')

    save_dual(fig, "figure2_abdm_enterprise_architecture")

# ==============================================================================
# FIGURE 3: KDIGO 2024 CLINICAL PROGNOSIS HEATMAP MATRIX
# ==============================================================================
def create_figure3():
    fig = plt.figure(figsize=(13, 8.5), facecolor='#ffffff')
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 130)
    ax.set_ylim(0, 85)
    ax.axis('off')

    # Header
    ax.text(65, 81.5, "KDIGO 2024 CLINICAL PROGNOSIS MATRIX & ASSAM CLINICAL ACTION PROTOCOL", 
            ha='center', va='center', fontsize=15, fontweight='bold', color='#0f172a')
    ax.text(65, 78, "Stratification of Chronic Kidney Disease Progression Risk by eGFR and Albuminuria Categories", 
            ha='center', va='center', fontsize=10, color='#0f766e')

    # Matrix Headers
    ax.text(48, 73, "Persistent Albuminuria Categories, Description and Range (mg/g)", 
            ha='center', va='center', fontsize=10, fontweight='bold', color='#1e293b')

    cols = [
        ("A1: Normal to mildly increased", "< 30 mg/g", 30),
        ("A2: Moderately increased", "30 - 300 mg/g (Micro)", 65),
        ("A3: Severely increased", "> 300 mg/g (Macro)", 100)
    ]

    for title, rng, cx in cols:
        box = FancyBboxPatch((cx - 16, 65), 32, 6, boxstyle="round,pad=0.3,rounding_size=1",
                             facecolor='#f1f5f9', edgecolor='#cbd5e1', linewidth=1)
        ax.add_patch(box)
        ax.text(cx, 68.8, title, ha='center', va='center', fontsize=8, fontweight='bold', color='#1e293b')
        ax.text(cx, 66.2, rng, ha='center', va='center', fontsize=7.5, color='#64748b')

    # Left Column: eGFR Rows
    rows = [
        ("G1", "Normal or high", ">= 90", 57),
        ("G2", "Mildly decreased", "60 - 89", 48),
        ("G3a", "Mild-to-moderately decreased", "45 - 59", 39),
        ("G3b", "Moderately-to-severely decreased", "30 - 44", 30),
        ("G4", "Severely decreased", "15 - 29", 21),
        ("G5", "Kidney failure", "< 15", 12)
    ]

    for gid, desc, rng, y in rows:
        box = FancyBboxPatch((2, y - 4), 11, 8, boxstyle="round,pad=0.3,rounding_size=1",
                             facecolor='#0f172a', edgecolor='none')
        ax.add_patch(box)
        ax.text(7.5, y, gid, ha='center', va='center', fontsize=9.5, fontweight='bold', color='#ffffff')

        box_desc = FancyBboxPatch((13.5, y - 4), 16, 8, boxstyle="round,pad=0.3,rounding_size=1",
                                  facecolor='#f8fafc', edgecolor='#e2e8f0', linewidth=1)
        ax.add_patch(box_desc)
        ax.text(21.5, y + 1.2, desc, ha='center', va='center', fontsize=6.8, fontweight='bold', color='#334155')
        ax.text(21.5, y - 1.8, f"{rng} mL/min", ha='center', va='center', fontsize=6.8, color='#64748b')

    # Grid Cells (Color coded: Green, Yellow, Orange, Deep Red)
    grid_data = [
        # (row_idx, col_idx, risk_level, bg_color, border_color, text_color, protocol)
        # G1
        (0, 0, "Low Risk", "#dcfce7", "#86efac", "#166534", "Annual CPHC Screen"),
        (0, 1, "Moderate Risk", "#fef9c3", "#fde047", "#854d0e", "Repeat uACR in 6mo"),
        (0, 2, "High Risk", "#ffedd5", "#fdba74", "#9a3412", "ACEi/ARB + Nephro Rev"),
        # G2
        (1, 0, "Low Risk", "#dcfce7", "#86efac", "#166534", "Annual CPHC Screen"),
        (1, 1, "Moderate Risk", "#fef9c3", "#fde047", "#854d0e", "Screen every 6-12mo"),
        (1, 2, "High Risk", "#ffedd5", "#fdba74", "#9a3412", "ACEi/ARB + SGLT2i"),
        # G3a
        (2, 0, "Moderate Risk", "#fef9c3", "#fde047", "#854d0e", "Screen every 6mo"),
        (2, 1, "High Risk", "#ffedd5", "#fdba74", "#9a3412", "Nephro Consult (eSanjeevani)"),
        (2, 2, "Very High Risk", "#fee2e2", "#fca5a5", "#991b1b", "Urgent MO-PHC Action"),
        # G3b
        (3, 0, "High Risk", "#ffedd5", "#fdba74", "#9a3412", "Nephro Consult (DH/MedCol)"),
        (3, 1, "Very High Risk", "#fee2e2", "#fca5a5", "#991b1b", "KFRE 5-Yr Risk >15%"),
        (3, 2, "Very High Risk", "#fee2e2", "#fca5a5", "#991b1b", "Pre-dialysis Workup"),
        # G4
        (4, 0, "Very High Risk", "#fee2e2", "#fca5a5", "#991b1b", "Prepare AV Fistula"),
        (4, 1, "Very High Risk", "#fee2e2", "#fca5a5", "#991b1b", "KFRE Risk >30%"),
        (4, 2, "Very High Risk", "#fee2e2", "#fca5a5", "#991b1b", "Fast-track PMNDP Registry"),
        # G5
        (5, 0, "Kidney Failure", "#fee2e2", "#f87171", "#7f1d1d", "Immediate RRT / Dialysis"),
        (5, 1, "Kidney Failure", "#fee2e2", "#f87171", "#7f1d1d", "Urgent Hemodialysis"),
        (5, 2, "Kidney Failure", "#fee2e2", "#f87171", "#7f1d1d", "Tertiary Center Care")
    ]

    for r_idx, c_idx, level, bg, border, tc, proto in grid_data:
        y_center = rows[r_idx][3]
        x_center = cols[c_idx][2]
        cell = FancyBboxPatch((x_center - 15.5, y_center - 4), 31, 8, boxstyle="round,pad=0.2,rounding_size=1",
                              facecolor=bg, edgecolor=border, linewidth=1.2)
        ax.add_patch(cell)
        ax.text(x_center, y_center + 1.2, level, ha='center', va='center', fontsize=8, fontweight='bold', color=tc)
        ax.text(x_center, y_center - 1.8, proto, ha='center', va='center', fontsize=6.8, color=tc)

    # Legend at bottom
    ax.text(65, 4.5, "Protocol Key: Low Risk (Green: Screen yearly) • Moderate (Yellow: Re-check in 6mo) • High (Orange: Nephro consult & SGLT2i) • Very High (Red: AV Fistula & PMNDP reservation)",
            ha='center', va='center', fontsize=7.8, fontweight='bold', color='#334155')

    save_dual(fig, "figure3_kdigo_risk_heatmap")

# ==============================================================================
# FIGURE 4: ASSAM VULNERABILITY & TWO-DISTRICT PILOT BLUEPRINT
# ==============================================================================
def create_figure4():
    fig = plt.figure(figsize=(14, 8.5), facecolor='#ffffff')
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 140)
    ax.set_ylim(0, 85)
    ax.axis('off')

    # Header
    ax.text(70, 81.5, "GEOSPATIAL VULNERABILITY ARCHITECTURE & TWO-DISTRICT PILOT BLUEPRINT", 
            ha='center', va='center', fontsize=15, fontweight='bold', color='#0f172a')
    ax.text(70, 78, "Targeted Field Validation in Kamrup Metropolitan and Dibrugarh Districts (Assam)", 
            ha='center', va='center', fontsize=10.5, color='#0f766e')

    # Left Card: Pilot 1 - Kamrup Metropolitan
    p1 = FancyBboxPatch((6, 12), 60, 62, boxstyle="round,pad=0.8,rounding_size=2",
                        facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(p1)

    # P1 Header
    p1_hdr = FancyBboxPatch((8, 65), 56, 7, boxstyle="round,pad=0.4,rounding_size=1.2",
                            facecolor='#0f766e', edgecolor='none')
    ax.add_patch(p1_hdr)
    ax.text(36, 68.5, "PILOT DISTRICT 1: KAMRUP METROPOLITAN", ha='center', va='center', fontsize=10.5, fontweight='bold', color='#ffffff')

    ax.text(12, 61, "Characteristics: Urban & Peri-urban Tertiary Healthcare Hub", fontsize=8.5, fontweight='bold', color='#0f172a')
    ax.text(12, 58, "Tertiary Anchor: Gauhati Medical College & Hospital (GMCH)", fontsize=8, color='#0f766e', fontweight='medium')

    p1_metrics = [
        ("Total Population", "11.5 Lakhs (Census / NHM 2026)"),
        ("Adult HTN / DM Prevalence", "34.2% (Highest urban concentration)"),
        ("Identified CKD Stage 3-5", "1,280 Active Patients"),
        ("Operational PMNDP Stations", "48 Dialysis Stations (Across GMCH & DH)"),
        ("Current Station Load", "4.8 Sessions / Station / Day (Severe Strain)"),
        ("Simulated Machine Deficit", "+18 Additional Hemodialysis Machines Needed"),
        ("Primary Goal of Pilot", "Validate 12-PHC Digital Referral Loop to GMCH")
    ]

    for idx, (label, val) in enumerate(p1_metrics):
        y_pos = 53.5 - idx * 4.6
        ax.text(12, y_pos, f"• {label}:", fontsize=7.8, fontweight='bold', color='#334155')
        ax.text(38, y_pos, val, fontsize=7.8, color='#0f766e' if 'Goal' in label or 'Deficit' in label else '#475569')

    # Pilot 1 Action Plan Box
    ax.plot([10, 62], [18, 18], color='#cbd5e1', lw=1)
    ax.text(36, 15, "Deploy 48 HWC-ANMOL tablet kits • 12 Semi-auto PHC lab connectors", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#0f766e')

    # Right Card: Pilot 2 - Dibrugarh
    p2 = FancyBboxPatch((74, 12), 60, 62, boxstyle="round,pad=0.8,rounding_size=2",
                        facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(p2)

    # P2 Header
    p2_hdr = FancyBboxPatch((76, 65), 56, 7, boxstyle="round,pad=0.4,rounding_size=1.2",
                            facecolor='#1e293b', edgecolor='none')
    ax.add_patch(p2_hdr)
    ax.text(104, 68.5, "PILOT DISTRICT 2: DIBRUGARH (UPPER ASSAM)", ha='center', va='center', fontsize=10.5, fontweight='bold', color='#ffffff')

    ax.text(80, 61, "Characteristics: Tea Garden Community & Rural Agro-Ecosystem", fontsize=8.5, fontweight='bold', color='#0f172a')
    ax.text(80, 58, "Tertiary Anchor: Assam Medical College & Hospital (AMCH)", fontsize=8, color='#0f766e', fontweight='medium')

    p2_metrics = [
        ("Total Population", "13.2 Lakhs (Large Tea Tribe Population)"),
        ("Vulnerability Factor", "High agricultural pesticide & OTC NSAID use"),
        ("Identified CKD Stage 3-5", "1,140 Active Patients (High Late-Presentation)"),
        ("Operational PMNDP Stations", "32 Dialysis Stations (AMCH & Sub-divisional)"),
        ("Current Station Load", "4.2 Sessions / Station / Day"),
        ("Simulated Machine Deficit", "+14 Additional Hemodialysis Machines Needed"),
        ("Primary Goal of Pilot", "Bridge Tea Garden Hospital Labs to AMCH Network")
    ]

    for idx, (label, val) in enumerate(p2_metrics):
        y_pos = 53.5 - idx * 4.6
        ax.text(80, y_pos, f"• {label}:", fontsize=7.8, fontweight='bold', color='#334155')
        ax.text(106, y_pos, val, fontsize=7.8, color='#dc2626' if 'Vulnerability' in label or 'Deficit' in label else '#475569')

    # Pilot 2 Action Plan Box
    ax.plot([78, 130], [18, 18], color='#cbd5e1', lw=1)
    ax.text(104, 15, "Deploy Tea Garden Hospital Bridge • Portable Dipstick uACR in 36 HWCs", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1e293b')

    # Bottom Statewide Summary
    sum_box = FancyBboxPatch((6, 3), 128, 6.5, boxstyle="round,pad=0.4,rounding_size=1",
                             facecolor='#f0fdfa', edgecolor='#99f6e4', linewidth=1.2)
    ax.add_patch(sum_box)
    ax.text(70, 6.2, "Statewide Rollout Scope: Following 6-Month Pilot Validation, Arogya-Drishti scales across all 35 Districts of Assam covering 140+ PMNDP stations and 4,800+ Sub-Centers.",
            ha='center', va='center', fontsize=8, fontweight='bold', color='#0f766e')

    save_dual(fig, "figure4_pilot_map_and_timeline")

# ==============================================================================
# FIGURE 5: DIGITAL ABHA CLINICAL REFERRAL SLIP & TRIAGE
# ==============================================================================
def create_figure5():
    fig = plt.figure(figsize=(13, 8.5), facecolor='#ffffff')
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 130)
    ax.set_ylim(0, 85)
    ax.axis('off')

    # Outer Sheet Mockup (Paper style)
    slip = FancyBboxPatch((20, 4), 90, 77, boxstyle="round,pad=0.8,rounding_size=2",
                          facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(slip)

    # Govt Header inside slip
    ax.text(65, 77, "GOVERNMENT OF ASSAM • HEALTH & FAMILY WELFARE DEPARTMENT", 
            ha='center', va='center', fontsize=8, fontweight='bold', color='#64748b')
    ax.text(65, 74, "NATIONAL HEALTH MISSION ASSAM • CPHC-NCD REFERRAL NETWORK", 
            ha='center', va='center', fontsize=8.5, fontweight='bold', color='#0f766e')
    ax.text(65, 70.5, "ELECTRONIC NEPHROLOGY REFERRAL SLIP & TRIAGE PASSPORT", 
            ha='center', va='center', fontsize=12, fontweight='bold', color='#0f172a')

    ax.plot([25, 105], [68, 68], color='#e2e8f0', lw=1.2)

    # Demographics Row
    ax.text(26, 64.5, "Patient Name: Barun Das", fontsize=8.5, fontweight='bold', color='#1e293b')
    ax.text(60, 64.5, "Age / Sex: 58 Yrs / Male", fontsize=8.5, color='#334155')
    ax.text(86, 64.5, "ABHA: 32-9481-2049-5819", fontsize=8.5, fontweight='bold', color='#0f766e')

    ax.text(26, 61.5, "Origin Facility: Sonapur BPHC, Kamrup Metro", fontsize=8, color='#64748b')
    ax.text(60, 61.5, "Screening Date: 24-Nov-2026", fontsize=8, color='#64748b')
    ax.text(86, 61.5, "Referral ID: REF-2026-KM-0894", fontsize=8, color='#64748b')

    ax.plot([25, 105], [59, 59], color='#e2e8f0', lw=1)

    # Clinical Biomarkers Box
    bio_box = FancyBboxPatch((25, 45), 45, 12, boxstyle="round,pad=0.5,rounding_size=1",
                             facecolor='#f8fafc', edgecolor='#e2e8f0', linewidth=1)
    ax.add_patch(bio_box)
    ax.text(47.5, 54.5, "RECORDED CPHC BIOMARKERS", ha='center', va='center', fontsize=8, fontweight='bold', color='#0f172a')
    ax.text(28, 51.5, "• Serum Creatinine: 2.6 mg/dL", fontsize=7.5, color='#334155')
    ax.text(28, 48.5, "• eGFR (CKD-EPI): 28 mL/min/1.73m² (G4)", fontsize=7.5, fontweight='bold', color='#dc2626')
    ax.text(28, 45.5, "• Urine Albumin (uACR): 420 mg/g (A3)", fontsize=7.5, fontweight='bold', color='#dc2626')

    # Risk Score Alert Box (Right)
    risk_box = FancyBboxPatch((73, 45), 32, 12, boxstyle="round,pad=0.5,rounding_size=1",
                              facecolor='#fef2f2', edgecolor='#fecaca', linewidth=1.2)
    ax.add_patch(risk_box)
    ax.text(89, 54.5, "4-VARIABLE KFRE SCORE", ha='center', va='center', fontsize=8, fontweight='bold', color='#991b1b')
    ax.text(89, 50, "34.8%", ha='center', va='center', fontsize=18, fontweight='bold', color='#dc2626')
    ax.text(89, 45.8, "5-Year ESRD Progression Risk", ha='center', va='center', fontsize=6.8, color='#991b1b')

    # Clinical Guidance & Decision Support
    ax.text(26, 41, "AUTOMATED CLINICAL ACTION PROTOCOL (KDIGO 2024 / NHM ASSAM)", fontsize=8.5, fontweight='bold', color='#0f766e')

    actions = [
        ("1. Immediate Pharmacotherapy", "Prescribe SGLT2 inhibitor (Dapagliflozin 10mg) + ARB (Telmisartan 40mg). Repeat serum K+ in 7 days."),
        ("2. Fast-Track Nephrology Referral", "Direct appointment scheduled at GMCH Nephrology Clinic (Room 104, Thursday 9:00 AM)."),
        ("3. Pre-Emptive Vascular Access", "Refer to Vascular Surgery at Medical College for Left Radiocephalic AV Fistula assessment."),
        ("4. PMNDP Registry Reservation", "Pre-allocate backup hemodialysis slot at Sonapur SDH (Station #3, Shift 1) to prevent crisis ICU admission.")
    ]

    for idx, (act_title, act_desc) in enumerate(actions):
        y_act = 36 - idx * 4.2
        ax.text(26, y_act, act_title, fontsize=7.8, fontweight='bold', color='#1e293b')
        ax.text(26, y_act - 1.8, act_desc, fontsize=7.2, color='#475569')

    # Footer verification with QR Code placeholder
    ax.plot([25, 105], [17, 17], color='#e2e8f0', lw=1)

    qr_box = FancyBboxPatch((26, 6.5), 9, 9, boxstyle="round,pad=0.2,rounding_size=0.5",
                            facecolor='#0f172a', edgecolor='none')
    ax.add_patch(qr_box)
    ax.text(30.5, 11, "QR\nCODE", ha='center', va='center', fontsize=6, fontweight='bold', color='#ffffff')

    ax.text(38, 13.5, "ABDM Digital Signature Verified • Hash: a89f...389c", fontsize=7.2, fontweight='bold', color='#0f766e')
    ax.text(38, 10.5, "Scan at Hospital Registration Desk for Instant Zero-Paper Triage", fontsize=7, color='#64748b')
    ax.text(38, 7.5, "Patient SMS Dispatched in Assamese & English to Registered Mobile: +91 98******12", fontsize=6.8, color='#94a3b8')

    save_dual(fig, "figure5_patient_referral_flow")

# ==============================================================================
# FIGURE 6: 12-MONTH IMPLEMENTATION ROADMAP & GANTT CHART
# ==============================================================================
def create_figure6():
    fig = plt.figure(figsize=(14, 8), facecolor='#ffffff')
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 140)
    ax.set_ylim(0, 80)
    ax.axis('off')

    # Header
    ax.text(70, 76.5, "12-MONTH PHASED IMPLEMENTATION ROADMAP & GOVERNANCE GANTT CHART", 
            ha='center', va='center', fontsize=15, fontweight='bold', color='#0f172a')
    ax.text(70, 73, "North East Seva First Innovation Challenge (NESFIC-D-28) • NHM Assam Deployment Plan", 
            ha='center', va='center', fontsize=10, color='#0f766e')

    # Timeline Columns (M1 to M12)
    months = [f"Month {i}" for i in range(1, 13)]
    for idx, m_text in enumerate(months):
        x = 42 + idx * 8
        ax.text(x, 67, m_text, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#475569')
        ax.plot([x, x], [12, 65], color='#f1f5f9', lw=1, zorder=0)

    # Workstreams & Bars
    tasks = [
        ("1. Architecture & Sandbox Setup", 1, 3, "#0f766e", "ABDM M1-M3, FHIR R4 Bundles, e-Kavach API Sandbox, IRB Approval"),
        ("2. AI Engine & Algorithm Tuning", 2, 4, "#0d9488", "Assam cohort calibration for KFRE, Markov model parameterization"),
        ("3. Two-District Pilot Deployment", 4, 6, "#0284c7", "Kamrup Metro & Dibrugarh: 48 HWCs, 12 PHCs, GMCH & AMCH hubs"),
        ("4. Pilot Clinical Audit & Review", 6, 7, "#0369a1", "Nephrology committee audit, referral completion rate assessment"),
        ("5. Statewide Scale-up (35 Districts)", 7, 10, "#4f46e5", "Integration with all 140+ PMNDP stations across Assam"),
        ("6. Supply Chain & Consumable Link", 8, 11, "#7c3aed", "Buffer stock model linked to Assam Medical Services Corp (AMSC)"),
        ("7. NHM Full Handover & Governance", 10, 12, "#059669", "SOP institutionalization, technical training of state IT cadres")
    ]

    for idx, (name, start_m, end_m, color, milestone) in enumerate(tasks):
        y = 59 - idx * 7
        ax.text(4, y, name, ha='left', va='center', fontsize=8.2, fontweight='bold', color='#1e293b')
        
        # Draw Gantt bar
        x_start = 42 + (start_m - 1) * 8 - 3.5
        width = (end_m - start_m + 1) * 8
        bar = FancyBboxPatch((x_start, y - 2.2), width, 4.4, boxstyle="round,pad=0.2,rounding_size=1",
                             facecolor=color, edgecolor='none')
        ax.add_patch(bar)
        
        # Milestone text inside or beside bar
        ax.text(x_start + width / 2, y, f"M{start_m}-M{end_m}", ha='center', va='center', fontsize=7, fontweight='bold', color='#ffffff')
        ax.text(x_start + width + 2, y, milestone, ha='left', va='center', fontsize=6.5, color='#64748b')

    # Key Milestones Checkpoints at bottom
    ax.plot([4, 136], [10, 10], color='#cbd5e1', lw=1)
    
    checkpoints = [
        ("Checkpoint Alpha (M3)", "ABDM Sandbox Passed & State Health Ethics Clearance secured"),
        ("Checkpoint Beta (M6)", "Two-District Pilot complete; >80% referral compliance at GMCH/AMCH"),
        ("Checkpoint Gamma (M9)", "Statewide rollout in 20 Districts; Automated consumable replenishment live"),
        ("Final Handover (M12)", "Full NHM Assam operational ownership & open governance transfer")
    ]

    for idx, (cp_title, cp_desc) in enumerate(checkpoints):
        cx = 18 + idx * 32
        ax.text(cx, 6.5, cp_title, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#0f766e')
        ax.text(cx, 3.5, cp_desc, ha='center', va='center', fontsize=6.5, color='#475569')

    save_dual(fig, "figure6_implementation_gantt_roadmap")

if __name__ == "__main__":
    print("Generating all publication-grade figures...")
    create_figure1()
    create_figure2()
    create_figure3()
    create_figure4()
    create_figure5()
    create_figure6()
    print("All figures successfully created in public/images/")
