import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DistrictMetric,
  ClinicalGovernanceParams,
  AdminUser,
  AuditLogEntry,
  IngestionJob,
  AuditActionType
} from '../types';
import { ASSAM_DISTRICTS } from '../data/assamDistrictsData';

export const DEFAULT_CLINICAL_PARAMS: ClinicalGovernanceParams = {
  kfreTier1Pct: 5.0,
  kfreTier2Pct: 15.0,
  costPerDialysisSessionINR: 2100,
  dialysisSessionsPerYear: 156,
  roWaterPerSessionLiters: 120,
  dialyzerMaxReuses: 3,
  technicianToMachineRatio: 0.33,
  sglt2iProgressionDelayYears: 7.2
};

export const DEFAULT_USERS: AdminUser[] = [
  {
    id: 'usr_1',
    name: 'Dr. B. K. Sarma',
    designation: 'Mission Director & State NCD Division Lead',
    email: 'md-nhm@assam.gov.in',
    role: 'SuperAdmin',
    assignedDistrict: 'All Districts (State HQ)',
    facility: 'NHM State Secretariat, Saikia Commercial Complex, Guwahati',
    abhaPractitionerId: 'ABHA-PR-AS-001298',
    status: 'Active',
    lastLogin: 'Today, 08:45 AM'
  },
  {
    id: 'usr_2',
    name: 'Dr. R. Hazarika',
    designation: 'Joint Director of Health & District NCD Nodal Officer',
    email: 'ncd.kamrup@assam.gov.in',
    role: 'DistrictAdmin',
    assignedDistrict: 'Kamrup Metropolitan',
    facility: 'District Civil Hospital, Panbazar, Guwahati',
    abhaPractitionerId: 'ABHA-PR-AS-004512',
    status: 'Active',
    lastLogin: 'Today, 09:12 AM'
  },
  {
    id: 'usr_3',
    name: 'Dr. P. Gogoi',
    designation: 'Medical Superintendent & Dialysis Unit Lead',
    email: 'dialysis.amch@assam.gov.in',
    role: 'DialysisLead',
    assignedDistrict: 'Dibrugarh',
    facility: 'Assam Medical College & Hospital (AMCH), Dibrugarh',
    abhaPractitionerId: 'ABHA-PR-AS-007831',
    status: 'Active',
    lastLogin: 'Yesterday, 04:30 PM'
  },
  {
    id: 'usr_4',
    name: 'Anamika Kalita',
    designation: 'Community Health Officer (CHO)',
    email: 'cho.sonapur@assam.gov.in',
    role: 'MedicalOfficer',
    assignedDistrict: 'Kamrup Metropolitan',
    facility: 'Sonapur Ayushman Arogya Mandir (AAM)',
    abhaPractitionerId: 'ABHA-PR-AS-009941',
    status: 'Active',
    lastLogin: 'Today, 07:20 AM'
  }
];

export const DEFAULT_INGESTION_JOBS: IngestionJob[] = [
  {
    id: 'job_km_01',
    timestamp: '2026-11-23 20:15',
    sourceType: 'CPHC_NCD_BATCH',
    districtName: 'Kamrup Metropolitan',
    recordsProcessed: 12400,
    newTriageAlerts: 342,
    status: 'Completed',
    durationMs: 420
  },
  {
    id: 'job_db_02',
    timestamp: '2026-11-23 18:40',
    sourceType: 'SYNTHETIC_SIMULATOR',
    districtName: 'Dibrugarh',
    recordsProcessed: 8900,
    newTriageAlerts: 280,
    status: 'Completed',
    durationMs: 310
  },
  {
    id: 'job_ca_03',
    timestamp: '2026-11-23 15:10',
    sourceType: 'PMNDP_REGISTRY',
    districtName: 'Cachar (Silchar)',
    recordsProcessed: 6150,
    newTriageAlerts: 195,
    status: 'Completed',
    durationMs: 280
  }
];

export const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log_01',
    timestamp: '2026-11-23 21:00:15',
    actorName: 'Dr. B. K. Sarma',
    actorRole: 'SuperAdmin',
    actionType: 'RESET_SYSTEM',
    description: 'System master data initialized with NFHS-5 Assam fact sheet constants and ICMR-INDIAB renal hazard ratios.'
  },
  {
    id: 'log_02',
    timestamp: '2026-11-23 20:15:32',
    actorName: 'System (ABDM Sync Daemon)',
    actorRole: 'SuperAdmin',
    actionType: 'INGEST_BATCH',
    description: 'Completed CPHC-NCD Batch sync #AS-KM-08 (12,400 screened individuals ingested; 342 high-risk alerts flagged).'
  },
  {
    id: 'log_03',
    timestamp: '2026-11-23 19:45:10',
    actorName: 'Dr. R. Hazarika',
    actorRole: 'DistrictAdmin',
    actionType: 'UPDATE_DISTRICT',
    description: 'Updated Kamrup Metropolitan dialysis machine inventory (+4 machines allocated under PMNDP FY26 expansion).'
  }
];

