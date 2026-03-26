import { motion } from 'motion/react';
import stikkLogo from 'figma:asset/20216ac0910c0c4e0c889dc574ca3f57615f3974.png';
import britishEmbassyLogo from 'figma:asset/0fdcdc71f15e58fcee17990b70758e7b0ba427f8.png';
import techParkLogo from 'figma:asset/b918388aca485532066415510a87ade50bd1aa9f.png';

export function Partners() {
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
    <section id="partners" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-[#003d82] opacity-5 rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-[#E30613] opacity-[0.03]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl mb-6 text-[#003d82]">
            Who Backs This
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Companies including BAE Systems, Vodafone UK, and BT have engaged with the Kosovo tech sector. This Hub makes that kind of engagement systematic, repeatable, and accessible.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* STIKK */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -6,
              boxShadow: '0 12px 30px rgba(0, 61, 130, 0.12)',
            }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-xl flex items-center justify-center border border-gray-200/50 group shadow-sm"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-24 mx-auto mb-4 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500"
              >
                <img src={stikkLogo} alt="STIKK" className="h-20 object-contain" />
              </motion.div>
              <p className="text-sm font-medium text-gray-800 mb-1">STIKK</p>
              <p className="text-xs text-gray-500">Kosovo ICT Association · Lead organisation</p>
            </div>
          </motion.div>

          {/* British Embassy */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -6,
              boxShadow: '0 12px 30px rgba(0, 61, 130, 0.12)',
            }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-xl flex items-center justify-center border border-gray-200/50 group shadow-sm"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-24 mx-auto mb-4 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500"
              >
                <img src={britishEmbassyLogo} alt="British Embassy Pristina" className="h-20 object-contain" />
              </motion.div>
              <p className="text-sm font-medium text-gray-800 mb-1">British Embassy Pristina</p>
              <p className="text-xs text-gray-500">Institutional support · Diplomatic credibility</p>
            </div>
          </motion.div>

          {/* Tech Park Prishtina */}
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -6,
              boxShadow: '0 12px 30px rgba(0, 61, 130, 0.12)',
            }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-xl flex items-center justify-center border border-gray-200/50 sm:col-span-2 lg:col-span-1 group shadow-sm"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-24 mx-auto mb-4 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500"
              >
                <img src={techParkLogo} alt="Tech Park Prishtina" className="h-20 object-contain" />
              </motion.div>
              <p className="text-sm font-medium text-gray-800 mb-1">Tech Park Prishtina</p>
              <p className="text-xs text-gray-500">Physical base · Kosovo's primary technology facility</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}