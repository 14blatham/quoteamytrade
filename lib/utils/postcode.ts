const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export function validateUKPostcode(postcode: string): boolean {
  return UK_POSTCODE_REGEX.test(postcode.trim());
}

export function formatPostcode(postcode: string): string {
  const clean = postcode.trim().toUpperCase().replace(/\s+/g, '');
  if (clean.length >= 5) {
    return clean.slice(0, -3) + ' ' + clean.slice(-3);
  }
  return clean;
}

export function extractDistrict(postcode: string): string {
  const clean = postcode.trim().toUpperCase().replace(/\s+/g, '');
  // District is everything before the last 3 characters (inward code)
  return clean.slice(0, -3);
}

export function extractArea(postcode: string): string {
  const district = extractDistrict(postcode);
  // Area is the leading letters only
  const match = district.match(/^[A-Z]+/i);
  return match ? match[0].toUpperCase() : '';
}
