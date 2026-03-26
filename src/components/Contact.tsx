import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
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
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl mb-6 text-[#003d82]">
            Start Here
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us what you need. We will tell you directly whether and how the Hub can help you.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 61, 130, 0.15)' }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 backdrop-blur-md rounded-xl shadow-md overflow-hidden border border-white/50 p-10"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#003d82] flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4 text-[#003d82]">Submit your demand · Join as a partner · Start a conversation</h3>
              <p className="text-gray-600 mb-6">
                Not sure where you fit? Send us a message. Applications for the 2026 cycle are open now.
              </p>
              <motion.a
                href="mailto:info@ukkosovohub.tech"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block text-2xl text-[#003d82] hover:text-[#E30613] transition-colors font-medium"
              >
                info@ukkosovohub.tech
              </motion.a>
              
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#E30613]" />
                  <p>Tech Park Prishtina, Pristina, Kosovo</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}