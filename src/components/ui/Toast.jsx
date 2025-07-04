
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils'; // Adjusted path

const ToastProvider = ({ children }) => <>{children}</>; // Simplified provider

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const Toast = React.forwardRef(({ className, variant, children, ...props }, ref) => {
  const baseStyles = "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full";
  
  const variants = {
    default: "border bg-white text-neutral-800",
    destructive: "destructive group border-red-600 bg-red-100 text-red-600",
  };
  
  return (
    <li
      ref={ref}
      className={cn(baseStyles, variants[variant] || variants.default, className)}
      {...props}
    >
      {children}
    </li>
  );
});
Toast.displayName = "Toast";

const ToastAction = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-red-300 group-[.destructive]:hover:border-red-600 group-[.destructive]:hover:bg-red-600 group-[.destructive]:hover:text-white group-[.destructive]:focus:ring-red-600",
      className
    )}
    {...props}
  >
    {children}
  </button>
));
ToastAction.displayName = "ToastAction";


const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-neutral-500 opacity-0 transition-opacity hover:text-neutral-800 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));
ToastClose.displayName = "ToastClose";


const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
