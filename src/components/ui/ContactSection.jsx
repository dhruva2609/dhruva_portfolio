import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import { portfolioData } from '../../constants/portfolioData';
import { Code2, Mail } from 'lucide-react';

// --- Icons ---
const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactSection() {
  return (
    <section
      id="contact"
      /* Centered framing for middle-of-viewport alignment */
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 font-['Inter']"
    >
      <div className="w-full max-w-3xl z-10 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* GlassCard is now bg-transparent to avoid background cutting */}
          <GlassCard className="flex flex-col items-center p-6 md:p-12 text-center relative bg-transparent !bg-opacity-0 border-white/10 shadow-none backdrop-blur-none">

            <span className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-2 md:mb-4">
              — Get In Touch —
            </span>

            {/* Typography Fix: clamp() scales text dynamically to fit width[cite: 2] */}
            <h2 className="text-[clamp(2.3rem,7vw,5rem)] font-black tracking-tighter text-white mb-4 md:mb-6 leading-[1.1]">
              Let's Connect
            </h2>

            <p className="text-xs md:text-lg text-neutral-400 font-medium max-w-lg mb-8 md:mb-10 line-clamp-3 md:line-clamp-none">
              Training & Placement Coordinator, BVM
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { icon: <GithubIcon />, link: `https://${portfolioData.socials.github}` },
                { icon: <LinkedinIcon />, link: `https://${portfolioData.socials.linkedin}`, highlight: true },
                { icon: <Code2 size={20} />, link: `https://${portfolioData.socials.leetcode}` },
                { icon: <Mail size={20} />, link: `mailto:${portfolioData.socials.email}` }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-300 border ${item.highlight
                    ? "bg-blue-600/10 border-blue-500/30 text-blue-400"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/20"
                    }`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}