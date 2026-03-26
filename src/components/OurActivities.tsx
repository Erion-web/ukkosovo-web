import { motion } from 'motion/react';
import { useAdmin } from '../contexts/AdminContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function OurActivities() {
  const { activities } = useAdmin();

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
    <section id="activities" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-[#E30613] opacity-5 rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-[#003d82] opacity-[0.03]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl mb-4 text-[#003d82]">
            2026 Programme
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            This is a working pipeline, not a one-time event.
          </motion.p>
          <motion.p variants={itemVariants} className="text-base text-gray-500 max-w-2xl mx-auto">
            Quarterly matchmaking rounds · UK–Kosovo Trade Mission · Sector workshops · Up to 40 companies supported
          </motion.p>
        </motion.div>

        {/* Activities Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {activities.map((activity) => (
            <motion.a
              key={activity.id}
              href={`/activity/${activity.id}`}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', `/activity/${activity.id}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all relative group cursor-pointer block"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#003d82]/0 group-hover:bg-[#003d82]/10 transition-colors duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#003d82] mb-3 group-hover:text-[#002a5c] transition-colors">
                  {activity.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {activity.description}
                </p>
                <span className="text-[#E30613] text-sm font-medium group-hover:underline">
                  Read more →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No activities available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}