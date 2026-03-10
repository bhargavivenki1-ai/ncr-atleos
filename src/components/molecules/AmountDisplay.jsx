import React from 'react';
import AmountInput from '../atoms/AmountInput';
import Button from '../atoms/Button';

/**
 * AmountDisplay component for showing and entering transfer amounts
 * @param {Object} props - Component props
 * @param {string} props.amount - Current amount value
 * @param {Function} props.onAmountChange - Amount change handler
 * @param {Function} props.onNumericButtonClick - Numeric button click handler
 * @param {string} props.amountError - Amount error message
 */
const AmountDisplay = ({
  amount = '',
  onAmountChange,
  onNumericButtonClick,
  amountError
}) => {
  return (
    <div className="flex flex-col self-stretch">
      <AmountInput
        value={amount}
        onChange={onAmountChange}
        placeholder="Enter Amount"
        ariaLabel="Enter transfer amount"
        ariaDescribedBy={amountError ? 'amount-error' : undefined}
        required
      />
      {amountError && (
        <div id="amount-error" className="text-red-500 text-sm mt-1 px-4">
          {amountError}
        </div>
      )}
    </div>
  );
};

export default AmountDisplay;