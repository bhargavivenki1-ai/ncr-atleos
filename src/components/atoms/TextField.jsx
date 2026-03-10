import React, { forwardRef } from 'react';

/**
 * TextField component for text inputs without icons
 * @param {Object} props - Component props
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
 * @param {string} props.type - Input type
 */
const TextField = forwardRef(({
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
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col p-2 px-[18px]">
      <div className="flex flex-row justify-stretch items-stretch self-stretch gap-2 py-[13.5px] px-[13px] bg-[rgba(126,52,37,0.09)] rounded-[20px]">
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
          className={`flex-1 bg-transparent border-none outline-none font-['Public_Sans'] font-normal text-[17px] leading-[1.35em] tracking-[-0.5%] text-[rgba(46,24,20,0.62)] placeholder-[rgba(46,24,20,0.62)] ${className}`}
          {...props}
        />
      </div>
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;