import React, { forwardRef } from 'react';

/**
 * AmountInput component for entering transfer amounts
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
 * @param {string} props.error - Error message
 */
const AmountInput = forwardRef(({
  placeholder = 'Enter Amount',
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  error,
  ...props
}, ref) => {
  return (
    <div className="flex flex-row self-stretch px-4 pr-0">
      <div className="flex flex-row justify-stretch items-stretch gap-2 px-4 w-[153px] h-[50px]">
        <div className="flex flex-row justify-stretch items-stretch self-stretch gap-2 flex-1">
          <div className="flex flex-col gap-1 py-[13.5px] flex-1">
            <div className="flex flex-row items-center self-stretch gap-0.5">
              <span className="font-['Public_Sans'] font-normal text-[15px] leading-[1.35em] tracking-[-0.5%] text-[rgba(235,213,209,0.62)]">
                {placeholder}
              </span>
            </div>
            <div className="flex flex-row items-center self-stretch gap-0.5">
              <span className="font-['Public_Sans'] font-bold text-[17px] leading-[1.17em] tracking-[-2%] text-[#E4DAD7]">
                {value || '$0.00'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-stretch items-stretch gap-2 px-4 py-[14.5px] bg-[rgba(224,191,184,0.12)] border border-[rgba(235,213,209,0.3)] rounded-[16px] h-[50px] flex-1">
        <input
          ref={ref}
          type="number"
          step="0.01"
          min="0"
          placeholder="Enter amount"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          className={`flex-1 bg-transparent border-none outline-none font-['Public_Sans'] font-medium text-[17px] leading-[1.35em] text-center text-[#E4DAD7] placeholder-[rgba(235,213,209,0.62)] ${className}`}
          {...props}
        />
      </div>
    </div>
  );
});

AmountInput.displayName = 'AmountInput';

export default AmountInput;