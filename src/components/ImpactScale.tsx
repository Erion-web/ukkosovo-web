import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      setCount(Math.floor(startValue + (end - startValue) * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export function ImpactScale() {
  return (
    <section className="relative overflow-hidden bg-white py-32 sm:py-40">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #003d82 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Decorative circle element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border-8 border-[#E30613] opacity-[0.06]"
      ></motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-px w-16 bg-[#E30613] origin-left"
            ></motion.div>
            <span className="text-sm uppercase tracking-wider text-[#E30613] font-semibold">Impact at Scale</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#003d82] leading-tight mb-6">
            Measurable progress.
            <br />
            <span className="text-gray-600">Meaningful connections.</span>
          </h2>
        </motion.div>

        {/* Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {/* Stat 1 - 150+ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="text-7xl sm:text-8xl font-bold text-[#003d82] leading-none mb-4">
                <motion.span className="inline-block">
                  <CountUp end={150} duration={2.5} />
                  <span className="text-[#E30613]">+</span>
                </motion.span>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="h-1 w-24 bg-[#E30613] mb-4 origin-left"
              ></motion.div>

              <h3 className="text-xl font-medium text-[#003d82] mb-2">
                International Partnerships
              </h3>
              <p className="text-gray-600 text-sm">
                Active collaborations across sectors
              </p>

              {/* Hover glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -inset-6 bg-gradient-to-br from-[#003d82]/5 to-[#E30613]/5 rounded-2xl -z-10 blur-xl"
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          </motion.div>

          {/* Stat 2 - 600+ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative group"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="text-7xl sm:text-8xl font-bold text-[#003d82] leading-none mb-4">
                <motion.span className="inline-block">
                  <CountUp end={600} duration={2.5} />
                  <span className="text-[#E30613]">+</span>
                </motion.span>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="h-1 w-24 bg-[#E30613] mb-4 origin-left"
              ></motion.div>

              <h3 className="text-xl font-medium text-[#003d82] mb-2">
                ICT Companies Connected
              </h3>
              <p className="text-gray-600 text-sm">
                Growing ecosystem of innovation
              </p>

              {/* Hover glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -inset-6 bg-gradient-to-br from-[#003d82]/5 to-[#E30613]/5 rounded-2xl -z-10 blur-xl"
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          </motion.div>

          {/* Stat 3 - 40+ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative group sm:col-span-2 lg:col-span-1"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="text-7xl sm:text-8xl font-bold text-[#003d82] leading-none mb-4">
                <motion.span className="inline-block">
                  <CountUp end={40} duration={2.5} />
                  <span className="text-[#E30613]">+</span>
                </motion.span>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="h-1 w-24 bg-[#E30613] mb-4 origin-left"
              ></motion.div>

              <h3 className="text-xl font-medium text-[#003d82] mb-2">
                Events & Knowledge Exchange
              </h3>
              <p className="text-gray-600 text-sm">
                Annual networking opportunities
              </p>

              {/* Hover glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -inset-6 bg-gradient-to-br from-[#003d82]/5 to-[#E30613]/5 rounded-2xl -z-10 blur-xl"
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 pt-12 border-t border-gray-200 max-w-4xl"
        >
          <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
            Numbers tell a story of growth, but behind every metric is a{' '}
            <span className="text-[#003d82] font-medium">partnership forged</span>, an{' '}
            <span className="text-[#E30613] font-medium">opportunity created</span>, and a{' '}
            <span className="text-[#003d82] font-medium">connection that matters</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
