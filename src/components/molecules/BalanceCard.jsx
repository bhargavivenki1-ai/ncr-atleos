import React from 'react';
import Button from '../atoms/Button';

/**
 * BalanceCard component for displaying account balance with action buttons
 * @param {Object} props - Component props
 * @param {string} props.balance - Account balance amount
 * @param {Function} props.onWithdraw - Withdraw button click handler
 * @param {Function} props.onDeposit - Deposit button click handler
 * @param {string} props.className - Additional CSS classes
 */
const BalanceCard = ({ 
  balance = '$10,500.00', 
  onWithdraw,
  onDeposit,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`bg-[#FDFEFD] rounded-[18px] shadow-[0px_2px_7px_rgba(0,0,0,0.08)] flex flex-col items-center gap-[18px] pb-[18px] w-full ${className}`}
      {...props}
    >
      {/* Card Metadata */}
      <div className="flex flex-col gap-[18px] p-[18px] w-full">
        {/* Card Title */}
        <div className="flex items-center gap-1 w-full">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[17px] leading-[1.26em] tracking-[-0.02em] text-[#1B281E] flex-1">
            Savings Account Balance
          </h2>
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-[15px] leading-[1.35em] text-[rgba(20,46,27,0.62)] text-right">
            Available Balance
          </span>
        </div>
        
        {/* Balance Amount */}
        <div className="flex items-stretch gap-1 w-full">
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-[34px] leading-[1.26em] tracking-[-0.02em] text-[#1B281E] flex-1">
            {balance}
          </span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-stretch gap-2 px-[18px] w-full">
        <Button
          variant="balanceSecondary"
          size="balanceAction"
          onClick={onWithdraw}
          className="flex-1"
          ariaLabel="Withdraw money from account"
        >
          Withdraw
        </Button>
        <Button
          variant="balanceSecondary"
          size="balanceAction"
          onClick={onDeposit}
          className="flex-1"
          ariaLabel="Deposit money to account"
        >
          Deposit
        </Button>
      </div>
    </div>
  );
};

export default BalanceCard;