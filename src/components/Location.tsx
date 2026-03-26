import { motion } from 'motion/react';
import { MapPin, Building, Zap } from 'lucide-react';
import prishtinaMap from 'figma:asset/9655c22dd6bbea8fc8b57a74d58cce016d2871a6.png';

export function Location() {
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
    <section id="location" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v1H0zM0 0v100h1V0z' fill='%23003d82' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Gradient blob */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003d82] rounded-full opacity-[0.03] blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl mb-6 text-[#003d82]">
            Base of Operations
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            UK delegations, site visits, and in-person meetings are hosted at Tech Park Prishtina — the physical anchor of the programme.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl mb-4 text-[#003d82]">
              Tech Park Prishtina
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The Hub operates out of Tech Park Prishtina — Kosovo's primary technology and innovation facility. It serves as the physical anchor for what is otherwise a structured bilateral programme.
            </p>

            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-[#E30613]" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Physical base:</span> Tech Park Prishtina, Kosovo
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 mt-1">
                  <Building className="w-5 h-5 text-[#E30613]" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Hosted here:</span> UK delegations, site visits, and executive meetings
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 mt-1">
                  <Zap className="w-5 h-5 text-[#E30613]" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Bilateral reach:</span> Kosovo infrastructure, UK institutional backing
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            {/* Prishtina Map */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src={prishtinaMap} 
                alt="Prishtina Network Map" 
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}