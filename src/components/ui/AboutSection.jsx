import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import AnimatedText from '../shared/AnimatedText';
import { portfolioData } from '../../constants/portfolioData';

const lineVariant = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function AboutSection() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-start md:justify-center px-[8%] md:px-[12%] pt-20 md:pt-0 font-['Inter'] relative pointer-events-none">
      <div className="w-full md:w-[48%] pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -60, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Eyebrow label */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-blue-400 text-xs font-bold tracking-[0.25em] uppercase mb-3"
          >
            — Who I Am
          </motion.p>

          <AnimatedText
            text="About Me"
            tag="h2"
            once={false}
            className="text-3xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 block"
          />

          {/* Accent line */}
          <motion.div
            variants={lineVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="h-[2px] w-24 bg-gradient-to-r from-blue-500 to-purple-500 mb-8 origin-left"
          />

          <GlassCard>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-medium mb-8">
              {portfolioData.whoIAm}
            </p>
            <hr className="border-white/10 mb-6" />
            <h3 className="text-lg font-bold text-blue-400 mb-5 tracking-tighter">Education</h3>
            <div className="flex flex-col gap-5">
              {portfolioData.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.3 }}
                  className="flex flex-col border-l-2 border-blue-500/30 pl-4"
                >
                  <h4 className="text-base md:text-lg text-white font-bold">{edu.degree}</h4>
                  <p className="text-xs md:text-sm text-neutral-400">{edu.institution} · {edu.duration}</p>
                  <p className="text-xs md:text-sm text-blue-300 font-semibold">{edu.details}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
