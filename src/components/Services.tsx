import { motion } from 'motion/react';
import { Globe, Building2 } from 'lucide-react';

export function Services() {
  const ukServices = [
    'Access to a curated shortlist of pre-vetted Kosovo ICT suppliers matched to your specific requirement',
    'Structured introductions — not cold contacts',
    'Facilitated meetings, technical briefings, and site visits organised for you',
    'Ongoing pipeline support from first conversation to signed agreement',
    'No sourcing overhead. No wasted time on unqualified vendors.',
  ];

  const kosovoServices = [
    'Direct access to qualified UK demand — companies with real budgets and real briefs',
    'Representation at the UK level through a credible, Embassy-backed channel',
    'Structured matchmaking rather than open-market cold outreach',
    'Participation in a tracked pipeline with measurable commercial outcomes',
    'Exposure to sectors including defence tech, telecoms, financial services, and public sector digital',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-white relative">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003d82] rounded-full opacity-[0.02] blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl mb-6 text-[#003d82]">
            What You Get
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Concrete, business-focused benefits. No fluff.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 gap-8"
        >
          {/* UK Companies */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 61, 130, 0.15)' }}
            transition={{ duration: 0.3 }}
            className="relative p-8 bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#003d82]/10">
                <Globe className="w-6 h-6 text-[#003d82]" />
              </div>
              <h3 className="text-xl text-[#003d82] font-medium">For UK Companies</h3>
            </div>
            <ul className="space-y-3">
              {ukServices.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#003d82] flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kosovo Companies */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(227, 6, 19, 0.12)' }}
            transition={{ duration: 0.3 }}
            className="relative p-8 bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E30613]/10">
                <Building2 className="w-6 h-6 text-[#E30613]" />
              </div>
              <h3 className="text-xl text-[#003d82] font-medium">For Kosovo Companies</h3>
            </div>
            <ul className="space-y-3">
              {kosovoServices.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#E30613] flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
