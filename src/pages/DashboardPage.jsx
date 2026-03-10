import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import DashboardGrid from '../components/organisms/DashboardGrid';
import GestureIndicator from '../components/atoms/GestureIndicator';

/**
 * DashboardPage component - Banking App Home Screen
 * Displayed after successful PIN authentication
 * Implements the four navigation tiles as specified in Story-2-Dashboard.md
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear any session data
    sessionStorage.clear();
    localStorage.clear();
    
    // Navigate back to login
    navigate('/login', { replace: true });
  };

  // Navigation handlers for each tile
  const handleSavingsClick = () => {
    // Navigate to ATM Cash Withdrawal screen (as per Story E2-S1)
    console.log('Navigating to Savings/Cash Withdrawal');
    navigate('/cash-withdrawal');
  };

  const handleCashDepositClick = () => {
    console.log('Navigating to Cash Deposit');
    // Navigate to Cash Deposit screen (as per Story-4-CashDeposit.md)
    try {
      navigate('/cash-deposit');
    } catch (error) {
      // Handle navigation error as per acceptance criteria AC-05
      console.error('Navigation error:', error);
      alert('We\'re sorry, we couldn\'t load that screen right now. Please try again.');
    }
  };

  const handleBalanceEnquiryClick = () => {
    console.log('Navigating to Balance Enquiry');
    // Navigate to Balance Enquiry screen (as per Story-5-BalanceEnquiry.md)
    try {
      navigate('/balance-enquiry');
    } catch (error) {
      // Handle navigation error as per acceptance criteria
      console.error('Navigation error:', error);
      alert('We\'re sorry, we couldn\'t load that screen right now. Please try again.');
    }
  };

  const handleTransferFundsClick = () => {
    console.log('Navigating to Transfer Funds');
    // Navigate to Funds Transfer screen (as per Story-6-FundsTransfer.md)
    try {
      navigate('/funds-transfer');
    } catch (error) {
      // Handle navigation error as per acceptance criteria
      console.error('Navigation error:', error);
      alert('We\'re sorry, we couldn\'t load that screen right now. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Status Bar and Title */}
      <Header title="Banking App" />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col self-stretch">
        {/* Dashboard Navigation Grid */}
        <DashboardGrid
          onSavingsTileClick={handleSavingsClick}
          onCashDepositTileClick={handleCashDepositClick}
          onBalanceEnquiryTileClick={handleBalanceEnquiryClick}
          onTransferFundsTileClick={handleTransferFundsClick}
          className="flex-1"
        />
      </main>

      {/* Bottom Tab Bar with Gesture Indicator */}
      <footer className="bg-background flex flex-col self-stretch gap-1 p-1 pt-0">
        <div className="flex justify-center items-center">
          <GestureIndicator />
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;