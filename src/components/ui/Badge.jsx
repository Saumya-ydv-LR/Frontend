
import React from 'react';
import { cn } from '../../lib/utils'; // Adjusted path

const Badge = ({ className, variant, ...props }) => {
  const baseStyles = "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "bg-red-600 text-neutral-100 border-transparent hover:bg-red-600/80",
    secondary: "bg-neutral-200 text-neutral-800 border-transparent hover:bg-neutral-200/80",
    destructive: "bg-red-700 text-neutral-100 border-transparent hover:bg-red-700/80",
    outline: "text-neutral-800",
  };

  return (
    <div className={cn(baseStyles, variants[variant] || variants.default, className)} {...props} />
  );
};
Badge.displayName = "Badge";

export { Badge };
