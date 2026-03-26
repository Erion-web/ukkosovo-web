import { motion } from 'motion/react';
import logo from 'figma:asset/4baa6d501d43ea414cd23d33f926749d0f36e0d8.png';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const links = [
    { id: 'about', label: 'What This Is' },
    { id: 'mission', label: 'Why It Matters' },
    { id: 'services', label: 'What You Get' },
    { id: 'activities', label: '2026 Programme' },
    { id: 'partners', label: 'Who Backs This' },
    { id: 'contact', label: 'Start Here' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-8"
        >
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              src={logo}
              alt="UK-Kosovo Tech Hub"
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              A structured pipeline turning UK demand into Kosovo ICT delivery. From first meeting to signed deal.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="text-sm uppercase tracking-wider text-[#003d82] mb-4 font-semibold">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {links.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ x: 4, color: '#003d82' }}
                  transition={{ duration: 0.2 }}
                  className="block text-gray-600 text-sm"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="text-sm uppercase tracking-wider text-[#003d82] mb-4 font-semibold">
              Location
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>TechPark Prishtina</p>
              <p>Bërnicë e Poshtme</p>
              <p>Pristina 10000</p>
              <motion.a
                href="mailto:info@ukkosovohub.tech"
                whileHover={{ x: 2, color: '#E30613' }}
                transition={{ duration: 0.2 }}
                className="block mt-4"
              >
                info@ukkosovohub.tech
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} UK–Kosovo Tech Hub. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              A joint initiative by STIKK and the British Embassy in Pristina
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}