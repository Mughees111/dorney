interface StatCardProps {
  number: string;
  label: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

export function StatCard({
  number,
  label,
  description,
  className = "",
  style,
}: StatCardProps) {
  return (
    <div
      className={`text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 ${className}`}
      style={style}
    >
      <div className="text-4xl md:text-5xl font-cookie text-gold font-bold mb-2">
        {number}
      </div>
      <div className="text-xl font-poppins font-bold text-white mb-1">
        {label}
      </div>
      <div className="text-gray-300 text-sm">{description}</div>
    </div>
  );
}
