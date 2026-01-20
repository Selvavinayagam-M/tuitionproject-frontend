import React from 'react';
import PageHeader from '../../../shared/components/PageHeader';

const AboutHero = ({ data }) => {
  if (!data) return null;

  return (
    <>
      <PageHeader
        title={data.title}
        subtitle={data.subtitle}
        breadcrumb={data.breadcrumb}
      />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-4 block">{data.introBadge}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
            {data.introTitle}
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            {data.introDesc.map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;