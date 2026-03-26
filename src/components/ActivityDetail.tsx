import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ActivityDetailProps {
  activityId: number;
}

export function ActivityDetail({ activityId }: ActivityDetailProps) {
  const { activities } = useAdmin();
  const activity = activities.find(a => a.id === activityId);

  if (!activity) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Activity not found</h1>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="text-[#003d82] hover:text-[#002a5c] underline"
          >
            ← Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Integrated Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[60vh] bg-gray-900 overflow-hidden"
      >
        <ImageWithFallback
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Integrated Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-8 left-8 right-8 z-10"
        >
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </motion.a>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              {activity.title}
            </motion.h1>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-6 text-white/90"
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span className="text-sm">Ongoing Initiative</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="text-sm">UK–Kosovo Tech Hub</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#003d82] mb-6">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {activity.description}
          </p>
        </div>

        {/* About This Initiative */}
        <div className="mb-12 p-8 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-semibold text-[#003d82] mb-4">About This Initiative</h3>
          <div className="space-y-4 text-gray-700">
            {activity.fullContent ? (
              activity.fullContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <>
                <p>
                  This activity is part of our ongoing commitment to strengthen the technology ecosystem 
                  between Kosovo and the United Kingdom. Through strategic partnerships and collaborative 
                  efforts, we aim to create meaningful opportunities for innovation, growth, and international cooperation.
                </p>
                <p>
                  The UK–Kosovo Tech Hub, based at TechPark Prishtina, serves as a catalyst for these 
                  initiatives, bringing together industry leaders, government representatives, and emerging 
                  talent to build a sustainable and vibrant tech community.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Key Objectives */}
        {activity.objectives && activity.objectives.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#003d82] mb-6">Key Objectives</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {activity.objectives.map((objective, index) => (
                <div key={index} className="p-6 bg-white border border-gray-200 rounded-xl">
                  <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-[#003d82]/10' : 'bg-[#E30613]/10'} rounded-lg flex items-center justify-center mb-4`}>
                    <div className={`w-6 h-6 ${index % 2 === 0 ? 'bg-[#003d82]' : 'bg-[#E30613]'} rounded`}></div>
                  </div>
                  <p className="text-gray-600">{objective}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact & Results */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-[#003d82] mb-6">Impact & Results</h3>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Through this initiative, we measure success not just in numbers, but in the quality of 
              connections made, the innovations sparked, and the sustainable growth achieved. Our 
              activities are designed to create long-term value for participants and contribute to 
              the broader mission of strengthening UK-Kosovo relations in the technology sector.
            </p>
            {activity.impact && activity.impact.length > 0 ? (
              <ul className="space-y-2 mt-4">
                {activity.impact.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#003d82] rounded-full mt-2.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#003d82] rounded-full mt-2.5 flex-shrink-0"></span>
                  <span>Enhanced collaboration between UK and Kosovo tech companies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#003d82] rounded-full mt-2.5 flex-shrink-0"></span>
                  <span>Increased investment opportunities and funding access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#003d82] rounded-full mt-2.5 flex-shrink-0"></span>
                  <span>Strengthened professional networks and partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#003d82] rounded-full mt-2.5 flex-shrink-0"></span>
                  <span>Advanced skill development and knowledge transfer</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Get Involved */}
        <div className="p-8 bg-gradient-to-br from-[#003d82] to-[#002a5c] rounded-xl text-white">
          <h3 className="text-2xl font-semibold mb-4">Get Involved</h3>
          <p className="text-white/90 mb-6">
            Interested in participating or learning more about this activity? We welcome organizations 
            and individuals who share our vision for UK-Kosovo tech collaboration.
          </p>
          <a
            href="mailto:info@ukkosovohub.tech"
            className="inline-block px-6 py-3 bg-white text-[#003d82] rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Contact Us
          </a>
        </div>
      </motion.article>

      {/* Footer CTA */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Explore More Activities</h3>
          <p className="text-gray-600 mb-6">
            Discover other ways we're building bridges between Kosovo and the UK
          </p>
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
              setTimeout(() => {
                document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#003d82] text-white rounded-lg hover:bg-[#002a5c] transition-colors"
          >
            <ArrowLeft size={20} />
            View All Activities
          </motion.a>
        </div>
      </div>
    </div>
  );
}