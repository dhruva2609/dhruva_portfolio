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
      <div className="flex flex-col items-center">

        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-300 text-xs md:text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-md"
        >
          Available for Hire · 2026
        </motion.div>

        {/* ── Name — Dhruva Pandya — Elite Glitch Blur ── */}
        <LetterGlitch text="Dhruva Pandya" className="text-white text-3xl sm:text-5xl md:text-[8rem] lg:text-[10.5rem] font-black tracking-tighter mb-4 leading-none" />

        {/* ── Role ── */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="text-xl md:text-3xl font-bold tracking-tight mt-6 text-blue-400"
        >
          {portfolioData.role}
        </motion.p>

        {/* ── Quote ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.65 }}
          className="text-sm md:text-base text-neutral-400 font-medium tracking-wide mt-6 max-w-xl italic leading-relaxed"
        >
          {portfolioData.quote}
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.1 }}
            className="flex gap-5 mt-12"
          >
            <div
              className="px-10 py-4 rounded-full bg-blue-600 text-white font-bold tracking-[0.2em] text-xs uppercase hover:bg-blue-500 transition-all shadow-[0_0_50px_rgba(59,130,246,0.6)] cursor-pointer"
              onClick={() => {
                // Since ScrollControls doesn't support easy programmatic scroll, 
                // we depend on the user scrolling as it is a scroll-driven experience.
                // This acts as a visual prompt.
              }}
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-black">Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </div>
  );
}
