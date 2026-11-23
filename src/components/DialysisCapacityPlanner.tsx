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
  const estimatedESRDCases = Math.round(selectedDistrict.projectedCKDStage3to5 * 0.12);
  const resourceNeeds = calculateDialysisResourceNeeds(
    estimatedESRDCases,
    selectedDistrict.existingDialysisMachines
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-700" />
            <h2 className="text-base font-bold text-slate-900">
              PMNDP Hemodialysis Capacity & Logistics Forecaster
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Translating projected diabetic nephropathy and CKD Stage 5 burden into infrastructure requirements for{' '}
            <span className="font-bold text-teal-800">{selectedDistrict.name}</span>.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-right">
          <div className="text-[10px] text-slate-500 font-medium">Current Operational Units</div>
          <div className="text-sm font-bold text-teal-800 font-mono">
            {selectedDistrict.existingDialysisCenters} Centers ({selectedDistrict.existingDialysisMachines} Machines)
          </div>
        </div>
      </div>

      {/* Critical Infrastructure Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-medium">Required Hemodialysis Units</span>
            <Package className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {resourceNeeds.hemodialysisMachinesRequired} Machines
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            At 2 operational shifts daily
          </div>
        </div>

        <div className="bg-white border border-rose-200 bg-rose-50/40 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-rose-800 mb-1">
            <span className="font-medium">Net Machine Deficit</span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-700">
            -{resourceNeeds.netMachineDeficit} Units
          </div>
          <div className="text-[11px] text-rose-700 mt-1 font-medium">
            Immediate procurement gap
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-medium">Dialysis Technicians Required</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-800">
            {resourceNeeds.dialysisTechniciansRequired} Technicians
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Staffing ratio: 1 per 4 stations/shift
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-medium">Nephrologists / MOs</span>
            <Stethoscope className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl font-bold font-mono text-teal-800">
            {resourceNeeds.nephrologistsOrMedicalOfficersRequired} Doctors
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Nodal oversight & AV fistula clinics
          </div>
        </div>
      </div>

      {/* Operational Shift & Consumables Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Left: Shift Strategy */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Operational Shift Optimization (Capacity vs. Utilization)
          </h3>
          <p className="text-slate-600 text-xs">
            District Civil Hospitals can manage peak demand either through capital expenditure (adding machines) or operational expansion (transitioning from 2 shifts to 3 shifts daily).
          </p>

          <div className="space-y-3">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800">Scenario A: Standard 2-Shift Operation</span>
                <span className="text-teal-800 font-mono font-bold">
                  {resourceNeeds.hemodialysisStationsInShifts.twoShiftsDaily} Machines Needed
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                08:00 to 16:00. Standard maintenance window for RO plant sanitation. Handles ~6 patients per machine per week.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800">Scenario B: High-Throughput 3-Shift Operation</span>
                <span className="text-emerald-700 font-mono font-bold">
                  {resourceNeeds.hemodialysisStationsInShifts.threeShiftsDaily} Machines Needed
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                06:00 to 22:00. Requires rotational technician shifts and automated night thermal RO disinfection. Reduces physical bed footprint by 33%.
              </p>
            </div>
          </div>

          <div className="bg-sky-50/60 p-3.5 rounded-lg border border-sky-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-700" />
              <div>
                <div className="font-bold text-slate-900">RO Ultra-Pure Water Plant Demand</div>
                <div className="text-[11px] text-slate-600">Based on 120L treated water per hemodialysis session</div>
              </div>
            </div>
            <div className="text-base font-bold text-sky-800 font-mono">
              {resourceNeeds.roWaterPlantLoadLitersPerDay.toLocaleString()} L/day
            </div>
          </div>
        </div>

        {/* Right: Consumables & Supply Chain */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Annual Consumables & PMNDP Budget Forecast
          </h3>
          <p className="text-slate-600 text-xs">
            Projected annual supply chain requirements based on 156 sessions/year per patient under Assam NHM / PM-JAY.
          </p>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-700 font-medium">High-Flux Dialyzers (F6 / F7)</span>
              <span className="font-mono text-slate-900 font-bold">
                {(estimatedESRDCases * 26).toLocaleString()} units (approx 6x reuse)
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-700 font-medium">AV Bloodline Tubing Sets</span>
              <span className="font-mono text-slate-900 font-bold">
                {(estimatedESRDCases * 156).toLocaleString()} sets
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-700 font-medium">Erythropoietin (EPO 4000 IU) Injections</span>
              <span className="font-mono text-slate-900 font-bold">
                {(estimatedESRDCases * 104).toLocaleString()} vials
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-700 font-medium">Bicarbonate Part A/B Dialysate Cans</span>
              <span className="font-mono text-slate-900 font-bold">
                {(estimatedESRDCases * 156).toLocaleString()} sessions
              </span>
            </div>
          </div>

          <div className="bg-teal-50 p-3 rounded-lg border border-teal-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-teal-900">Projected Consumables Annual Cost</div>
              <div className="text-[10px] text-teal-700">Reimbursed through Ayushman Asom / PMNDP</div>
            </div>
            <div className="text-lg font-bold text-teal-800 font-mono">
              ₹{resourceNeeds.annualConsumablesCostCrores} Crores
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
