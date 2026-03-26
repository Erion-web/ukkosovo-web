import { motion } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from 'figma:asset/4baa6d501d43ea414cd23d33f926749d0f36e0d8.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'about', label: 'What This Is' },
    { id: 'services', label: 'What You Get' },
    { id: 'activities', label: '2026 Programme' },
    { id: 'partners', label: 'Who Backs This' },
    { id: 'contact', label: 'Start Here' },
  ];

  return (
    <>
      {/* Spacer to prevent content from going under fixed header */}
      <div className=""></div>
      
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <img src={logo} alt="UK-Kosovo Tech Hub" className="h-14 w-auto" />
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="px-4 py-2 text-sm text-gray-700 rounded-lg relative group transition-colors hover:text-[#003d82]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                    <motion.span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#003d82] group-hover:w-3/4 transition-all duration-300"
                    />
                  </motion.button>
                ))}
              </nav>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:text-[#003d82] hover:bg-gray-50"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-4 border-t border-gray-100"
              >
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      whileTap={{ scale: 0.98, x: 4 }}
                      className="text-gray-700 hover:text-[#003d82] transition-colors text-left py-2 px-2 rounded-lg hover:bg-gray-50"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>
    </>
  );
}