import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import AnimatedText from '../shared/AnimatedText';
import { portfolioData } from '../../constants/portfolioData';

// Map skill categories to icons/colors
const categoryMeta = {
  frontend:     { label: 'Frontend',      color: 'from-blue-500 to-cyan-400' },
  backendTools: { label: 'Backend & Tools', color: 'from-purple-500 to-pink-400' },
  other:        { label: 'Libraries',     color: 'from-emerald-500 to-teal-400' },
  soft:         { label: 'Soft Skills',   color: 'from-orange-400 to-yellow-400' },
};

const chipVariant = {
  hidden: { opacity: 0, scale: 0.7, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

export default function SkillsSection() {
  return (
    <div className="w-screen h-screen flex flex-col items-end justify-center px-[8%] md:px-[12%] font-['Inter'] pointer-events-none">
      <div className="w-full md:w-[50%] pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: 60, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-right"
        >
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-blue-400 text-xs font-bold tracking-[0.25em] uppercase mb-3"
          >
            What I Know —
          </motion.p>

          <AnimatedText
            text="Capabilities"
            tag="h2"
            once={false}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 block"
          />

          <GlassCard className="text-left">
            {Object.entries(portfolioData.skills).map(([category, skills], catIdx) => {
              const meta = categoryMeta[category] ?? { label: category, color: 'from-white to-gray-300' };
              return (
                <div key={category} className={catIdx > 0 ? 'mt-6' : ''}>
                  <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 bg-gradient-to-r ${meta.color} bg-clip-text text-transparent`}>
                    {meta.label}
                  </p>
                  <motion.div
                    variants={containerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex flex-wrap gap-2"
                  >
                    {skills.map((skill, i) => (
                      <motion.span
                        variants={chipVariant}
                        key={i}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold tracking-tight hover:bg-white/15 hover:border-blue-400/40 transition-all cursor-default hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
