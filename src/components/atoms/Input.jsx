import React, { forwardRef } from 'react';

/**
 * Input component for form inputs with accessibility support
 * @param {Object} props - Component props
 * @param {string} props.type - Input type (text, password, number, etc.)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onBlur - Blur handler
 * @param {Function} props.onFocus - Focus handler
 * @param {boolean} props.disabled - Whether input is disabled
 * @param {boolean} props.required - Whether input is required
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.ariaDescribedBy - ID of element describing this input
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.maxLength - Maximum input length
 * @param {string} props.pattern - Input pattern for validation
 */
const Input = forwardRef(({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  maxLength,
  pattern,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      required={required}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      maxLength={maxLength}
      pattern={pattern}
      className={`pin-input ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;