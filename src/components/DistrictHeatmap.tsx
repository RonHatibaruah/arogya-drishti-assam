import React, { useState } from 'react';
import { Search, MapPin, AlertTriangle, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { DistrictMetric } from '../types';

interface DistrictHeatmapProps {
  districts: DistrictMetric[];
  selectedDistrict: DistrictMetric;
  onSelectDistrict: (district: DistrictMetric) => void;
  onNavigateToForecast: () => void;
  onNavigateToDialysis: () => void;
}

export const DistrictHeatmap: React.FC<DistrictHeatmapProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  onNavigateToForecast,
  onNavigateToDialysis
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [metricKey, setMetricKey] = useState<
    'screeningCoveragePct' | 'confirmedDiabetics' | 'projectedCKDStage3to5' | 'dialysisMachineShortfall' | 'estimatedAnnualSubsidiesINR'
  >('projectedCKDStage3to5');

  const zones = ['All', 'Upper Assam', 'Lower Assam', 'Central Assam', 'Barak Valley', 'North Assam', 'Hills'];

  const filteredDistricts = districts.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'All' || d.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const getMetricLabel = () => {
    switch (metricKey) {
      case 'screeningCoveragePct': return 'Screening Coverage (%)';
      case 'confirmedDiabetics': return 'Confirmed Diabetics';
      case 'projectedCKDStage3to5': return 'Projected CKD (Stage 3–5)';
      case 'dialysisMachineShortfall': return 'PMNDP Dialysis Machine Deficit';
      case 'estimatedAnnualSubsidiesINR': return 'Est. Annual Subsidies (₹ Lakhs)';
    }
  };

  const getMetricBadge = (d: DistrictMetric) => {
    switch (metricKey) {
      case 'screeningCoveragePct':
        return (
          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
            d.screeningCoveragePct >= 70 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
            d.screeningCoveragePct >= 55 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
            'bg-rose-950 text-rose-400 border border-rose-800'
          }`}>
            {d.screeningCoveragePct}%
          </span>
        );
      case 'confirmedDiabetics':
        return (
          <span className="bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded text-xs font-mono font-bold">
            {d.confirmedDiabetics.toLocaleString()}
          </span>
        );
      case 'projectedCKDStage3to5':
        return (
          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
            d.projectedCKDStage3to5 >= 10000 ? 'bg-rose-950 text-rose-400 border border-rose-800' :
            d.projectedCKDStage3to5 >= 6000 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
            'bg-slate-800 text-slate-300'
          }`}>
            {d.projectedCKDStage3to5.toLocaleString()}
          </span>
        );
      case 'dialysisMachineShortfall':
        return (
          <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded text-xs font-mono font-bold">
            -{d.dialysisMachineShortfall} Units
          </span>
        );
      case 'estimatedAnnualSubsidiesINR':
        return (
          <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded text-xs font-mono font-bold">
            ₹{d.estimatedAnnualSubsidiesINR} L
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Explanation Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            <h2 className="text-base font-semibold text-white">
              Assam District-Level Cross-Programme Geospatial Observatory
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-referencing CPHC NCD primary screening (Hypertension & Diabetes) with secondary CKD / Renal failure risks and PMNDP dialysis infrastructure.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setMetricKey('projectedCKDStage3to5')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'projectedCKDStage3to5'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Projected CKD (3-5)
          </button>
          <button
            onClick={() => setMetricKey('dialysisMachineShortfall')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'dialysisMachineShortfall'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dialysis Shortfall
          </button>
          <button
            onClick={() => setMetricKey('screeningCoveragePct')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'screeningCoveragePct'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Screening Coverage %
          </button>
          <button
            onClick={() => setMetricKey('confirmedDiabetics')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'confirmedDiabetics'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diabetic Burden
          </button>
          <button
            onClick={() => setMetricKey('estimatedAnnualSubsidiesINR')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'estimatedAnnualSubsidiesINR'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Subsidies (₹)
          </button>
        </div>
      </div>

      {/* Main Grid + Selected District Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Search, Zone Filters, and District Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Assam district (e.g., Kamrup, Dibrugarh, Cachar)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Zone Filter Pill Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto text-xs py-0.5">
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
                    selectedZone === zone
                      ? 'bg-slate-700 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          {/* District Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredDistricts.map((d) => {
              const isSelected = selectedDistrict.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => onSelectDistrict(d)}
                  className={`cursor-pointer rounded-xl p-3.5 border transition-all text-left ${
                    isSelected
                      ? 'bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20 shadow-lg'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <div>
                      <h4 className="font-semibold text-sm text-white">{d.name}</h4>
                      <span className="text-[10px] text-slate-400">{d.zone}</span>
                    </div>
                    {getMetricBadge(d)}
                  </div>

                  <div className="space-y-1.5 text-[11px] pt-1 border-t border-slate-800/80">
                    <div className="flex justify-between text-slate-400">
                      <span>Screened Pop:</span>
                      <span className="font-mono text-slate-200">{(d.screenedPopulation / 1000).toFixed(0)}k ({d.screeningCoveragePct}%)</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Confirmed Diabetics:</span>
                      <span className="font-mono text-amber-400">{d.confirmedDiabetics.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Dialysis Centers:</span>
                      <span className="font-mono text-teal-300">{d.existingDialysisCenters} Ctr ({d.existingDialysisMachines} mach)</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded font-semibold uppercase ${
                      d.riskClassification === 'critical' ? 'text-rose-400 bg-rose-500/10' :
                      d.riskClassification === 'high' ? 'text-amber-400 bg-amber-500/10' :
                      'text-emerald-400 bg-emerald-500/10'
                    }`}>
                      {d.riskClassification} Tier
                    </span>
                    <span className="text-teal-400 hover:underline">Select & Analyze →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Selected District Profile & Cross-Programme Insight */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                District Focus Analysis
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                Zone: {selectedDistrict.zone}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">{selectedDistrict.name}</h3>
            <p className="text-xs text-slate-400">
              Total Population: {selectedDistrict.populationTotal.toLocaleString()} | Adult 30+ Eligible: {selectedDistrict.adultPopulationEligible.toLocaleString()}
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Confirmed Diabetics</div>
              <div className="text-lg font-bold text-amber-400 font-mono">
                {selectedDistrict.confirmedDiabetics.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                + {selectedDistrict.estimatedHiddenDiabetics.toLocaleString()} estimated hidden
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Confirmed Hypertensives</div>
              <div className="text-lg font-bold text-rose-400 font-mono">
                {selectedDistrict.confirmedHypertensives.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                High CVD / Stroke risk
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Projected CKD (Stage 3-5)</div>
              <div className="text-lg font-bold text-rose-400 font-mono">
                {selectedDistrict.projectedCKDStage3to5.toLocaleString()}
              </div>
              <div className="text-[10px] text-rose-400/80 mt-0.5">
                Vulnerable renal cohort
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">PMNDP Dialysis Gap</div>
              <div className="text-lg font-bold text-rose-300 font-mono">
                -{selectedDistrict.dialysisMachineShortfall} Machines
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {selectedDistrict.existingDialysisMachines} units currently active
              </div>
            </div>
          </div>

          {/* Contributing Epidemiological Factors */}
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Regional Epidemiological Drivers:
            </div>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              {selectedDistrict.topContributingFactors.map((factor, idx) => (
                <li key={idx} className="text-[11px]">{factor}</li>
              ))}
            </ul>
          </div>

          {/* Cross-Programme Action Triggers */}
          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            <button
              onClick={onNavigateToForecast}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-white font-medium py-2 rounded-lg border border-slate-700 transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
              Run 5-Year Disease Progression Model
            </button>
            <button
              onClick={onNavigateToDialysis}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Plan Dialysis Logistics & Consumables
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
