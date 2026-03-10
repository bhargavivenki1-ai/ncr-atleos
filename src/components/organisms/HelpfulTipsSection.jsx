import React from 'react';
import TipItem from '../molecules/TipItem';

/**
 * HelpfulTipsSection organism component for displaying helpful tips
 * @param {Object} props - Component props
 * @param {Array} props.tips - Array of tip objects with title and iconName
 * @param {Function} props.onTipClick - Handler for tip item clicks
 * @param {string} props.className - Additional CSS classes
 */
const HelpfulTipsSection = ({ 
  tips = [
    { id: 'interest', title: 'Understanding interest rates', iconName: 'info' },
    { id: 'budgeting', title: 'Budgeting tips', iconName: 'chart' },
    { id: 'customer-care', title: 'Contact Customer Care', iconName: 'phone' },
    { id: 'security', title: 'Security tips', iconName: 'shield' }
  ],
  onTipClick,
  className = '',
  ...props 
}) => {
  const handleTipClick = (tipId) => {
    if (onTipClick) {
      onTipClick(tipId);
    }
  };

  return (
    <div 
      className={`flex flex-col w-full pb-[18px] ${className}`}
      {...props}
    >
      {/* Section Title */}
      <div className="flex flex-col pb-3 w-full">
        <div className="flex items-stretch pt-[28px] px-[18px] pb-[2px] w-full">
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[17px] leading-[1.26em] tracking-[-0.02em] text-[#1B281E] flex-1">
            Helpful Tips
          </h3>
        </div>
      </div>
      
      {/* Tips List */}
      <div className="flex flex-col w-full">
        {tips.map((tip) => (
          <TipItem
            key={tip.id}
            title={tip.title}
            iconName={tip.iconName}
            onClick={() => handleTipClick(tip.id)}
            aria-label={`Learn about ${tip.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpfulTipsSection;