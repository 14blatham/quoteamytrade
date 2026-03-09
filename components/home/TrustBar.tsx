const STATS = [
  { value: '10,000+', label: 'Jobs Matched' },
  { value: '2,500+', label: 'Vetted Tradespeople' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '100%', label: 'Free for Customers' },
];

export function TrustBar() {
  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
              <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
