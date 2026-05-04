import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import AnimatedText from '../shared/AnimatedText';
import { portfolioData } from '../../constants/portfolioData';

export default function ContactSection() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start md:justify-center text-center px-[8%] md:px-[12%] pt-20 md:py-0 font-['Inter'] pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <GlassCard className="flex flex-col items-center p-6 md:p-16 relative overflow-hidden">
            {/* Ambient glow orb behind card */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-600/15 via-transparent to-transparent pointer-events-none" />

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-blue-400 text-xs font-bold tracking-[0.25em] uppercase mb-4 relative z-10"
            >
              — Get In Touch
            </motion.p>

            <AnimatedText
              text="Let's Connect"
              tag="h2"
              once={false}
              className="text-3xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 block relative z-10"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-xl text-neutral-300 font-medium mb-2 max-w-2xl leading-relaxed relative z-10"
            >
              {portfolioData.stats}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-sm text-neutral-500 mb-10 relative z-10"
            >
              {portfolioData.socials.email}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-4 relative z-10"
            >
              <a
                href={`https://${portfolioData.socials.github}`}
                target="_blank" rel="noreferrer"
                className="px-8 py-4 rounded-full bg-white/8 border border-white/15 text-white font-bold tracking-widest text-xs uppercase hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                GitHub
              </a>
              <a
                href={`https://${portfolioData.socials.linkedin}`}
                target="_blank" rel="noreferrer"
                className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold tracking-widest text-xs uppercase hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)]"
              >
                LinkedIn
              </a>
              <a
                href={`https://${portfolioData.socials.leetcode}`}
                target="_blank" rel="noreferrer"
                className="px-8 py-4 rounded-full bg-white/8 border border-white/15 text-white font-bold tracking-widest text-xs uppercase hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                LeetCode
              </a>
              <a
                href={`mailto:${portfolioData.socials.email}`}
                className="px-8 py-4 rounded-full bg-white/8 border border-white/15 text-white font-bold tracking-widest text-xs uppercase hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Email Me
              </a>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
