import { motion } from 'framer-motion';

const letterVariant = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.035,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

/**
 * AnimatedText — splits text letter-by-letter and staggers each character in.
 * Props:
 *   text: string
 *   className: string (applied to the wrapper span)
 *   tag: 'h1'|'h2'|'h3'|'p'|'span' (default 'span')
 *   once: bool  (default true — only animate once per mount)
 */
export default function AnimatedText({ text = '', className = '', tag = 'span', once = true }) {
  const Tag = motion[tag] ?? motion.span;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariant}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
}
