export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`p-10 rounded-[2rem] bg-black/10 backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] shadow-2xl ${className}`}>
      {children}
    </div>
  );
}
