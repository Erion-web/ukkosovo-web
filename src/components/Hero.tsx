import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Globe, Building2, Users, TrendingUp, Briefcase, Network } from 'lucide-react';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-[90vh] flex items-center">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-[#003d82] rounded-full opacity-[0.07] blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E30613] rounded-full opacity-[0.05] blur-3xl"></div>

      {/* Floating Cards */}
      {/* Kosovo Tech Card - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-44 left-8 sm:left-16 lg:left-24 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-xl w-48"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#003d82]/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#003d82]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <p className="text-sm font-medium text-gray-800">Kosovo Tech Sector</p>
          <p className="text-xs text-gray-600 mt-1">2,000+ ICT Companies</p>
        </motion.div>
      </motion.div>

      {/* UK Innovation Card - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute top-32 right-8 sm:right-16 lg:right-24 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-xl w-48"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#E30613]/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#E30613]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <p className="text-sm font-medium text-gray-800">UK Demand</p>
          <p className="text-xs text-gray-600 mt-1">Digital Skills Gap</p>
        </motion.div>
      </motion.div>

      {/* Partnership Card - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-32 left-8 sm:left-20 lg:left-32 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl w-40"
        >
          <div className="flex items-center justify-between mb-3">
            <Users className="w-5 h-5 text-[#003d82]" />
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xs font-medium text-gray-800">ICT Export Growth</p>
          <p className="text-xl font-bold text-[#003d82] mt-1">+309%</p>
        </motion.div>
      </motion.div>

      {/* Tech Park Card - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-24 right-8 sm:right-20 lg:right-32 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl w-44"
        >
          <div className="w-8 h-8 rounded-lg bg-[#E30613]/10 flex items-center justify-center mb-3">
            <Briefcase className="w-4 h-4 text-[#E30613]" />
          </div>
          <p className="text-xs font-medium text-gray-800">Based at</p>
          <a 
            href="https://www.techpark-prishtina.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-[#003d82] mt-1 hover:underline inline-block"
          >
            Tech Park Prishtina
          </a>
        </motion.div>
      </motion.div>

      {/* Ecosystem Card - Middle Left (Mobile visible) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute top-1/2 left-4 sm:left-12 -translate-y-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl w-36"
        >
          <Network className="w-6 h-6 text-[#003d82] mb-2" />
          <p className="text-xs font-medium text-gray-800">Structured Pipeline</p>
        </motion.div>
      </motion.div>

      {/* Center Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#003d82]/20 rounded-full shadow-sm">
              <p className="text-sm text-[#003d82] font-medium">
                Built by STIKK · Supported by the British Embassy Pristina
              </p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-[#003d82] tracking-tight leading-tight"
          >
            UK–Kosovo Tech Hub
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl sm:text-3xl text-[#E30613] mb-6 font-medium"
          >
            Turning UK demand into Kosovo delivery.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl text-gray-600 mb-3 leading-relaxed max-w-3xl mx-auto"
          >
            A structured pipeline that converts business needs into real partnerships, pilots, and contracts.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-base text-gray-500 mb-10"
          >
            From first meeting to signed deal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 12px 30px rgba(0, 61, 130, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-8 py-4 bg-[#003d82] text-white rounded-lg shadow-md relative overflow-hidden group w-full sm:w-auto"
            >
              <motion.span
                className="absolute inset-0 bg-[#002a5c]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Submit your demand</span>
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('partners')}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#003d82',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-8 py-4 bg-white/60 backdrop-blur-sm border-2 border-gray-300 text-[#003d82] rounded-lg shadow-sm w-full sm:w-auto"
            >
              Join the network
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}