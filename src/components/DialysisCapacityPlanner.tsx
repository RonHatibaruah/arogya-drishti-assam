import React from 'react';
import { ShieldAlert, Droplets, Users, Stethoscope, Package, AlertCircle } from 'lucide-react';
import { DistrictMetric } from '../types';
import { calculateDialysisResourceNeeds } from '../utils/clinicalAlgorithms';

interface DialysisCapacityPlannerProps {
  selectedDistrict: DistrictMetric;
}

export const DialysisCapacityPlanner: React.FC<DialysisCapacityPlannerProps> = ({
  selectedDistrict
}) => {
  // Estimated ESRD cases needing active dialysis
  const estimatedESRDCases = Math.round(selectedDistrict.projectedCKDStage3to5 * 0.12);
  const resourceNeeds = calculateDialysisResourceNeeds(
    estimatedESRDCases,
    selectedDistrict.existingDialysisMachines
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-semibold text-white">
              PMNDP Hemodialysis Capacity & Logistics Forecaster
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Translating projected diabetic nephropathy and CKD Stage 5 burden into infrastructure requirements for{' '}
            <span className="font-semibold text-teal-300">{selectedDistrict.name}</span>.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-right">
          <div className="text-[10px] text-slate-400">Current Operational Units</div>
          <div className="text-sm font-bold text-teal-400 font-mono">
            {selectedDistrict.existingDialysisCenters} Centers ({selectedDistrict.existingDialysisMachines} Machines)
          </div>
        </div>
      </div>

      {/* Critical Infrastructure Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Required Hemodialysis Units</span>
            <Package className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {resourceNeeds.hemodialysisMachinesRequired} Machines
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            At 2 operational shifts daily
          </div>
        </div>

        <div className="bg-slate-900 border border-rose-900/40 bg-rose-950/20 rounded-xl p-4">
          <div className="flex items-center justify-between text-rose-300 mb-1">
            <span>Net Machine Deficit</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">
            -{resourceNeeds.netMachineDeficit} Units
          </div>
          <div className="text-[11px] text-rose-300/80 mt-1">
            Immediate procurement gap
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Dialysis Technicians Required</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">
            {resourceNeeds.dialysisTechniciansRequired} Technicians
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Staffing ratio: 1 per 4 stations/shift
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Nephrologists / MOs</span>
            <Stethoscope className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-teal-300">
            {resourceNeeds.nephrologistsOrMedicalOfficersRequired} Doctors
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Nodal oversight & AV fistula clinics
          </div>
        </div>
      </div>

      {/* Operational Shift & Consumables Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Left: Shift Strategy */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-white text-sm border-b border-slate-800 pb-2">
            Operational Shift Optimization (Capacity vs. Utilization)
          </h3>
          <p className="text-slate-400 text-xs">
            District Civil Hospitals can manage peak demand either through capital expenditure (adding machines) or operational expansion (transitioning from 2 shifts to 3 shifts daily).
          </p>

          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-200">Scenario A: Standard 2-Shift Operation</span>
                <span className="text-teal-400 font-mono font-bold">
                  {resourceNeeds.hemodialysisStationsInShifts.twoShiftsDaily} Machines Needed
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                08:00 to 16:00. Standard maintenance window for RO plant sanitation. Handles ~6 patients per machine per week.
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-200">Scenario B: High-Throughput 3-Shift Operation</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {resourceNeeds.hemodialysisStationsInShifts.threeShiftsDaily} Machines Needed
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                06:00 to 22:00. Requires rotational technician shifts and automated night thermal RO disinfection. Reduces physical bed footprint by 33%.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-400" />
              <div>
                <div className="font-semibold text-white">RO Ultra-Pure Water Plant Demand</div>
                <div className="text-[11px] text-slate-400">Based on 120L treated water per hemodialysis session</div>
              </div>
            </div>
            <div className="text-base font-bold text-sky-400 font-mono">
              {resourceNeeds.roWaterPlantLoadLitersPerDay.toLocaleString()} L/day
            </div>
          </div>
        </div>

        {/* Right: Consumables & Supply Chain */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-white text-sm border-b border-slate-800 pb-2">
            Annual Consumables & PMNDP Budget Forecast
          </h3>
          <p className="text-slate-400 text-xs">
            Projected annual supply chain requirements based on 156 sessions/year per patient under Assam NHM / PM-JAY.
          </p>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">High-Flux Dialyzers (F6 / F7)</span>
              <span className="font-mono text-white font-bold">
                {(estimatedESRDCases * 26).toLocaleString()} units (approx 6x reuse)
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">AV Bloodline Tubing Sets</span>
              <span className="font-mono text-white font-bold">
                {(estimatedESRDCases * 156).toLocaleString()} sets
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">Erythropoietin (EPO 4000 IU) Injections</span>
              <span className="font-mono text-white font-bold">
                {(estimatedESRDCases * 104).toLocaleString()} vials
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-300">Bicarbonate Part A/B Dialysate Cans</span>
              <span className="font-mono text-white font-bold">
                {(estimatedESRDCases * 156).toLocaleString()} sessions
              </span>
            </div>
          </div>

          <div className="bg-teal-950/40 p-3 rounded-lg border border-teal-800/80 flex items-center justify-between">
            <div>
              <div className="font-semibold text-teal-300">Projected Consumables Annual Cost</div>
              <div className="text-[10px] text-teal-400/80">Reimbursed through Ayushman Asom / PMNDP</div>
            </div>
            <div className="text-lg font-bold text-teal-300 font-mono">
              ₹{resourceNeeds.annualConsumablesCostCrores} Crores
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
