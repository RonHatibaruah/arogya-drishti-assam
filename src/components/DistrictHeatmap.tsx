import React, { useState } from 'react';
import { Search, MapPin, AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';
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

  const getMetricBadge = (d: DistrictMetric) => {
    switch (metricKey) {
      case 'screeningCoveragePct':
        return (
          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
            d.screeningCoveragePct >= 70 ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' :
            d.screeningCoveragePct >= 55 ? 'bg-amber-50 text-amber-800 border border-amber-300' :
            'bg-rose-50 text-rose-800 border border-rose-300'
          }`}>
            {d.screeningCoveragePct}%
          </span>
        );
      case 'confirmedDiabetics':
        return (
          <span className="bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-xs font-mono font-bold">
            {d.confirmedDiabetics.toLocaleString()}
          </span>
        );
      case 'projectedCKDStage3to5':
        return (
          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
            d.projectedCKDStage3to5 >= 10000 ? 'bg-rose-100 text-rose-800 border border-rose-300' :
            d.projectedCKDStage3to5 >= 6000 ? 'bg-amber-50 text-amber-800 border border-amber-300' :
            'bg-slate-100 text-slate-800'
          }`}>
            {d.projectedCKDStage3to5.toLocaleString()}
          </span>
        );
      case 'dialysisMachineShortfall':
        return (
          <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded text-xs font-mono font-bold">
            -{d.dialysisMachineShortfall} Units
          </span>
        );
      case 'estimatedAnnualSubsidiesINR':
        return (
          <span className="bg-indigo-50 text-indigo-900 border border-indigo-200 px-2 py-0.5 rounded text-xs font-mono font-bold">
            ₹{d.estimatedAnnualSubsidiesINR} L
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Explanation Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold text-slate-900">
              Assam District-Level Cross-Programme Geospatial Observatory
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Cross-referencing CPHC NCD primary screening (Hypertension & Diabetes) with secondary CKD / Renal failure risks and PMNDP dialysis infrastructure.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setMetricKey('projectedCKDStage3to5')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'projectedCKDStage3to5'
                ? 'bg-rose-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Projected CKD (3-5)
          </button>
          <button
            onClick={() => setMetricKey('dialysisMachineShortfall')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'dialysisMachineShortfall'
                ? 'bg-rose-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dialysis Shortfall
          </button>
          <button
            onClick={() => setMetricKey('screeningCoveragePct')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'screeningCoveragePct'
                ? 'bg-teal-700 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Screening Coverage %
          </button>
          <button
            onClick={() => setMetricKey('confirmedDiabetics')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'confirmedDiabetics'
                ? 'bg-amber-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Diabetic Burden
          </button>
          <button
            onClick={() => setMetricKey('estimatedAnnualSubsidiesINR')}
            className={`px-2.5 py-1 rounded transition-colors ${
              metricKey === 'estimatedAnnualSubsidiesINR'
                ? 'bg-indigo-700 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
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
                className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 shadow-2xs"
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
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
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
                      ? 'bg-teal-50/50 border-teal-600 ring-2 ring-teal-600/20 shadow-md'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{d.name}</h4>
                      <span className="text-[10px] text-slate-500">{d.zone}</span>
                    </div>
                    {getMetricBadge(d)}
                  </div>

                  <div className="space-y-1.5 text-[11px] pt-1 border-t border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Screened Pop:</span>
                      <span className="font-mono text-slate-900 font-semibold">{(d.screenedPopulation / 1000).toFixed(0)}k ({d.screeningCoveragePct}%)</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Confirmed Diabetics:</span>
                      <span className="font-mono text-amber-700 font-semibold">{d.confirmedDiabetics.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Dialysis Centers:</span>
                      <span className="font-mono text-teal-800 font-semibold">{d.existingDialysisCenters} Ctr ({d.existingDialysisMachines} mach)</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                      d.riskClassification === 'critical' ? 'text-rose-800 bg-rose-100 border border-rose-200' :
                      d.riskClassification === 'high' ? 'text-amber-800 bg-amber-100 border border-amber-200' :
                      'text-emerald-800 bg-emerald-100 border border-emerald-200'
                    }`}>
                      {d.riskClassification} Tier
                    </span>
                    <span className="text-teal-700 font-semibold hover:underline">Select & Analyze →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Selected District Profile */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                District Focus Analysis
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">
                Zone: {selectedDistrict.zone}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{selectedDistrict.name}</h3>
            <p className="text-xs text-slate-500">
              Total Population: {selectedDistrict.populationTotal.toLocaleString()} | Adult 30+ Eligible: {selectedDistrict.adultPopulationEligible.toLocaleString()}
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 font-medium">Confirmed Diabetics</div>
              <div className="text-lg font-bold text-amber-800 font-mono">
                {selectedDistrict.confirmedDiabetics.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                + {selectedDistrict.estimatedHiddenDiabetics.toLocaleString()} hidden
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 font-medium">Confirmed Hypertensives</div>
              <div className="text-lg font-bold text-rose-800 font-mono">
                {selectedDistrict.confirmedHypertensives.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                High CVD risk
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 font-medium">Projected CKD (Stage 3-5)</div>
              <div className="text-lg font-bold text-rose-800 font-mono">
                {selectedDistrict.projectedCKDStage3to5.toLocaleString()}
              </div>
              <div className="text-[10px] text-rose-700 mt-0.5 font-medium">
                Vulnerable cohort
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 font-medium">PMNDP Dialysis Gap</div>
              <div className="text-lg font-bold text-rose-700 font-mono">
                -{selectedDistrict.dialysisMachineShortfall} Units
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {selectedDistrict.existingDialysisMachines} units active
              </div>
            </div>
          </div>

          {/* Contributing Factors */}
          <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              Regional Epidemiological Drivers:
            </div>
            <ul className="space-y-1 text-slate-700 list-disc list-inside">
              {selectedDistrict.topContributingFactors.map((factor, idx) => (
                <li key={idx} className="text-[11px]">{factor}</li>
              ))}
            </ul>
          </div>

          {/* Action Triggers */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <button
              onClick={onNavigateToForecast}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg transition-colors shadow-xs"
            >
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
              Run 5-Year Disease Progression Model
            </button>
            <button
              onClick={onNavigateToDialysis}
              className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition-colors shadow-xs"
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
