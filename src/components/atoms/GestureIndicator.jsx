import React from 'react';

/**
 * GestureIndicator component for bottom navigation gesture bar
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
const GestureIndicator = ({ className = '' }) => {
  return (
    <div 
      className={`flex justify-center py-2 ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <div 
        className="w-8 h-1 bg-gesture-indicator rounded-full"
      />
    </div>
  );
};

export default GestureIndicator;