import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function DataFlow() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Kosovo ICT total export data (2020-2024), source: STIKK
  const exportData = [
    { year: '2020', value: 3.4, displayValue: 3.4 },
    { year: '2021', value: 5.1, displayValue: 5.1 },
    { year: '2022', value: 7.8, displayValue: 7.8 },
    { year: '2023', value: 10.9, displayValue: 10.9 },
    { year: '2024', value: 13.9, displayValue: 13.9 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-24 sm:py-32">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v1H0zM0 0v100h1V0z' fill='%23003d82' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E30613] rounded-full opacity-[0.03] blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-block px-4 py-2 bg-[#003d82]/5 border border-[#003d82]/10 rounded-full mb-6">
                <span className="text-sm font-medium text-[#003d82]">Market Proof</span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl mb-8 text-[#003d82] leading-tight"
            >
              An open market.
              <br />
              <span className="text-gray-600">Not a success story. Yet.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6 text-lg text-gray-600"
            >
              <p className="leading-relaxed">
                Kosovo ICT exports grew +309% between 2020 and 2024 — from €3.4M to €13.9M. The UK currently sits behind Germany (€101M in Kosovo ICT imports) as a destination market.
              </p>
              <p className="leading-relaxed">
                That is not a failure. That is an open market. The infrastructure, the talent, and the momentum are already there.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 grid grid-cols-3 gap-6"
            >
              <div>
                <div className="text-3xl font-bold text-[#003d82] mb-1">+309%</div>
                <div className="text-sm text-gray-600">Export growth 2020–2024</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#003d82] mb-1">€13.9M</div>
                <div className="text-sm text-gray-600">Kosovo ICT exports (2024)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#003d82] mb-1">€101M</div>
                <div className="text-sm text-gray-600">Germany's lead — UK's opportunity</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Export Graph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg p-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-6"
              >
                <h3 className="text-xl font-semibold text-[#003d82] mb-2">
                  Kosovo ICT Total Exports (2020–2024)
                </h3>
                <p className="text-sm text-gray-600">Value in millions EUR · Source: STIKK</p>
              </motion.div>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={exportData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: '#6b7280', fontSize: 14 }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 14 }}
                    axisLine={{ stroke: '#d1d5db' }}
                    label={{ value: '€ Millions', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => [`€${value}M`, 'Export Value']}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {exportData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === exportData.length - 1 ? '#E30613' : '#003d82'}
                  // highlight latest year
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Legend */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-6 flex items-center justify-center gap-6 text-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#003d82]"></div>
                  <span className="text-gray-600">Historical Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#E30613]"></div>
                  <span className="text-gray-600">2024 (latest)</span>
                </div>
              </motion.div>
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -bottom-6 -left-6 bg-[#003d82] text-white p-6 rounded-xl shadow-xl max-w-xs hidden lg:block"
            >
              <div className="text-sm opacity-80 mb-2">The opportunity</div>
              <div className="text-2xl font-bold">UK is behind. That changes now.</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
