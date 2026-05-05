import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import AnimatedText from '../shared/AnimatedText';
import { portfolioData } from '../../constants/portfolioData';
import { Code2, Mail } from 'lucide-react';

// Custom SVG for GitHub since it's missing in this version of lucide-react
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom SVG for LinkedIn since it's missing in this version of lucide-react
const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactSection() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center text-center px-[8%] md:px-[12%] font-['Inter'] pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <GlassCard className="flex flex-col items-center p-6 md:p-16 relative overflow-hidden">
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
              className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 block relative z-10"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm md:text-xl text-neutral-300 font-medium mb-2 max-w-2xl leading-relaxed relative z-10"
            >
              {portfolioData.stats}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-6 mt-6 relative z-10"
            >
              <a
                href={`https://${portfolioData.socials.github}`}
                target="_blank" rel="noreferrer"
                aria-label="GitHub"
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg backdrop-blur-md group"
              >
                <GithubIcon size={24} className="group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href={`https://${portfolioData.socials.linkedin}`}
                target="_blank" rel="noreferrer"
                aria-label="LinkedIn"
                className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-xl backdrop-blur-md shadow-blue-500/20"
              >
                <LinkedinIcon size={24} />
              </a>
              <a
                href={`https://${portfolioData.socials.leetcode}`}
                target="_blank" rel="noreferrer"
                aria-label="LeetCode"
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg backdrop-blur-md group"
              >
                <Code2 size={24} className="group-hover:text-orange-400 transition-colors" />
              </a>
              <a
                href={`mailto:${portfolioData.socials.email}`}
                aria-label="Email"
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg backdrop-blur-md group"
              >
                <Mail size={24} className="group-hover:text-emerald-400 transition-colors" />
              </a>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
