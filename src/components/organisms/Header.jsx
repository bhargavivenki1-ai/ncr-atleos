import React from 'react';
import StatusBar from '../atoms/StatusBar';
import Title from '../atoms/Title';

/**
 * Header organism component containing status bar and navigation title
 * @param {Object} props - Component props
 * @param {string} props.title - Page title to display
 * @param {string} props.time - Current time for status bar
 * @param {number} props.batteryLevel - Battery level for status bar
 * @param {boolean} props.hasWifi - WiFi status for status bar
 * @param {boolean} props.hasSignal - Signal status for status bar
 * @param {string} props.className - Additional CSS classes
 */
const Header = ({ 
  title = 'Enter PIN',
  time = '10:30',
  batteryLevel = 80,
  hasWifi = true,
  hasSignal = true,
  className = ''
}) => {
  return (
    <header 
      className={`bg-background flex flex-col w-full h-26 ${className}`}
      role="banner"
    >
      {/* Status Bar */}
      <StatusBar 
        time={time}
        batteryLevel={batteryLevel}
        hasWifi={hasWifi}
        hasSignal={hasSignal}
      />
      
      {/* Navigation Bar with Title */}
      <div className="flex-1 flex items-center justify-center px-4">
        <Title level="h1" align="center">
          {title}
        </Title>
      </div>
    </header>
  );
};

export default Header;