import type { UKLocation } from '@/types';

export const UK_LOCATIONS: UKLocation[] = [
  // ─── West Midlands ───────────────────────────────────────────────────────────
  {
    city: 'Birmingham',
    slug: 'birmingham',
    region: 'West Midlands',
    population: 1140000,
    postcodeDistricts: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19'],
  },
  {
    city: 'Coventry',
    slug: 'coventry',
    region: 'West Midlands',
    population: 370000,
    postcodeDistricts: ['CV1', 'CV2', 'CV3', 'CV4', 'CV5', 'CV6', 'CV7'],
  },
  {
    city: 'Wolverhampton',
    slug: 'wolverhampton',
    region: 'West Midlands',
    population: 263000,
    postcodeDistricts: ['WV1', 'WV2', 'WV3', 'WV4', 'WV6', 'WV10', 'WV11'],
  },
  {
    city: 'Walsall',
    slug: 'walsall',
    region: 'West Midlands',
    population: 270000,
    postcodeDistricts: ['WS1', 'WS2', 'WS3', 'WS4', 'WS5'],
  },
  {
    city: 'Dudley',
    slug: 'dudley',
    region: 'West Midlands',
    population: 312000,
    postcodeDistricts: ['DY1', 'DY2', 'DY3', 'DY4', 'DY5'],
  },
  {
    city: 'Solihull',
    slug: 'solihull',
    region: 'West Midlands',
    population: 215000,
    postcodeDistricts: ['B90', 'B91', 'B92', 'B93', 'B94'],
  },
  {
    city: 'West Bromwich',
    slug: 'west-bromwich',
    region: 'West Midlands',
    population: 130000,
    postcodeDistricts: ['B70', 'B71'],
  },
  // ─── East Midlands ───────────────────────────────────────────────────────────
  {
    city: 'Nottingham',
    slug: 'nottingham',
    region: 'East Midlands',
    population: 330000,
    postcodeDistricts: ['NG1', 'NG2', 'NG3', 'NG5', 'NG6', 'NG7', 'NG8', 'NG9', 'NG10', 'NG11'],
  },
  {
    city: 'Leicester',
    slug: 'leicester',
    region: 'East Midlands',
    population: 355000,
    postcodeDistricts: ['LE1', 'LE2', 'LE3', 'LE4', 'LE5', 'LE7', 'LE8', 'LE9'],
  },
  {
    city: 'Derby',
    slug: 'derby',
    region: 'East Midlands',
    population: 257000,
    postcodeDistricts: ['DE1', 'DE3', 'DE21', 'DE22', 'DE23', 'DE24'],
  },
  {
    city: 'Northampton',
    slug: 'northampton',
    region: 'East Midlands',
    population: 225000,
    postcodeDistricts: ['NN1', 'NN2', 'NN3', 'NN4', 'NN5'],
  },
  {
    city: 'Lincoln',
    slug: 'lincoln',
    region: 'East Midlands',
    population: 100000,
    postcodeDistricts: ['LN1', 'LN2', 'LN3', 'LN4', 'LN5', 'LN6'],
  },
  {
    city: 'Loughborough',
    slug: 'loughborough',
    region: 'East Midlands',
    population: 60000,
    postcodeDistricts: ['LE11', 'LE12'],
  },
  {
    city: 'Mansfield',
    slug: 'mansfield',
    region: 'East Midlands',
    population: 100000,
    postcodeDistricts: ['NG18', 'NG19', 'NG20', 'NG21'],
  },
  {
    city: 'Chesterfield',
    slug: 'chesterfield',
    region: 'East Midlands',
    population: 104000,
    postcodeDistricts: ['S40', 'S41', 'S42', 'S43', 'S44', 'S45'],
  },
  {
    city: 'Burton upon Trent',
    slug: 'burton-upon-trent',
    region: 'East Midlands',
    population: 72000,
    postcodeDistricts: ['DE13', 'DE14', 'DE15'],
  },
];

export function getLocationBySlug(slug: string): UKLocation | undefined {
  return UK_LOCATIONS.find(l => l.slug === slug);
}

export const UK_CITIES = UK_LOCATIONS.map(l => l.city);
