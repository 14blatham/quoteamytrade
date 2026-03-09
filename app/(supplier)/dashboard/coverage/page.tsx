'use client';

import { useState } from 'react';
import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

// Midlands postcode districts
const ALL_DISTRICTS = [
  // West Midlands
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19',
  'B70', 'B71', 'B90', 'B91', 'B92', 'B93',
  'CV1', 'CV2', 'CV3', 'CV4', 'CV5', 'CV6', 'CV7',
  'DY1', 'DY2', 'DY3', 'DY4', 'DY5',
  'WS1', 'WS2', 'WS3', 'WS4', 'WS5',
  'WV1', 'WV2', 'WV3', 'WV4', 'WV6', 'WV10', 'WV11',
  // East Midlands
  'DE1', 'DE3', 'DE13', 'DE14', 'DE15', 'DE21', 'DE22', 'DE23', 'DE24',
  'LE1', 'LE2', 'LE3', 'LE4', 'LE5', 'LE7', 'LE8', 'LE9', 'LE11', 'LE12',
  'LN1', 'LN2', 'LN3', 'LN4', 'LN5', 'LN6',
  'NG1', 'NG2', 'NG3', 'NG5', 'NG6', 'NG7', 'NG8', 'NG9', 'NG10', 'NG11', 'NG18', 'NG19', 'NG20',
  'NN1', 'NN2', 'NN3', 'NN4', 'NN5', 'NN6',
  'S40', 'S41', 'S42', 'S43', 'S44', 'S45',
];

const REGION_LABELS: Record<string, string> = {
  B: 'Birmingham', CV: 'Coventry', DY: 'Dudley', WS: 'Walsall', WV: 'Wolverhampton',
  DE: 'Derby/Burton', LE: 'Leicester', LN: 'Lincoln', NG: 'Nottingham', NN: 'Northampton', S: 'Chesterfield',
};

export default function CoveragePage() {
  const { supplier } = useMockAuth();
  const [selected, setSelected] = useState<string[]>(supplier?.coveragePostcodes ?? []);
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);

  const filtered = ALL_DISTRICTS.filter(d =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(district: string) {
    setSelected(prev =>
      prev.includes(district) ? prev.filter(d => d !== district) : [...prev, district]
    );
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Dashboard</p>
        <h1 className="text-2xl font-bold text-gray-900">Coverage Areas</h1>
        <p className="text-gray-500 text-sm mt-0.5">Select the Midlands postcode districts where you want to receive leads.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              {selected.length} district{selected.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search districts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-8 w-36 text-sm border-gray-200"
            />
            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="text-xs text-red-500 hover:text-red-700 transition-colors font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Selected tags */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            {selected.map(d => (
              <button
                key={d}
                onClick={() => toggle(d)}
                className="flex items-center gap-1 bg-blue-600 text-white text-xs font-mono font-bold px-2 py-0.5 rounded-md hover:bg-red-500 transition-colors"
              >
                {d} ×
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5">
          {filtered.map(district => (
            <button
              key={district}
              onClick={() => toggle(district)}
              className={`py-2 rounded-lg text-xs font-mono font-bold transition-all active:scale-95 ${
                selected.includes(district)
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {district}
            </button>
          ))}
        </div>

        {/* Region legend */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Region Guide</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {Object.entries(REGION_LABELS).map(([prefix, name]) => (
              <span key={prefix} className="text-xs text-gray-500">
                <span className="font-mono font-bold text-gray-700">{prefix}*</span> = {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleSave}
          className="bg-blue-700 hover:bg-blue-600 active:scale-95 text-white transition-all"
        >
          {saved ? 'Saved' : 'Save Coverage'}
        </Button>
        <p className="text-xs text-gray-400">Changes take effect immediately.</p>
      </div>
    </div>
  );
}
