import React from 'react';
import Header from '../components/organisms/Header';
import FundsTransferForm from '../components/organisms/FundsTransferForm';
import { useNavigate } from 'react-router-dom';

/**
 * FundsTransferPage - Main page component for funds transfer functionality
 * Implements the complete funds transfer user journey with validation and error handling
 */
const FundsTransferPage = () => {
  const navigate = useNavigate();

  const handleTransferSubmit = async (formData) => {
    try {
      // Mock API call - replace with actual service integration
      const response = await mockTransferService(formData);
      
      if (response.success) {
        // Navigate to confirmation screen (TBD)
        console.log('Transfer successful:', response);
        // navigate('/transfer-confirmation', { state: { transferData: response } });
      } else {
        throw new Error(response.message || 'Transfer failed');
      }
    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    // Navigate back to dashboard or previous page
    navigate('/dashboard');
  };

  // Mock service function - replace with actual API integration
  const mockTransferService = async (formData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure scenarios
        const isSuccess = Math.random() > 0.2; // 80% success rate for demo
        
        if (isSuccess) {
          resolve({
            success: true,
            transactionId: `TXN${Date.now()}`,
            fromAccount: formData.fromAccount,
            toAccount: formData.toAccount,
            amount: formData.amount,
            timestamp: new Date().toISOString()
          });
        } else {
          reject(new Error('Core Banking Service is unavailable'));
        }
      }, 2000); // Simulate 2-second processing time
    });
  };

  const accountOptions = [
    { value: 'savings', label: 'Savings' },
    { value: 'checking', label: 'Checking' },
    { value: 'business', label: 'Business' },
    { value: 'investment', label: 'Investment' }
  ];

  return (
    <div className="min-h-screen bg-[#0D0402] text-[#E4DAD7] flex flex-col">
      {/* Header with Status Bar and Title */}
      <Header 
        title="Transfer Funds"
        time="12:30"
        batteryLevel={85}
        hasWifi={true}
        hasSignal={true}
        className="bg-[#0D0402]"
      />
      
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
          <div className="w-[134px] h-[5px] bg-[rgba(218,145,129,0.09)] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default FundsTransferPage;