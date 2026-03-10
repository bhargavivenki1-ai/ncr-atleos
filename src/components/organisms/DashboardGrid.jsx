import React from 'react';
import DashboardTile from '../molecules/DashboardTile';

/**
 * DashboardGrid organism component - Grid layout for dashboard navigation tiles
 * Displays four main banking function tiles in a responsive grid
 * @param {Object} props - Component props
 * @param {Function} props.onSavingsTileClick - Handler for Savings tile click
 * @param {Function} props.onCashDepositTileClick - Handler for Cash Deposit tile click
 * @param {Function} props.onBalanceEnquiryTileClick - Handler for Balance Enquiry tile click
 * @param {Function} props.onTransferFundsTileClick - Handler for Transfer Funds tile click
 * @param {string} props.className - Additional CSS classes
 */
const DashboardGrid = ({ 
  onSavingsTileClick,
  onCashDepositTileClick,
  onBalanceEnquiryTileClick,
  onTransferFundsTileClick,
  className = '',
  ...props 
}) => {
  // Icon components for each tile (placeholder SVGs based on Figma design)
  const SavingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );

  const CashDepositIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
    </svg>
  );

  const BalanceEnquiryIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.11 2 2 3.11 2 4.5v15C2 20.89 3.11 22 4.5 22h15c1.39 0 2.5-1.11 2.5-2.5v-15C22 3.11 20.89 2 19.5 2zM20 19.5c0 .28-.22.5-.5.5h-15c-.28 0-.5-.22-.5-.5v-12h16v12z"/>
    </svg>
  );

  const TransferFundsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  return (
    <div 
      className={`
        grid grid-cols-2 gap-4 p-2 px-4 pb-4 self-stretch
        ${className}
      `}
      role="grid"
      aria-label="Banking services navigation"
      {...props}
    >
      {/* Savings Tile */}
      <div className="aspect-square" role="gridcell">
        <DashboardTile
          title="Savings"
          subtitle="$0.00"
          icon={<SavingsIcon />}
          onClick={onSavingsTileClick}
          ariaLabel="Navigate to Savings account"
        />
      </div>

      {/* Cash Deposit Tile */}
      <div className="aspect-square" role="gridcell">
        <DashboardTile
          title="Cash Deposit"
          icon={<CashDepositIcon />}
          onClick={onCashDepositTileClick}
          ariaLabel="Navigate to Cash Deposit"
        />
      </div>

      {/* Balance Enquiry Tile */}
      <div className="aspect-square" role="gridcell">
        <DashboardTile
          title="Balance Enquiry"
          icon={<BalanceEnquiryIcon />}
          onClick={onBalanceEnquiryTileClick}
          ariaLabel="Navigate to Balance Enquiry"
        />
      </div>

      {/* Transfer Funds Tile */}
      <div className="aspect-square" role="gridcell">
        <DashboardTile
          title="Transfer Funds"
          icon={<TransferFundsIcon />}
          onClick={onTransferFundsTileClick}
          ariaLabel="Navigate to Transfer Funds"
        />
      </div>
    </div>
  );
};

export default DashboardGrid;