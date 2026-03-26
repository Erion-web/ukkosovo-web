import { motion } from 'motion/react';
import { Building2, Globe, Users } from 'lucide-react';

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23003d82' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl mb-6 text-[#003d82]">
            What This Is (And Isn't)
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed mb-4">
            This is not a campaign. It is not a one-off trade delegation, a networking event, or a goodwill initiative.
          </motion.p>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed">
            This is a structured system. Built by STIKK and supported by the British Embassy, the UK–Kosovo Tech Hub is a conversion mechanism — a purpose-built pipeline that takes real UK business demand and matches it with qualified Kosovo ICT delivery. Every step is tracked. Every match is intentional. Every outcome is measured.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 61, 130, 0.15)' }}
            transition={{ duration: 0.3 }}
            className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-md border border-gray-200/50 shadow-sm"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-gradient-to-br from-[#003d82]/10 to-[#003d82]/5"
            >
              <Building2 className="w-8 h-8 text-[#003d82]" />
            </motion.div>
            <h3 className="text-xl mb-3 text-[#003d82]">Structured System</h3>
            <p className="text-gray-600">
              A purpose-built pipeline — not a platform, not a campaign. Every interaction has a defined purpose and a tracked outcome.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 61, 130, 0.15)' }}
            transition={{ duration: 0.3 }}
            className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-md border border-gray-200/50 shadow-sm"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-gradient-to-br from-[#E30613]/10 to-[#E30613]/5"
            >
              <Globe className="w-8 h-8 text-[#E30613]" />
            </motion.div>
            <h3 className="text-xl mb-3 text-[#003d82]">Conversion Mechanism</h3>
            <p className="text-gray-600">
              Turns UK demand briefs into qualified supplier shortlists, structured meetings, and signed agreements.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 61, 130, 0.15)' }}
            transition={{ duration: 0.3 }}
            className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-md border border-gray-200/50 shadow-sm"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-lg bg-gradient-to-br from-[#003d82]/10 to-[#003d82]/5"
            >
              <Users className="w-8 h-8 text-[#003d82]" />
            </motion.div>
            <h3 className="text-xl mb-3 text-[#003d82]">Backed by STIKK</h3>
            <p className="text-gray-600">
              Built by Kosovo's ICT Association with institutional support from the British Embassy in Pristina.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}