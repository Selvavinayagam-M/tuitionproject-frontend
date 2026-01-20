
import React from 'react';

const AnalyticsChart = ({ data }) => {
  if (!data) return null;

  const { title, description, metrics } = data;

  return (
    <section className="py-12 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="prose prose-lg mx-auto text-gray-600">
          <p>
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {metrics.map((metric, index) => (
            <div key={index} className={`p-6 bg-${metric.color}-50 rounded-xl border border-${metric.color}-100`}>
              <div className={`text-4xl font-extrabold text-${metric.color}-600 mb-2`}>{metric.value}</div>
              <div className="text-sm font-bold text-gray-700 uppercase">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsChart;