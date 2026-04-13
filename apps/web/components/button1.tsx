import React from 'react';
import Link from 'next/link';

interface Button1Props {
  icon?: React.ReactNode;
  color?: string; // e.g. "bg-primary"
  textColor?: string; // e.g. "text-white"
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Button1: React.FC<Button1Props> = ({
  icon,
  color = 'bg-primary',
  textColor = 'text-white',
  text,
  href,
  onClick,
  className = ''
}) => {
  const baseClasses = `px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:opacity-90 w-full sm:w-auto shadow-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 ${color} ${textColor} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {text}
    </button>
  );
};

export default Button1;
