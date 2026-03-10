import React, { useState } from 'react';
import SelectionOption from '../molecules/SelectionOption';

/**
 * AmountSelection organism component for withdrawal amount selection
 * @param {Object} props - Component props
 * @param {string} props.selectedAmount - Currently selected amount
 * @param {Function} props.onAmountChange - Amount change handler
 * @param {Array} props.amounts - Available amounts
 * @param {Object} props.errors - Validation errors
 */
const AmountSelection = ({
  selectedAmount = '',
  onAmountChange,
  amounts = ['20', '100'],
  errors = {},
  ...props
}) => {
  const [localSelectedAmount, setLocalSelectedAmount] = useState(selectedAmount);

  const handleAmountSelect = (amount) => {
    setLocalSelectedAmount(amount);
    if (onAmountChange) {
      onAmountChange(amount);
    }
  };

  return (
    <div className="flex flex-col self-stretch bg-[#FFFBFA]" {...props}>
      {/* Table Title */}
      <div className="flex flex-col self-stretch bg-[#FFFBFA]">
        <div className="flex flex-row justify-stretch items-stretch self-stretch py-[28px] px-[18px] pb-1">
          <h2 className="flex-1 font-['Public_Sans'] font-bold text-[22px] leading-[1.30em] tracking-[-2%] text-[#281D1B]">
            Select Amount
          </h2>
        </div>
      </div>

      {/* Subtitle */}
      <div className="flex flex-row justify-stretch items-stretch self-stretch gap-2 px-[18px] pb-1">
        <span className="flex-1 font-['Public_Sans'] font-normal text-[17px] leading-[1.35em] tracking-[-0.5%] text-[#281D1B]">
          Choose Withdrawal Amount
        </span>
      </div>

      {/* Amount Options */}
      <div className="flex flex-col self-stretch gap-2 p-[18px]">
        {amounts.map((amount, index) => (
          <SelectionOption
            key={amount}
            label={`$${amount}`}
            value={amount}
            selected={localSelectedAmount === amount}
            onClick={handleAmountSelect}
            icon="dollar"
            ariaLabel={`Select $${amount} withdrawal amount`}
          />
        ))}
        
        {/* Custom Amount Option */}
        <SelectionOption
          label="Other Amount"
          value="other"
          selected={localSelectedAmount === 'other'}
          onClick={handleAmountSelect}
          icon="dollar"
          ariaLabel="Select other withdrawal amount"
        />
      </div>

      {errors.amount && (
        <div className="px-[18px] pb-2 text-red-600 text-sm">
          {errors.amount}
        </div>
      )}
    </div>
  );
};

export default AmountSelection;