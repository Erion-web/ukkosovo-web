import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '../utils/supabase/client';

interface Photo {
  id: number;
  url: string;
  created_at: string;
}

export function AIWallPage() {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    supabase
      .from('ai_wall_photos')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setPhotos(data || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('ai_wall_responses')
        .insert({ answer: answer.trim() });

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#003d82] flex flex-col items-center px-4 py-20 relative overflow-hidden">
      {/* Back button */}
      <motion.a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2"
      >
        ← Back
      </motion.a>

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Form / Success */}
      <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center justify-center min-h-[80vh]">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(4rem,15vw,10rem)] font-black text-white leading-none tracking-tighter mb-16"
              >
                AI WALL
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/90 text-xl sm:text-2xl font-medium mb-10"
              >
                How do you see UK Kosovo Tech Hub?
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={5}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all resize-none text-lg"
                />

                {error && <p className="text-[#E30613] text-sm">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={loading || !answer.trim()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#003d82] rounded-2xl font-bold text-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-[#003d82]/30 border-t-[#003d82] rounded-full animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                  {loading ? 'Sending...' : 'Submit'}
                </motion.button>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <CheckCircle className="w-20 h-20 text-white mx-auto mb-6" />
              <h2 className="text-4xl font-black text-white mb-4">Thank you!</h2>
              <p className="text-white/70 text-lg mb-10">Your voice has been added to the wall.</p>
              <motion.a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-white text-[#003d82] rounded-2xl font-bold hover:bg-white/90 transition-colors"
              >
                Back to site
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Photo gallery */}
      {photos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl mt-4 pb-8"
        >
          <div className="w-16 h-px bg-white/20 mx-auto mb-10" />
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
