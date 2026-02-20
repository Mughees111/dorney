import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  children,
  subtitle,
  centered = true,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 ${className}`}>
      {subtitle && (
        <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark">
        {children}
      </h2>
    </div>
  );
}
