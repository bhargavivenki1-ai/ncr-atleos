import React from 'react';

/**
 * StatusBar component displays the device status information
 * @param {Object} props - Component props
 * @param {string} props.time - Current time to display
 * @param {number} props.batteryLevel - Battery level (0-100)
 * @param {boolean} props.hasWifi - WiFi connection status
 * @param {boolean} props.hasSignal - Cellular signal status
 * @param {string} props.className - Additional CSS classes
 */
const StatusBar = ({ 
  time = '10:30', 
  batteryLevel = 80, 
  hasWifi = true, 
  hasSignal = true, 
  className = '' 
}) => {
  return (
    <div 
      className={`status-bar px-4 py-2 ${className}`}
      role="banner"
      aria-label="Device status bar"
    >
      <div className="text-status text-text-primary font-semibold">
        {time}
      </div>
      
      <div className="flex items-center space-x-1">
        {/* Signal indicator */}
        {hasSignal && (
          <div 
            className="w-4 h-3 bg-text-primary rounded-sm"
            aria-label="Signal strength"
          />
        )}
        
        {/* WiFi indicator */}
        {hasWifi && (
          <div 
            className="w-4 h-3 bg-text-primary rounded-md"
            aria-label="WiFi connected"
          />
        )}
        
        {/* Battery indicator */}
        <div className="flex items-center">
          <div 
            className="battery-indicator relative"
            aria-label={`Battery level ${batteryLevel}%`}
          >
            <div className="w-6 h-3 border border-text-primary rounded-sm">
              <div 
                className="h-full bg-text-primary rounded-sm transition-all duration-300"
                style={{ width: `${Math.max(0, Math.min(100, batteryLevel))}%` }}
              />
            </div>
            <div className="w-1 h-2 bg-text-primary rounded-r-sm absolute -right-1 top-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;