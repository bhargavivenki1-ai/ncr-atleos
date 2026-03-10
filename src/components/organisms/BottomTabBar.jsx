import React from 'react';
import Icon from '../atoms/Icon';
import GestureIndicator from '../atoms/GestureIndicator';

/**
 * BottomTabBar organism component for navigation
 * @param {Object} props - Component props
 * @param {number} props.activeTab - Currently active tab index
 * @param {Function} props.onTabChange - Handler for tab changes
 * @param {Array} props.tabs - Array of tab objects
 * @param {string} props.className - Additional CSS classes
 */
const BottomTabBar = ({ 
  activeTab = 0,
  onTabChange,
  tabs = [
    { id: 'home', iconName: 'home', label: 'Home' },
    { id: 'transactions', iconName: 'list', label: 'Transactions' },
    { id: 'transfer', iconName: 'transfer', label: 'Transfer' },
    { id: 'settings', iconName: 'settings', label: 'Settings' },
    { id: 'profile', iconName: 'user', label: 'Profile' }
  ],
  className = '',
  ...props 
}) => {
  const handleTabClick = (tabIndex, tabId) => {
    if (onTabChange) {
      onTabChange(tabIndex, tabId);
    }
  };

  return (
    <div 
      className={`flex flex-col gap-1 pt-1 w-full bg-[#FBFEFC] ${className}`}
      {...props}
    >
      {/* Tabs */}
      <div className="flex items-stretch w-full">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(index, tab.id)}
            className={`flex-1 flex items-center justify-center p-3 transition-colors duration-200 ${
              activeTab === index 
                ? 'text-[#298441]' 
                : 'text-[rgba(20,46,27,0.62)] hover:text-[#1B281E]'
            }`}
            aria-label={tab.label}
            role="tab"
            aria-selected={activeTab === index}
          >
            <div className="flex items-center justify-center">
              <Icon 
                name={tab.iconName} 
                className="w-6 h-6" 
                aria-hidden="true"
              />
            </div>
          </button>
        ))}
      </div>
      
      {/* Gesture Indicator */}
      <div className="flex justify-center w-full">
        <GestureIndicator className="bg-[rgba(39,124,61,0.09)]" />
      </div>
    </div>
  );
};

export default BottomTabBar;