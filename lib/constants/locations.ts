import type { UKLocation } from '@/types';

export const UK_LOCATIONS: UKLocation[] = [
  {
    city: 'London',
    slug: 'london',
    region: 'Greater London',
    population: 8900000,
    postcodeDistricts: ['E1', 'E2', 'E3', 'EC1', 'EC2', 'N1', 'N2', 'NW1', 'NW3', 'SE1', 'SE5', 'SW1', 'SW3', 'SW6', 'W1', 'W2', 'W6', 'WC1'],
  },
  {
    city: 'Manchester',
    slug: 'manchester',
    region: 'Greater Manchester',
    population: 550000,
    postcodeDistricts: ['M1', 'M2', 'M3', 'M4', 'M8', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M20', 'M21'],
  },
  {
    city: 'Birmingham',
    slug: 'birmingham',
    region: 'West Midlands',
    population: 1140000,
    postcodeDistricts: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17'],
  },
  {
    city: 'Leeds',
    slug: 'leeds',
    region: 'West Yorkshire',
    population: 790000,
    postcodeDistricts: ['LS1', 'LS2', 'LS3', 'LS4', 'LS6', 'LS7', 'LS8', 'LS11', 'LS12', 'LS13', 'LS15', 'LS16', 'LS17'],
  },
  {
    city: 'Bristol',
    slug: 'bristol',
    region: 'South West England',
    population: 467000,
    postcodeDistricts: ['BS1', 'BS2', 'BS3', 'BS4', 'BS5', 'BS6', 'BS7', 'BS8', 'BS9', 'BS10', 'BS13', 'BS14'],
  },
  {
    city: 'Sheffield',
    slug: 'sheffield',
    region: 'South Yorkshire',
    population: 584000,
    postcodeDistricts: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S10', 'S11', 'S12', 'S13', 'S14'],
  },
  {
    city: 'Liverpool',
    slug: 'liverpool',
    region: 'Merseyside',
    population: 498000,
    postcodeDistricts: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L11', 'L12', 'L13', 'L14', 'L15', 'L17'],
  },
  {
    city: 'Edinburgh',
    slug: 'edinburgh',
    region: 'Scotland',
    population: 530000,
    postcodeDistricts: ['EH1', 'EH2', 'EH3', 'EH4', 'EH5', 'EH6', 'EH7', 'EH8', 'EH9', 'EH10', 'EH11', 'EH12', 'EH13'],
  },
  {
    city: 'Cardiff',
    slug: 'cardiff',
    region: 'Wales',
    population: 362000,
    postcodeDistricts: ['CF1', 'CF3', 'CF5', 'CF10', 'CF11', 'CF14', 'CF15', 'CF23', 'CF24'],
  },
  {
    city: 'Leicester',
    slug: 'leicester',
    region: 'East Midlands',
    population: 355000,
    postcodeDistricts: ['LE1', 'LE2', 'LE3', 'LE4', 'LE5', 'LE7', 'LE8', 'LE9', 'LE10'],
  },
  {
    city: 'Nottingham',
    slug: 'nottingham',
    region: 'East Midlands',
    population: 330000,
    postcodeDistricts: ['NG1', 'NG2', 'NG3', 'NG5', 'NG6', 'NG7', 'NG8', 'NG9', 'NG10', 'NG11'],
  },
  {
    city: 'Southampton',
    slug: 'southampton',
    region: 'South East England',
    population: 253000,
    postcodeDistricts: ['SO14', 'SO15', 'SO16', 'SO17', 'SO18', 'SO19', 'SO30', 'SO31'],
  },
  {
    city: 'Newcastle',
    slug: 'newcastle',
    region: 'North East England',
    population: 300000,
    postcodeDistricts: ['NE1', 'NE2', 'NE3', 'NE4', 'NE5', 'NE6', 'NE7', 'NE8', 'NE12', 'NE13', 'NE15'],
  },
  {
    city: 'Glasgow',
    slug: 'glasgow',
    region: 'Scotland',
    population: 635000,
    postcodeDistricts: ['G1', 'G2', 'G3', 'G4', 'G5', 'G11', 'G12', 'G13', 'G14', 'G20', 'G21', 'G22', 'G31', 'G41', 'G42'],
  },
  {
    city: 'Oxford',
    slug: 'oxford',
    region: 'South East England',
    population: 155000,
    postcodeDistricts: ['OX1', 'OX2', 'OX3', 'OX4', 'OX5', 'OX14', 'OX16', 'OX18'],
  },
  {
    city: 'Cambridge',
    slug: 'cambridge',
    region: 'East of England',
    population: 125000,
    postcodeDistricts: ['CB1', 'CB2', 'CB3', 'CB4', 'CB5', 'CB21', 'CB22', 'CB23', 'CB24', 'CB25'],
  },
  {
    city: 'Brighton',
    slug: 'brighton',
    region: 'South East England',
    population: 290000,
    postcodeDistricts: ['BN1', 'BN2', 'BN3', 'BN41', 'BN42', 'BN43'],
  },
  {
    city: 'Exeter',
    slug: 'exeter',
    region: 'South West England',
    population: 130000,
    postcodeDistricts: ['EX1', 'EX2', 'EX3', 'EX4', 'EX5', 'EX6'],
  },
  {
    city: 'York',
    slug: 'york',
    region: 'North Yorkshire',
    population: 210000,
    postcodeDistricts: ['YO1', 'YO10', 'YO23', 'YO24', 'YO26', 'YO30', 'YO31', 'YO32'],
  },
  {
    city: 'Norwich',
    slug: 'norwich',
    region: 'East of England',
    population: 215000,
    postcodeDistricts: ['NR1', 'NR2', 'NR3', 'NR4', 'NR5', 'NR6', 'NR7', 'NR8', 'NR14'],
  },
];

export function getLocationBySlug(slug: string): UKLocation | undefined {
  return UK_LOCATIONS.find(l => l.slug === slug);
}

export const UK_CITIES = UK_LOCATIONS.map(l => l.city);
