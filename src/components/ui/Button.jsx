
import React from 'react';
import { cn } from '../../lib/utils'; // Adjusted path

const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-red-600 text-neutral-100 hover:bg-red-600/90",
    destructive: "bg-red-700 text-neutral-100 hover:bg-red-700/90",
    outline: "border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-800",
    secondary: "bg-neutral-200 text-neutral-800 hover:bg-neutral-200/80",
    ghost: "hover:bg-neutral-100 hover:text-neutral-800",
    link: "underline-offset-4 hover:underline text-neutral-800",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md text-lg", // Made lg larger for hero button
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant] || variants.default, sizes[size] || sizes.default, className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

export { Button };
