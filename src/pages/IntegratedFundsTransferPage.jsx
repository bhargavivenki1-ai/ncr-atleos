import React from 'react';
import Header from '../components/organisms/Header';
import FundsTransferForm from '../components/organisms/FundsTransferForm';
import { useNavigate } from 'react-router-dom';
import { transferFunds, getUserAccounts } from '../services/bankingService';

/**
 * FundsTransferPage - Main page component for funds transfer functionality with integrated backend API
 * Implements the complete funds transfer user journey with validation and error handling
 */
const FundsTransferPage = () => {
  const navigate = useNavigate();
  const [accountOptions, setAccountOptions] = React.useState([
    { value: 'savings', label: 'Savings' },
    { value: 'checking', label: 'Checking' },
    { value: 'business', label: 'Business' },
    { value: 'investment', label: 'Investment' }
  ]);

  // Fetch user accounts on component mount
  React.useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getUserAccounts();
        
        if (response.success && response.accounts) {
          // Transform accounts into options format
          const options = response.accounts.map(account => ({
            value: account.id,
            label: `${account.name} (${account.accountNumber})`
          }));
          setAccountOptions(options);
        }
      } catch (error) {
        console.error('Failed to fetch user accounts:', error);
        // Keep default options if API call fails
      }
    };

    fetchAccounts();
  }, []);

  const handleTransferSubmit = async (formData) => {
    try {
      // Call the banking service to transfer funds
      const response = await transferFunds({
        fromAccountId: formData.fromAccount,
        toAccountId: formData.toAccount,
        amount: parseFloat(formData.amount),
        description: formData.description || 'Fund transfer'
      });
      
      if (response.success) {
        console.log('Transfer successful:', response);
        
        // Show success message
        alert(`Transfer of $${formData.amount} completed successfully! Transaction ID: ${response.transactionId}`);
        
        // Navigate to confirmation screen or dashboard
        navigate('/dashboard');
      } else {
        throw new Error(response.message || 'Transfer failed');
      }
    } catch (error) {
      console.error('Transfer error:', error);
      throw new Error(error.message || 'We were unable to process your transfer at this time. Please try again.');
    }
  };

  const handleCancel = () => {
    // Navigate back to dashboard or previous page
    navigate('/dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      {/* Header with Status Bar and Title */}
      <Header 
        title="Transfer Funds"
        time="12:30"
        batteryLevel={85}
        hasWifi={true}
        hasSignal={true}
        className="bg-background"
      />
      
      {/* Back to Dashboard Link */}
      <div className="px-[18px] pt-4 pb-2">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 text-text-primary hover:text-button-primary transition-colors"
          aria-label="Back to Dashboard"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[16px]">Back to Dashboard</span>
        </button>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col" role="main">
        <FundsTransferForm
          onSubmit={handleTransferSubmit}
          onCancel={handleCancel}
          accountOptions={accountOptions}
        />
      </main>
      
      {/* Bottom Gesture Indicator */}
        <div className="flex flex-col justify-end self-stretch">
        <div className="flex justify-center">
          <div className="w-[134px] h-[5px] bg-gesture-indicator rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default FundsTransferPage;