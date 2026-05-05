import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../../constants/portfolioData';

/**
 * LetterGlitch Component — Applies a random 'shifting' glitch to letters
 * based on scroll position or on mount.
 */
function LetterGlitch({ text, className }) {
  const { scrollYProgress } = useScroll();

  // Transform scroll position into blur/opacity/glitch-offset
  const blur = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 8, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 0.4, 0]);

  return (
    <motion.h1
      className={className}
      style={{ blur, opacity, color: '#FFFFFF', textShadow: '0 0 10px rgba(59,130,246,0.3)' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          whileHover={{
            x: [0, -2, 2, -1, 1, 0],
            scale: 1.05,
            color: '#60a5fa',
            transition: { duration: 0.25 }
          }}
          transition={{
            delay: 0.4 + i * 0.04,
            duration: 0.7,
            ease: "easeOut",
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal', cursor: 'pointer' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function HeroSection() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-center px-4 font-['Inter'] relative z-50">
      <div className="flex flex-col items-center max-w-7xl relative md:translate-y-6">
        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute -top-28 md:-top-32 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-300 text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-md whitespace-nowrap"
        >
          Available for Hire · 2026
        </motion.div>

        {/* ── Name — Dhruva Pandya — Elite Glitch Blur ── */}
        <LetterGlitch text="Dhruva Pandya" className="text-white text-4xl sm:text-6xl md:text-[8rem] lg:text-[10.5rem] font-black tracking-tighter mb-8 md:mb-2 leading-none relative z-10" />

        {/* ── Role ── */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="text-sm sm:text-xl md:text-2xl font-bold tracking-tight mt-2 md:mt-0 text-blue-400 px-4"
        >
          {portfolioData.role}
        </motion.p>

        {/* ── Quote ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.65 }}
          className="text-[10px] md:text-sm text-neutral-400 font-medium tracking-wide mt-4 md:mt-4 max-w-[280px] md:max-w-xl italic leading-relaxed px-4"
        >
          {portfolioData.quote}
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1 }}
          className="flex gap-5 mt-16 md:mt-12"
        >
          <div
            className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-blue-600 text-white font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase hover:bg-blue-500 transition-all shadow-[0_0_50px_rgba(59,130,246,0.6)] cursor-pointer"
          >
            Explore Portfolio
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none gap-6"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-black">Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </div>
  );
}
