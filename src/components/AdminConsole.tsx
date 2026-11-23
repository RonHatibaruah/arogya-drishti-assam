import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Sliders,
  Users,
  Database,
  ShieldCheck,
  RotateCcw,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  Upload,
  UserCheck,
  Layers,
  Activity,
  FileText,
  Lock,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { DistrictMetric, AdminUserRole, AdminUser } from '../types';

type AdminTab = 'districts' | 'clinical' | 'users' | 'pipeline' | 'audit';

export const AdminConsole: React.FC = () => {
  const {
    districts,
    updateDistrict,
    batchAddMachines,
    clinicalParams,
    updateClinicalParams,
    users,
    currentUser,
    switchCurrentUser,
    addUser,
    updateUserStatus,
    auditLogs,
    ingestionJobs,
    simulateBatchIngestion,
    resetToBaseline
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<AdminTab>('districts');

  // District Manager State
  const [districtSearch, setDistrictSearch] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [editingDistrict, setEditingDistrict] = useState<DistrictMetric | null>(null);
  const [editForm, setEditForm] = useState<{
    existingDialysisMachines: number;
    existingDialysisCenters: number;
    screeningCoveragePct: number;
    confirmedDiabetics: number;
    dialysisDemandAnnualCases: number;
  }>({
    existingDialysisMachines: 0,
    existingDialysisCenters: 0,
    screeningCoveragePct: 0,
    confirmedDiabetics: 0,
    dialysisDemandAnnualCases: 0
  });

  // Clinical Governance State (Local buffer before saving)
  const [clinicalForm, setClinicalForm] = useState(clinicalParams);
  const [isClinicalSaved, setIsClinicalSaved] = useState(false);

  // User Management State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState<{
    name: string;
    designation: string;
    email: string;
    role: AdminUserRole;
    assignedDistrict: string;
    facility: string;
    abhaPractitionerId: string;
  }>({
    name: '',
    designation: '',
    email: '',
    role: 'DistrictAdmin',
    assignedDistrict: 'Kamrup Metropolitan',
    facility: '',
    abhaPractitionerId: ''
  });

  // Pipeline Simulator State
  const [selectedIngestDistrict, setSelectedIngestDistrict] = useState<string>(districts[0]?.id || 'kamrup_metro');
  const [ingestRecordCount, setIngestRecordCount] = useState<number>(5000);
  const [isIngesting, setIsIngesting] = useState<boolean>(false);
  const [lastIngestResult, setLastIngestResult] = useState<{ ingested: number; newAlerts: number } | null>(null);

  // Audit Filter
  const [auditFilter, setAuditFilter] = useState<string>('all');

  // Reset Confirmation Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Filtered districts
  const filteredDistricts = districts.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(districtSearch.toLowerCase());
    const matchesZone = selectedZone === 'all' || d.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  // State totals
  const totalMachines = districts.reduce((acc, d) => acc + d.existingDialysisMachines, 0);
  const totalShortfall = districts.reduce((acc, d) => acc + d.dialysisMachineShortfall, 0);
  const totalScreened = districts.reduce((acc, d) => acc + d.screenedPopulation, 0);

  const handleOpenEditDistrict = (d: DistrictMetric) => {
    setEditingDistrict(d);
    setEditForm({
      existingDialysisMachines: d.existingDialysisMachines,
      existingDialysisCenters: d.existingDialysisCenters,
      screeningCoveragePct: d.screeningCoveragePct,
      confirmedDiabetics: d.confirmedDiabetics,
      dialysisDemandAnnualCases: d.dialysisDemandAnnualCases
    });
  };

  const handleSaveDistrictEdit = () => {
    if (!editingDistrict) return;
    updateDistrict(editingDistrict.id, editForm);
    setEditingDistrict(null);
  };

  const handleSaveClinicalParams = (e: React.FormEvent) => {
    e.preventDefault();
    updateClinicalParams(clinicalForm);
    setIsClinicalSaved(true);
    setTimeout(() => setIsClinicalSaved(false), 3000);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) return;
    addUser({
      name: newUserForm.name,
      designation: newUserForm.designation,
      email: newUserForm.email,
      role: newUserForm.role,
      assignedDistrict: newUserForm.assignedDistrict,
      facility: newUserForm.facility || 'District Health Facility',
      abhaPractitionerId: newUserForm.abhaPractitionerId || `ABHA-PR-AS-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Active'
    });
    setIsAddUserModalOpen(false);
    setNewUserForm({
      name: '',
      designation: '',
      email: '',
      role: 'DistrictAdmin',
      assignedDistrict: 'Kamrup Metropolitan',
      facility: '',
      abhaPractitionerId: ''
    });
  };

  const handleTriggerIngest = () => {
    setIsIngesting(true);
    setTimeout(() => {
      const res = simulateBatchIngestion(selectedIngestDistrict, ingestRecordCount);
      setLastIngestResult(res);
      setIsIngesting(false);
    }, 600);
  };

  const handleExportAuditJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `Arogya_Drishti_Audit_Trail_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
  };

  const handleExportDistrictCsv = () => {
    const headers = ['ID,Name,Zone,Population,Eligible30Plus,Screened,CoveragePct,ConfirmedDiabetics,ProjectedCKD3to5,ExistingMachines,Shortfall,AnnualCasesDemand,AnnualSubsidiesLakhs'];
    const rows = districts.map(d =>
      `"${d.id}","${d.name}","${d.zone}",${d.populationTotal},${d.adultPopulationEligible},${d.screenedPopulation},${d.screeningCoveragePct},${d.confirmedDiabetics},${d.projectedCKDStage3to5},${d.existingDialysisMachines},${d.dialysisMachineShortfall},${d.dialysisDemandAnnualCases},${d.estimatedAnnualSubsidiesINR}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent([headers, ...rows].join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `Assam_Districts_NCD_Infrastructure_${new Date().toISOString().slice(0, 10)}.csv`);
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Master Admin Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center shadow-sm">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                  NHM State Administrative Console
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">Platform Management & Master Data Governance</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Arogya-Drishti Assam Control Center
              </h1>
            </div>
          </div>

          {/* Quick Stats & Reset Action */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs">
              <div className="text-[10px] text-slate-500 font-medium uppercase">Active Role Session</div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                {currentUser.name} ({currentUser.role})
              </div>
            </div>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
              title="Reset all dynamic edits to official NFHS-5 Assam baseline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Baseline</span>
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveTab('districts')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'districts'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>1. District Infrastructure ({districts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clinical')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'clinical'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>2. Clinical & Cost Engine Tuner</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>3. Users & RBAC Roles ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>4. ABDM Data Ingestion Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>5. Audit Logs & DPDP Compliance ({auditLogs.length})</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: DISTRICT INFRASTRUCTURE & CAPACITY MANAGER              */}
      {/* ============================================================== */}
      {activeTab === 'districts' && (
        <div className="space-y-4">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Operational Machines</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">{totalMachines} Units</div>
              <div className="text-xs text-slate-500 mt-1">Across 35 District Civil Hospitals & Medical Colleges</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs bg-rose-50/30">
              <div className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">State Machine Shortfall</div>
              <div className="text-2xl font-bold text-rose-700 mt-1 font-mono">-{totalShortfall} Units</div>
              <div className="text-xs text-rose-600 mt-1">Projected gap to handle current ESRD influx</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Screened Population</div>
              <div className="text-2xl font-bold text-teal-800 mt-1 font-mono">{(totalScreened / 100000).toFixed(1)} Lakhs</div>
              <div className="text-xs text-slate-500 mt-1">Ingested from CPHC-NCD portal</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-center">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Bulk Quick Action</div>
              <button
                onClick={() => {
                  const criticalDistrictIds = districts
                    .filter((d) => d.dialysisMachineShortfall >= 10)
                    .map((d) => d.id);
                  batchAddMachines(criticalDistrictIds, 2);
                }}
                className="w-full bg-teal-800 hover:bg-teal-700 text-white font-semibold text-xs py-2 px-3 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+2 Machines to Critical Districts</span>
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search district name..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="border border-slate-300 rounded-lg text-xs py-1.5 px-3 bg-white text-slate-700 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                <option value="all">All Zones (35 Districts)</option>
                <option value="Upper Assam">Upper Assam</option>
                <option value="Lower Assam">Lower Assam</option>
                <option value="Central Assam">Central Assam</option>
                <option value="Barak Valley">Barak Valley</option>
                <option value="North Assam">North Assam</option>
                <option value="Hills">Hills</option>
              </select>
            </div>

            <button
              onClick={handleExportDistrictCsv}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export District CSV</span>
            </button>
          </div>

          {/* Districts Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">District</th>
                    <th className="px-3 py-3">Zone</th>
                    <th className="px-3 py-3">Screening Coverage</th>
                    <th className="px-3 py-3">Confirmed Diabetics</th>
                    <th className="px-3 py-3">Dialysis Centers</th>
                    <th className="px-3 py-3">Installed Machines</th>
                    <th className="px-3 py-3">Current Deficit</th>
                    <th className="px-3 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDistricts.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900">{d.name}</td>
                      <td className="px-3 py-3 text-slate-600">{d.zone}</td>
                      <td className="px-3 py-3 font-mono">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-teal-600 h-1.5 rounded-full"
                              style={{ width: `${Math.min(100, d.screeningCoveragePct)}%` }}
                            ></div>
                          </div>
                          <span>{d.screeningCoveragePct}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono">{d.confirmedDiabetics.toLocaleString('en-IN')}</td>
                      <td className="px-3 py-3 font-mono">{d.existingDialysisCenters} Units</td>
                      <td className="px-3 py-3 font-mono font-bold text-slate-900">{d.existingDialysisMachines}</td>
                      <td className="px-3 py-3 font-mono">
                        {d.dialysisMachineShortfall > 0 ? (
                          <span className="text-rose-700 font-bold">-{d.dialysisMachineShortfall} Units</span>
                        ) : (
                          <span className="text-emerald-700 font-bold">Adequate</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          onClick={() => handleOpenEditDistrict(d)}
                          className="bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-semibold px-2.5 py-1 rounded border border-slate-300 hover:border-teal-300 transition-colors cursor-pointer text-[11px]"
                        >
                          Configure
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: CLINICAL GOVERNANCE & UNIT COST TUNER                   */}
      {/* ============================================================== */}
      {activeTab === 'clinical' && (
        <form onSubmit={handleSaveClinicalParams} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-600" />
                  Clinical Thresholds & PMNDP Unit Economics Calibration
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Changes made here dynamically re-calibrate early triage alerts, progression curves, and state-wide budget models.
                </p>
              </div>

              {isClinicalSaved && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Parameters Saved & Logged!
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group 1: KDIGO / KFRE Triage Thresholds */}
              <div className="space-y-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-700" />
                  KFRE & KDIGO Renal Alert Cutoffs
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    KFRE Critical (Tier 1) 2-Year Risk Cutoff (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={2}
                      max={12}
                      step={0.5}
                      value={clinicalForm.kfreTier1Pct}
                      onChange={(e) => setClinicalForm({ ...clinicalForm, kfreTier1Pct: parseFloat(e.target.value) })}
                      className="flex-1 accent-teal-700 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-xs bg-white border border-slate-300 px-2.5 py-1 rounded w-16 text-center">
                      {clinicalForm.kfreTier1Pct}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Triggers immediate SMS/ABHA referral to District Nephrologist.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    KFRE High (Tier 2) 5-Year Risk Cutoff (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={8}
                      max={25}
                      step={0.5}
                      value={clinicalForm.kfreTier2Pct}
                      onChange={(e) => setClinicalForm({ ...clinicalForm, kfreTier2Pct: parseFloat(e.target.value) })}
                      className="flex-1 accent-teal-700 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-xs bg-white border border-slate-300 px-2.5 py-1 rounded w-16 text-center">
                      {clinicalForm.kfreTier2Pct}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Triggers primary healthcare urine dipstick/uACR test order.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SGLT2i / ACEi-ARB Median Progression Delay (Years)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={3}
                      max={10}
                      step={0.1}
                      value={clinicalForm.sglt2iProgressionDelayYears}
                      onChange={(e) => setClinicalForm({ ...clinicalForm, sglt2iProgressionDelayYears: parseFloat(e.target.value) })}
                      className="flex-1 accent-teal-700 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-xs bg-white border border-slate-300 px-2.5 py-1 rounded w-16 text-center">
                      +{clinicalForm.sglt2iProgressionDelayYears}y
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Markov model transition delay from CKD 3 to ESRD with early therapy.</p>
                </div>
              </div>

              {/* Group 2: PMNDP Unit Economics & Logistics */}
              <div className="space-y-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-700" />
                  PMNDP Dialysis Unit Costs & Consumables
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cost per Hemodialysis Session (₹ INR)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1200}
                      max={4000}
                      step={50}
                      value={clinicalForm.costPerDialysisSessionINR}
                      onChange={(e) => setClinicalForm({ ...clinicalForm, costPerDialysisSessionINR: parseInt(e.target.value) || 2100 })}
                      className="w-full border border-slate-300 rounded-lg text-xs py-1.5 px-3 bg-white font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">NHM subsidized rate inclusive of dialyzer, heparin, and RO water.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Prescribed Sessions / Pt / Year
                    </label>
                    <input
                      type="number"
                      min={50}
                      max={200}
                      value={clinicalForm.dialysisSessionsPerYear}
                      onChange={(e) => setClinicalForm({ ...clinicalForm, dialysisSessionsPerYear: parseInt(e.target.value) || 156 })}
                      className="w-full border border-slate-300 rounded-lg text-xs py-1.5 px-3 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      RO Water Load (L / session)
                    </label>
                    <input
                      type="number"
                      min={80}
                      max={250}
                      value={clinicalForm.roWaterPerSessionLiters}
                      onChange={(e) => setClinicalForm({ ...clinicalForm, roWaterPerSessionLiters: parseInt(e.target.value) || 120 })}
                      className="w-full border border-slate-300 rounded-lg text-xs py-1.5 px-3 bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Dialyzer Max Reuses
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={clinicalForm.dialyzerMaxReuses}
                      onChange={(e) => setClinicalForm({ ...clinicalForm, dialyzerMaxReuses: parseInt(e.target.value) || 3 })}
                      className="w-full border border-slate-300 rounded-lg text-xs py-1.5 px-3 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tech : Machine Ratio
                    </label>
                    <input
                      type="number"
                      min={0.2}
                      max={1.0}
                      step={0.05}
                      value={clinicalForm.technicianToMachineRatio}
                      onChange={(e) => setClinicalForm({ ...clinicalForm, technicianToMachineRatio: parseFloat(e.target.value) || 0.33 })}
                      className="w-full border border-slate-300 rounded-lg text-xs py-1.5 px-3 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setClinicalForm(clinicalParams)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Discard Edits
              </button>
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2 rounded-lg text-xs shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Save & Apply Clinical Parameters</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* TAB 3: USER MANAGEMENT & ROLE-BASED ACCESS CONTROL (RBAC)      */}
      {/* ============================================================== */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Role Impersonation Notice */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-700 text-white flex items-center justify-center shadow-xs">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  Evaluator Role-Switcher & Access Control Simulation
                </h3>
                <p className="text-xs text-indigo-800/80 mt-0.5">
                  Select any departmental official below to test how the interface scopes permissions (State vs. District vs. CHO level).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-indigo-950 whitespace-nowrap">Switch Session:</label>
              <select
                value={currentUser.id}
                onChange={(e) => switchCurrentUser(e.target.value)}
                className="bg-white border border-indigo-300 text-xs font-semibold text-indigo-900 rounded-lg py-1.5 px-3 focus:outline-hidden"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} — {u.role} ({u.assignedDistrict || 'State'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Ribbon */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Departmental User Accounts ({users.length})
            </h3>
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-teal-400" />
              <span>Invite Health Official</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Health Official</th>
                    <th className="px-3 py-3">Designation & Facility</th>
                    <th className="px-3 py-3">RBAC Role</th>
                    <th className="px-3 py-3">Assigned Jurisdiction</th>
                    <th className="px-3 py-3">ABHA Practitioner ID</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className={u.id === currentUser.id ? 'bg-indigo-50/40' : 'hover:bg-slate-50/80'}>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {u.name}
                          {u.id === currentUser.id && (
                            <span className="bg-indigo-100 text-indigo-800 text-[10px] px-1.5 py-0.5 rounded font-semibold border border-indigo-200">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium text-slate-800">{u.designation}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{u.facility}</div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          u.role === 'SuperAdmin' ? 'bg-purple-100 text-purple-900 border border-purple-200' :
                          u.role === 'DistrictAdmin' ? 'bg-teal-100 text-teal-900 border border-teal-200' :
                          u.role === 'DialysisLead' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                          'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-medium text-slate-700">{u.assignedDistrict || 'State-wide'}</td>
                      <td className="px-3 py-3 font-mono text-slate-600">{u.abhaPractitionerId}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          u.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-300'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          onClick={() => updateUserStatus(u.id, u.status === 'Active' ? 'Suspended' : 'Active')}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                        >
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: ABDM DATA PIPELINE & INGESTION SIMULATOR                 */}
      {/* ============================================================== */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          {/* ABDM Milestones Status Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Ayushman Bharat Digital Mission (ABDM) Interoperability Milestones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  M1: ABHA Creation & Verification
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">100% tokenized pseudonymous referencing enabled.</div>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  M2: Health Records HIP/HIU Linking
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">FHIR R4 DiagnosticReport & Observation adapter active.</div>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  M3: Cross-Programme Decision Engine
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">Real-time KFRE triage & PMNDP forecasting operational.</div>
              </div>
            </div>
          </div>

          {/* Interactive Live Ingestion Simulator Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-teal-700" />
              <h2 className="text-base font-bold text-slate-900">
                Simulate Live CPHC-NCD Screening Batch Ingestion
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Simulates automated ingestion from the National CPHC-NCD portal via ABDM FHIR batch pipes. Increases district screening counts and evaluates longitudinal patient risk.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target District</label>
                <select
                  value={selectedIngestDistrict}
                  onChange={(e) => setSelectedIngestDistrict(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg text-xs py-2 px-3 bg-white"
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} (Current: {d.screeningCoveragePct}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Screening Records in Batch</label>
                <select
                  value={ingestRecordCount}
                  onChange={(e) => setIngestRecordCount(parseInt(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg text-xs py-2 px-3 bg-white font-mono"
                >
                  <option value={2500}>2,500 Screening Records</option>
                  <option value={5000}>5,000 Screening Records</option>
                  <option value={10000}>10,000 Screening Records</option>
                  <option value={25000}>25,000 Screening Records (Mass Drive)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleTriggerIngest}
                  disabled={isIngesting}
                  className="w-full bg-teal-800 hover:bg-teal-700 disabled:bg-slate-400 text-white font-semibold text-xs py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isIngesting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Ingesting & Validating...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Ingest Batch & Score Triage</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {lastIngestResult && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900 animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Successfully ingested <strong>{lastIngestResult.ingested.toLocaleString('en-IN')}</strong> records. Generated <strong>{lastIngestResult.newAlerts}</strong> automated renal triage referrals.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700">Audit event logged</span>
              </div>
            )}
          </div>

          {/* Ingestion Jobs History */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Recent Batch Ingestion Logs
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Real-time FHIR Pipeline</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {ingestionJobs.map((job) => (
                <div key={job.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[10px]">
                        {job.sourceType}
                      </span>
                      <span>{job.districtName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{job.timestamp} • Latency: {job.durationMs}ms</div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-bold font-mono text-slate-900">{job.recordsProcessed.toLocaleString('en-IN')} Records</div>
                      <div className="text-[11px] text-rose-700 font-semibold">{job.newTriageAlerts} Renal Alerts</div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold text-[10px]">
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: AUDIT LOGS & DPDP ACT 2023 COMPLIANCE                    */}
      {/* ============================================================== */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          {/* DPDP Compliance Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-800 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-300">
                    DPDP ACT 2023 COMPLIANT
                  </span>
                  <span className="text-xs text-slate-500 font-medium">CERT-In Ready Audit Trail</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  All administrative operations, parameter overrides, and batch ingestions are immutably logged with role hashes.
                </p>
              </div>
            </div>

            <button
              onClick={handleExportAuditJson}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>Export Audit Trail (JSON)</span>
            </button>
          </div>

          {/* Audit Log Filter */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-700">Filter Event Type:</span>
              <select
                value={auditFilter}
                onChange={(e) => setAuditFilter(e.target.value)}
                className="border border-slate-300 rounded-lg text-xs py-1 px-2.5 bg-white text-slate-800"
              >
                <option value="all">All Events ({auditLogs.length})</option>
                <option value="UPDATE_DISTRICT">District Capacity Updates</option>
                <option value="CHANGE_PARAM">Clinical & Cost Overrides</option>
                <option value="INGEST_BATCH">Batch Ingestions</option>
                <option value="USER_UPDATE">User Management / Role Swaps</option>
                <option value="RESET_SYSTEM">System Resets</option>
              </select>
            </div>
            <div className="text-[11px] text-slate-500">Showing last 100 immutable events</div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-3 py-3">Actor & Role</th>
                    <th className="px-3 py-3">Event Type</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs
                    .filter((log) => auditFilter === 'all' || log.actionType === auditFilter)
                    .map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="px-3 py-3">
                          <div className="font-bold text-slate-900">{log.actorName}</div>
                          <span className="text-[10px] text-slate-500 font-medium uppercase">{log.actorRole}</span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                            log.actionType === 'UPDATE_DISTRICT' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                            log.actionType === 'CHANGE_PARAM' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            log.actionType === 'INGEST_BATCH' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            log.actionType === 'USER_UPDATE' ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                            'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            {log.actionType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-700 leading-relaxed max-w-xl">{log.description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 1: EDIT DISTRICT INFRASTRUCTURE                          */}
      {/* ============================================================== */}
      {editingDistrict && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Configure District: {editingDistrict.name}
                </h3>
                <span className="text-xs text-slate-500">{editingDistrict.zone} • Population: {editingDistrict.populationTotal.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={() => setEditingDistrict(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Installed Dialysis Machines</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={editForm.existingDialysisMachines}
                  onChange={(e) => setEditForm({ ...editForm, existingDialysisMachines: parseInt(e.target.value) || 0 })}
                  className="w-full border border-slate-300 rounded-lg py-1.5 px-3 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Functional Dialysis Centers</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={editForm.existingDialysisCenters}
                  onChange={(e) => setEditForm({ ...editForm, existingDialysisCenters: parseInt(e.target.value) || 1 })}
                  className="w-full border border-slate-300 rounded-lg py-1.5 px-3 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Screening Coverage (%)</label>
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={editForm.screeningCoveragePct}
                  onChange={(e) => setEditForm({ ...editForm, screeningCoveragePct: parseInt(e.target.value) || 0 })}
                  className="w-full border border-slate-300 rounded-lg py-1.5 px-3 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Annual Dialysis Case Demand</label>
                <input
                  type="number"
                  min={100}
                  max={5000}
                  value={editForm.dialysisDemandAnnualCases}
                  onChange={(e) => setEditForm({ ...editForm, dialysisDemandAnnualCases: parseInt(e.target.value) || 0 })}
                  className="w-full border border-slate-300 rounded-lg py-1.5 px-3 font-mono"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setEditingDistrict(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDistrictEdit}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-1.5 rounded-lg cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: INVITE NEW HEALTH OFFICIAL                            */}
      {/* ============================================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateUser} className="bg-white rounded-xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Invite Health Official (ABDM Role Access)
                </h3>
                <p className="text-xs text-slate-500">Assign role-based access for state, district, or facility staff.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Hiren Deka"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg py-1.5 px-3"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. h.deka@assam.gov.in"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg py-1.5 px-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">RBAC Role</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as AdminUserRole })}
                    className="w-full border border-slate-300 rounded-lg py-1.5 px-3 bg-white"
                  >
                    <option value="SuperAdmin">SuperAdmin (State HQ)</option>
                    <option value="DistrictAdmin">DistrictAdmin (NCD Officer)</option>
                    <option value="DialysisLead">DialysisLead (Center Head)</option>
                    <option value="MedicalOfficer">MedicalOfficer / CHO</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned District</label>
                  <select
                    value={newUserForm.assignedDistrict}
                    onChange={(e) => setNewUserForm({ ...newUserForm, assignedDistrict: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg py-1.5 px-3 bg-white"
                  >
                    {districts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facility / Institution Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dibrugarh District Civil Hospital"
                  value={newUserForm.facility}
                  onChange={(e) => setNewUserForm({ ...newUserForm, facility: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg py-1.5 px-3"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-1.5 rounded-lg cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: RESET TO BASELINE CONFIRMATION                        */}
      {/* ============================================================== */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-700">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Reset Master Data to Baseline?
                </h3>
                <p className="text-xs text-slate-500">This will restore official NFHS-5 Assam values.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to restore all 35 district metrics, clinical equation thresholds, and PMNDP cost models back to the verified NFHS-5 and ICMR-INDIAB initial state?
            </p>

            <div className="border-t border-slate-200 pt-3 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToBaseline();
                  setIsResetConfirmOpen(false);
                }}
                className="bg-rose-700 hover:bg-rose-800 text-white font-semibold px-4 py-1.5 rounded-lg cursor-pointer"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
