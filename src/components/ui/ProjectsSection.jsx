import { motion } from 'framer-motion';
import AnimatedText from '../shared/AnimatedText';
import { portfolioData } from '../../constants/portfolioData';

const cardVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', damping: 22, stiffness: 120 },
  },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

// Featured projects (first 2) get a larger accent
const accentsFeatured = [
  'from-blue-600/50 to-cyan-500/30 border-blue-400/30',
  'from-purple-600/50 to-pink-500/30 border-purple-400/30',
];
const accentsRegular = [
  'from-emerald-600/30 to-teal-500/15 border-emerald-400/20',
  'from-orange-500/30 to-yellow-400/15 border-orange-400/20',
  'from-rose-600/30 to-pink-400/15 border-rose-400/20',
];

export default function ProjectsSection() {
  const featured = portfolioData.projects.slice(0, 2);
  const regular = portfolioData.projects.slice(2);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start md:justify-center px-4 md:px-[8%] py-16 md:py-20 font-['Inter'] pointer-events-none relative z-10">
      <div className="pointer-events-auto w-full max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <AnimatedText
            text="Projects"
            tag="h2"
            once={false}
            className="text-4xl md:text-8xl font-extrabold tracking-tighter text-white block"
          />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-neutral-500 text-sm font-medium tracking-widest uppercase hidden md:block"
          >
            Selected Work · {portfolioData.projects.length} Projects
          </motion.span>
        </div>

        {/* ── Featured row (2 large cards) ── */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          {featured.map((item, i) => (
            <motion.a
              href={item.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariant}
              whileHover={{ y: -10, transition: { duration: 0.22 } }}
              key={item.name}
              className={`relative p-8 rounded-[2rem] bg-black/25 backdrop-blur-[24px] border transition-all duration-300 cursor-pointer shadow-2xl group overflow-hidden flex flex-col hover:shadow-blue-500/10 ${accentsFeatured[i]}`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${accentsFeatured[i].split(' ')[0]} ${accentsFeatured[i].split(' ')[1]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]`} />

              {/* Number */}
              <span className="text-7xl font-black text-white/5 absolute top-3 right-6 select-none group-hover:text-white/10 transition-all duration-300 leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10 flex flex-col flex-grow">
                {/* Highlight badge */}
                {item.highlight && (
                  <span className="self-start mb-4 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold tracking-widest uppercase">
                    {item.highlight}
                  </span>
                )}

                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white mb-3">{item.name}</h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 flex-grow">{item.desc}</p>

                {/* Stack chips */}
                {item.stack && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center text-blue-400 font-bold uppercase tracking-widest text-xs group-hover:text-blue-300 transition-colors">
                  <span>View Project</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* ── Regular row (3 smaller cards) ── */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {regular.map((item, i) => (
            <motion.a
              href={item.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.22 } }}
              key={item.name}
              className={`relative p-7 rounded-[1.75rem] bg-black/20 backdrop-blur-[24px] border border-white/8 hover:border-white/20 transition-all duration-300 cursor-pointer shadow-xl group overflow-hidden flex flex-col`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accentsRegular[i % accentsRegular.length].split(' border')[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.75rem]`} />

              <span className="text-5xl font-black text-white/5 absolute top-3 right-5 select-none group-hover:text-white/10 transition-all duration-300 leading-none">
                {String(i + 3).padStart(2, '0')}
              </span>

              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tighter text-white mb-3">{item.name}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-5 flex-grow">{item.desc}</p>

                {item.stack && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[10px] font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center text-neutral-500 group-hover:text-white font-bold uppercase tracking-widest text-xs transition-colors">
                  <span>View Project</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
