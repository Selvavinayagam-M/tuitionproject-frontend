import React from 'react';

const MilestonesSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute opacity-10 top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
          <p className="text-xl text-blue-200">{data.subtitle}</p>
        </div>

        <div className="relative">
          {/* Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-700"></div>

          <div className="space-y-12">
            {data.items.map((m, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-5/12"></div>

                <div className="z-10 flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full border-4 border-blue-900 shadow-lg mb-4 md:mb-0">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>

                <div className={`w-full md:w-5/12 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-blue-700 hover:bg-white/20 transition ${idx % 2 === 0 ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
                  <span className="text-orange-400 font-bold text-lg mb-2 block">{m.year}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-blue-200 text-sm">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MilestonesSection;