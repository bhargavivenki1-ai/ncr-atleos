import React, { useState, useCallback } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

/**
 * PinForm molecule component for PIN entry with validation
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Form submission handler
 * @param {boolean} props.loading - Whether form is in loading state
 * @param {string} props.error - Error message to display
 * @param {boolean} props.disabled - Whether form is disabled
 * @param {string} props.className - Additional CSS classes
 */
const PinForm = ({ 
  onSubmit, 
  loading = false, 
  error = '', 
  disabled = false,
  className = ''
}) => {
  const [pin, setPin] = useState('');
  const [touched, setTouched] = useState(false);
  
  const handlePinChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 4) {
      setPin(value);
    }
  }, []);
  
  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setTouched(true);
    
    if (pin.length === 4 && onSubmit) {
      onSubmit(pin);
    }
  }, [pin, onSubmit]);
  
  const isValid = pin.length === 4;
  const showError = (error || (touched && !isValid)) && !loading;
  const errorMessage = error || (touched && !isValid ? 'PIN must be 4 digits' : '');
  
  return (
    <form 
      onSubmit={handleSubmit}
      className={`w-full space-y-6 ${className}`}
      noValidate
    >
      {/* PIN Input Section */}
      <div className="space-y-4">
        {/* Question/Instruction */}
        <div className="px-4">
          <h2 
            id="pin-instruction"
            className="text-heading text-text-primary font-semibold text-left"
          >
            Please enter your 4-digit PIN
          </h2>
        </div>
        
        {/* PIN Input Field */}
        <div className="px-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={handlePinChange}
              onBlur={handleBlur}
              disabled={disabled || loading}
              required
              maxLength={4}
              pattern="[0-9]{4}"
              ariaLabel="Enter your 4-digit PIN"
              ariaDescribedBy={showError ? 'pin-error' : 'pin-instruction'}
              className={showError ? 'border-red-500 focus:ring-red-500' : ''}
              autoComplete="off"
              inputMode="numeric"
            />
            
            {/* Error Message */}
            {showError && (
              <div 
                id="pin-error"
                role="alert"
                className="mt-2 text-sm text-red-600"
                aria-live="polite"
              >
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="px-4">
        <Button
          type="submit"
          disabled={!isValid || disabled}
          loading={loading}
          ariaLabel="Continue with PIN"
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default PinForm;