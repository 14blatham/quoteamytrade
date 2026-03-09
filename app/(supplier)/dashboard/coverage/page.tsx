'use client';

import { useState } from 'react';
import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample UK postcode districts
const ALL_DISTRICTS = [
  'E1', 'E2', 'E3', 'EC1', 'EC2', 'N1', 'N2', 'NW1', 'NW3',
  'SE1', 'SE5', 'SW1', 'SW3', 'SW6', 'W1', 'W2', 'W6', 'WC1',
  'M1', 'M2', 'M3', 'M4', 'M14', 'M15', 'M16', 'M20', 'M21',
  'B1', 'B2', 'B3', 'B5', 'B11', 'B13', 'B15', 'B16',
  'LS1', 'LS2', 'LS6', 'LS7', 'LS11', 'LS12',
  'BS1', 'BS3', 'BS5', 'BS6', 'BS7', 'BS8', 'BS9',
];

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Coverage Areas</h1>
        <p className="text-gray-500 text-sm mt-1">Select the postcode districts where you want to receive leads.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        {/* Selected count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">{selected.length} district{selected.length !== 1 ? 's' : ''} selected</span>
          <button
            onClick={() => setSelected([])}
            className="text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            Clear all
          </button>
        </div>

        {/* Selected tags */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            {selected.map(d => (
              <span
                key={d}
                className="inline-flex items-center gap-1 text-xs bg-blue-700 text-white px-2.5 py-1 rounded-full font-medium"
              >
                {d}
                <button onClick={() => toggle(d)} className="hover:text-blue-200 ml-0.5">×</button>
              </span>
            ))}
          </div>
        )}

        {/* Search */}
        <Input
          type="text"
          placeholder="Search districts (e.g. SW1, M1...)"
          value={search}
          onChange={e => setSearch(e.target.value.toUpperCase())}
          className="mb-4 uppercase"
        />

        {/* District grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
          {filtered.map(d => (
            <button
              key={d}
              onClick={() => toggle(d)}
              className={`text-xs font-semibold py-2 rounded-lg border-2 transition-all ${
                selected.includes(d)
                  ? 'bg-blue-700 border-blue-700 text-white'
                  : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white">
          {saved ? '✓ Saved' : 'Save Coverage'}
        </Button>
      </div>
    </div>
  );
}
