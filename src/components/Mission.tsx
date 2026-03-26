import { motion } from 'motion/react';
import { TrendingUp, Link2, Network } from 'lucide-react';

export function Mission() {
  const missions = [
    {
      icon: TrendingUp,
      title: 'UK: A Growing Gap',
      description: 'A widening digital skills gap. Rising demand for reliable, cost-effective software and tech services. A need for vetted, delivery-ready partners — not cold vendor lists.',
    },
    {
      icon: Link2,
      title: 'Kosovo: Export-Ready',
      description: '2,000+ active ICT companies. A technically strong, English-speaking, export-ready workforce. Proven capacity to deliver for European and North American clients.',
    },
    {
      icon: Network,
      title: 'The Issue Is Access',
      description: 'The gap is not talent. The gap is not quality. The gap is access and structure. This Hub closes it.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="mission" className="py-20 bg-white relative overflow-hidden">
      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none"></div>
      
      {/* Decorative circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E30613]"
      ></motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl mb-6 text-[#003d82]">
            Why This Matters
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            The infrastructure, the talent, and the momentum are already there. What has been missing is a structured bilateral channel.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 40px rgba(0, 61, 130, 0.15)',
                  transition: { duration: 0.3 },
                }}
                className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-sm border border-white/50"
              >
                <div className="flex items-start mb-4">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#003d82] flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>
                <h3 className="text-xl mb-3 text-[#003d82]">
                  {mission.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {mission.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}