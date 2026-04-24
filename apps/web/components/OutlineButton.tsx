import Link from "next/link";
import React from "react";

interface OutlineButtonProps {
  /** Button label text */
  text: string;
  /** Optional leading icon / emoji */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon / emoji */
  trailingIcon?: React.ReactNode;
  /** When provided the button renders as a Next.js <Link> */
  href?: string;
  onClick?: () => void;
  /** Extra Tailwind classes */
  className?: string;
  id?: string;
  "aria-label"?: string;
  disabled?: boolean;
}

const buttonClasses = [
  "inline-flex items-center gap-2 px-8 py-3.5 rounded-full",
  "border-2 border-primary font-display font-bold text-base cursor-pointer text-foreground",
  "shadow-[0_4px_16px_rgba(253,169,36,0.2)] transition-all duration-200",
  "hover:bg-primary hover:text-white hover:shadow-[0_6px_22px_rgba(253,169,36,0.45)] hover:-translate-y-0.5",
  "disabled:opacity-70 disabled:cursor-not-allowed",
].join(" ");

const OutlineButton: React.FC<OutlineButtonProps> = ({
  text,
  leadingIcon,
  trailingIcon,
  href,
  onClick,
  className = "",
  id,
  "aria-label": ariaLabel,
  disabled,
}) => {
  const inner = (
    <>
      {leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}
      {text}
      {trailingIcon && (
        <span aria-hidden="true" className="text-[0.7rem] opacity-70">
          {trailingIcon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        id={id}
        aria-label={ariaLabel}
        className={`${buttonClasses} ${className}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      id={id}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={`${buttonClasses} ${className}`}
    >
      {inner}
    </button>
  );
};

export default OutlineButton;
