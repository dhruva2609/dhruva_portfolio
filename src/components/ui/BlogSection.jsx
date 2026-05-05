import { motion } from 'framer-motion';
import AnimatedText from '../shared/AnimatedText';
import { portfolioData } from '../../constants/portfolioData';

const itemVariant = {
  hidden: { opacity: 0, x: -40, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 22, stiffness: 120 } },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

export default function BlogSection() {
  return (
    <div className="w-screen min-h-[100dvh] flex flex-col items-start justify-start md:justify-center px-[8%] md:px-[12%] pt-20 md:pt-0 font-['Inter']">
      <div className="w-full md:w-[50%]">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-blue-400 text-xs font-bold tracking-[0.25em] uppercase mb-3"
        >
          — Thoughts & Learnings
        </motion.p>

        <AnimatedText
          text="Recent Writings"
          tag="h2"
          once={false}
          className="text-3xl md:text-7xl font-extrabold tracking-tighter text-white mb-10 block"
        />

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          {portfolioData.blogs.map((blog, idx) => (
            <motion.a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariant}
              whileHover={{ scale: 1.02, x: 8, transition: { duration: 0.2 } }}
              key={idx}
              className="p-6 rounded-2xl bg-black/20 backdrop-blur-[24px] border border-white/8 hover:border-blue-400/30 hover:bg-white/5 transition-all cursor-pointer shadow-lg group flex items-center justify-between no-underline"
            >
              <div>
                <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase mb-1 block">
                  {blog.date}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white tracking-tight group-hover:text-blue-100 transition-colors">
                  {blog.title}
                </h3>
              </div>
              <div className="ml-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white opacity-50 group-hover:opacity-100 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 group-hover:translate-x-1 transition-all flex-shrink-0">
                →
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}