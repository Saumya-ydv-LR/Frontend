
import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils'; // Adjusted path

const TooltipContext = createContext({
  isOpen: false,
  openTooltip: () => {},
  closeTooltip: () => {},
  triggerRef: null,
  setTriggerRef: () => {}
});

const TooltipProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRef, setTriggerRef] = useState(null);
  
  const openTooltip = () => setIsOpen(true);
  const closeTooltip = () => setIsOpen(false);

  return (
    <TooltipContext.Provider value={{ isOpen, openTooltip, closeTooltip, triggerRef, setTriggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
};

const Tooltip = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

const TooltipTrigger = ({ children, asChild = false }) => {
  const { openTooltip, closeTooltip, setTriggerRef } = useContext(TooltipContext);
  
  const child = React.Children.only(children);
  
  const triggerProps = {
    ref: (node) => {
      setTriggerRef(node);
      // Handle ref from asChild
      if (typeof child.ref === 'function') {
        child.ref(node);
      }
    },
    onMouseEnter: openTooltip,
    onMouseLeave: closeTooltip,
    onFocus: openTooltip,
    onBlur: closeTooltip,
  };

  if (asChild) {
    return React.cloneElement(child, triggerProps);
  }

  return <button {...triggerProps}>{children}</button>;
};

const TooltipContent = React.forwardRef(({ className, sideOffset = 4, children, ...props }, ref) => {
  const { isOpen, triggerRef } = useContext(TooltipContext);

  if (!isOpen || !triggerRef) return null;
  
  // Basic positioning (can be improved)
  // This is a simplified version. Proper tooltip positioning is complex.
  const rect = triggerRef.getBoundingClientRect();
  const top = rect.bottom + window.scrollY + sideOffset;
  const left = rect.left + window.scrollX + (rect.width / 2);

  return (
    <div
      ref={ref}
      style={{ top: `${top}px`, left: `${left}px`, transform: 'translateX(-50%)' }}
      className={cn(
        "absolute z-50 overflow-hidden rounded-md border bg-white px-3 py-1.5 text-sm text-neutral-700 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TooltipContent.displayName = "TooltipContent";


export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
