interface StatCardProps {
  number: string;
  label: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatCard({ number, label, description, className = '', style }: StatCardProps) {
  return (
    <div 
      className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${className}`}
      style={style}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-3">
        {number}
      </div>
      <h3 className="text-xl md:text-2xl font-poppins font-semibold text-white mb-3">
        {label}
      </h3>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}