const STATS = [
  { value: '10,000+', label: 'Jobs Matched' },
  { value: '2,500+', label: 'Vetted Tradespeople' },
  { value: '4.8', label: 'Average Rating' },
  { value: '100%', label: 'Free for Customers' },
];

export function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
          {STATS.map(stat => (
            <div key={stat.label} className="py-8 px-6 text-center">
              <div className="text-3xl font-black text-gray-950 tracking-tight">{stat.value}</div>
              <div className="mt-1 text-xs font-medium text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