interface AdminDataContextType {
  districts: DistrictMetric[];
  updateDistrict: (id: string, updates: Partial<DistrictMetric>) => void;
  batchAddMachines: (districtIds: string[], count: number) => void;
  clinicalParams: ClinicalGovernanceParams;
  updateClinicalParams: (updates: Partial<ClinicalGovernanceParams>) => void;
  users: AdminUser[];
  currentUser: AdminUser;
  switchCurrentUser: (userId: string) => void;
  addUser: (user: Omit<AdminUser, 'id' | 'lastLogin'>) => void;
  updateUserStatus: (userId: string, status: 'Active' | 'Suspended') => void;
  auditLogs: AuditLogEntry[];
  logAuditEvent: (actionType: AuditActionType, description: string, metadata?: Record<string, any>) => void;
  ingestionJobs: IngestionJob[];
  simulateBatchIngestion: (districtId: string, recordCount: number) => { ingested: number; newAlerts: number };
  resetToBaseline: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DISTRICTS: 'arogya_assam_districts_v2',
  CLINICAL_PARAMS: 'arogya_assam_clinical_params_v2',
  USERS: 'arogya_assam_users_v2',
  CURRENT_USER_ID: 'arogya_assam_current_user_v2',
  AUDIT_LOGS: 'arogya_assam_audit_logs_v2',
  INGESTION_JOBS: 'arogya_assam_ingestion_jobs_v2'
};

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Districts
  const [districts, setDistricts] = useState<DistrictMetric[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DISTRICTS);
      return saved ? JSON.parse(saved) : ASSAM_DISTRICTS;
    } catch {
      return ASSAM_DISTRICTS;
    }
  });

  // 2. Clinical Params
  const [clinicalParams, setClinicalParams] = useState<ClinicalGovernanceParams>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLINICAL_PARAMS);
      return saved ? JSON.parse(saved) : DEFAULT_CLINICAL_PARAMS;
    } catch {
      return DEFAULT_CLINICAL_PARAMS;
    }
  });

  // 3. Users
  const [users, setUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  // 4. Current User
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || DEFAULT_USERS[0].id;
    } catch {
      return DEFAULT_USERS[0].id;
    }
  });

  // 5. Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return saved ? JSON.parse(saved) : DEFAULT_AUDIT_LOGS;
    } catch {
      return DEFAULT_AUDIT_LOGS;
    }
  });

  // 6. Ingestion Jobs
  const [ingestionJobs, setIngestionJobs] = useState<IngestionJob[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INGESTION_JOBS);
      return saved ? JSON.parse(saved) : DEFAULT_INGESTION_JOBS;
    } catch {
      return DEFAULT_INGESTION_JOBS;
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(districts));
    } catch {}
  }, [districts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLINICAL_PARAMS, JSON.stringify(clinicalParams));
    } catch {}
  }, [clinicalParams]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } catch {}
  }, [currentUserId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    } catch {}
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INGESTION_JOBS, JSON.stringify(ingestionJobs));
    } catch {}
  }, [ingestionJobs]);

  const currentUser = users.find((u) => u.id === currentUserId) || users[0] || DEFAULT_USERS[0];

  const logAuditEvent = (actionType: AuditActionType, description: string, metadata?: Record<string, any>) => {
    const newEntry: AuditLogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorName: currentUser.name,
      actorRole: currentUser.role,
      actionType,
      description,
      metadata
    };
    setAuditLogs((prev) => [newEntry, ...prev.slice(0, 99)]); // Keep last 100 entries
  };

  const updateDistrict = (id: string, updates: Partial<DistrictMetric>) => {
    setDistricts((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const updated = { ...d, ...updates };
          // If machines changed, re-compute shortfall
          if (updates.existingDialysisMachines !== undefined || updates.dialysisDemandAnnualCases !== undefined) {
            const machines = updates.existingDialysisMachines ?? d.existingDialysisMachines;
            const demand = updates.dialysisDemandAnnualCases ?? d.dialysisDemandAnnualCases;
            const required = Math.ceil(demand / 52); // ~52 patients per machine annual capacity (2 shifts)
            updated.dialysisMachineShortfall = Math.max(0, required - machines);
            updated.estimatedAnnualSubsidiesINR = Math.round((demand * 156 * 2100) / 100000);
          }
          return updated;
        }
        return d;
      })
    );

    const dist = districts.find((d) => d.id === id);
    logAuditEvent(
      'UPDATE_DISTRICT',
      `Updated district metrics for ${dist?.name || id}: ${Object.keys(updates).join(', ')}`,
      updates
    );
  };

  const batchAddMachines = (districtIds: string[], count: number) => {
    setDistricts((prev) =>
      prev.map((d) => {
        if (districtIds.includes(d.id)) {
          const newMachines = d.existingDialysisMachines + count;
          const required = Math.ceil(d.dialysisDemandAnnualCases / 52);
          return {
            ...d,
            existingDialysisMachines: newMachines,
            dialysisMachineShortfall: Math.max(0, required - newMachines)
          };
        }
        return d;
      })
    );
    logAuditEvent(
      'UPDATE_DISTRICT',
      `Batch allocated +${count} hemodialysis machines across ${districtIds.length} districts.`
    );
  };

  const updateClinicalParams = (updates: Partial<ClinicalGovernanceParams>) => {
    setClinicalParams((prev) => ({ ...prev, ...updates }));
    logAuditEvent(
      'CHANGE_PARAM',
      `Updated clinical/economic governance parameters: ${Object.keys(updates).join(', ')}`,
      updates
    );
  };

  const switchCurrentUser = (userId: string) => {
    setCurrentUserId(userId);
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser) {
      logAuditEvent(
        'USER_UPDATE',
        `Evaluator impersonated role session: ${targetUser.name} (${targetUser.role} - ${targetUser.assignedDistrict})`
      );
    }
  };

  const addUser = (userData: Omit<AdminUser, 'id' | 'lastLogin'>) => {
    const newUser: AdminUser = {
      ...userData,
      id: `usr_${Date.now()}`,
      lastLogin: 'Never'
    };
    setUsers((prev) => [...prev, newUser]);
    logAuditEvent('USER_UPDATE', `Created new departmental user account: ${newUser.name} (${newUser.role})`);
  };

  const updateUserStatus = (userId: string, status: 'Active' | 'Suspended') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );
    const targetUser = users.find((u) => u.id === userId);
    logAuditEvent('USER_UPDATE', `Modified status of ${targetUser?.name} to ${status}`);
  };

  const simulateBatchIngestion = (districtId: string, recordCount: number) => {
    const dist = districts.find((d) => d.id === districtId);
    const distName = dist?.name || 'Selected District';
    const newAlerts = Math.round(recordCount * 0.038); // ~3.8% high-risk renal flag rate

    // Increment screened population in district
    setDistricts((prev) =>
      prev.map((d) => {
        if (d.id === districtId) {
          const newScreened = d.screenedPopulation + recordCount;
          const newPct = Math.min(98, Math.round((newScreened / d.adultPopulationEligible) * 100));
          return {
            ...d,
            screenedPopulation: newScreened,
            screeningCoveragePct: newPct
          };
        }
        return d;
      })
    );

    const newJob: IngestionJob = {
      id: `job_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      sourceType: 'SYNTHETIC_SIMULATOR',
      districtName: distName,
      recordsProcessed: recordCount,
      newTriageAlerts: newAlerts,
      status: 'Completed',
      durationMs: Math.floor(Math.random() * 200) + 250
    };

    setIngestionJobs((prev) => [newJob, ...prev]);

    logAuditEvent(
      'INGEST_BATCH',
      `Simulated ingestion of ${recordCount.toLocaleString('en-IN')} CPHC-NCD screening records for ${distName}. Triggered ${newAlerts} new automated renal triage alerts.`
    );

    return { ingested: recordCount, newAlerts };
  };

  const resetToBaseline = () => {
    setDistricts(ASSAM_DISTRICTS);
    setClinicalParams(DEFAULT_CLINICAL_PARAMS);
    setUsers(DEFAULT_USERS);
    setCurrentUserId(DEFAULT_USERS[0].id);
    setIngestionJobs(DEFAULT_INGESTION_JOBS);

    const resetLog: AuditLogEntry = {
      id: `log_reset_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorName: currentUser.name,
      actorRole: currentUser.role,
      actionType: 'RESET_SYSTEM',
      description: 'Reset all platform master data, machine counts, and parameters to standard NFHS-5 Assam baseline.'
    };
    setAuditLogs([resetLog]);
  };

  return (
    <AdminDataContext.Provider
      value={{
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
        logAuditEvent,
        ingestionJobs,
        simulateBatchIngestion,
        resetToBaseline
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = (): AdminDataContextType => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
