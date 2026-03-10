import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import CardDetailsForm from '../components/organisms/CardDetailsForm';
import AmountSelection from '../components/organisms/AmountSelection';
import Button from '../components/atoms/Button';
import GestureIndicator from '../components/atoms/GestureIndicator';
import { stageWithdrawal, simulateCardScan } from '../services/atmService';

/**
 * ATMCashWithdrawal page component with integrated backend API
 * Main page for ATM cash withdrawal functionality
 */
const ATMCashWithdrawal = () => {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    fullName: ''
  });
  const [selectedAmount, setSelectedAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Card number validation
    if (!cardDetails.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    }

    // Expiry date validation
    if (!cardDetails.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    // CVV validation
    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    }

    // Full name validation
    if (!cardDetails.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Amount validation
    if (!selectedAmount) {
      newErrors.amount = 'Please select a withdrawal amount before proceeding.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardDetailsChange = (details) => {
    setCardDetails(details);
    // Clear related errors when user starts typing
    if (errors.cardNumber || errors.expiryDate || errors.cvv || errors.fullName) {
      const newErrors = { ...errors };
      if (details.cardNumber !== cardDetails.cardNumber) delete newErrors.cardNumber;
      if (details.expiryDate !== cardDetails.expiryDate) delete newErrors.expiryDate;
      if (details.cvv !== cardDetails.cvv) delete newErrors.cvv;
      if (details.fullName !== cardDetails.fullName) delete newErrors.fullName;
      setErrors(newErrors);
    }
  };

  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
    // Clear amount error when user selects an amount
    if (errors.amount) {
      const newErrors = { ...errors };
      delete newErrors.amount;
      setErrors(newErrors);
    }
  };

  const handleScanCard = async () => {
    try {
      setIsLoading(true);
      
      // Simulate card scanning using the ATM service
      const response = await simulateCardScan();
      
      if (response.success) {
        // Populate card details from scanned data
        setCardDetails({
          cardNumber: response.cardDetails.maskedNumber || '****-****-****-1234',
          expiryDate: '12/25',
          cvv: '***',
          fullName: 'John Doe'
        });
        
        console.log('Card scanned successfully:', response);
        alert('Card scanned successfully!');
      }
    } catch (error) {
      console.error('Card scan failed:', error);
      setErrors({
        submit: 'Card scanning failed. Please enter details manually.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleStageWithdrawal = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Create card token from card details (in real implementation, this would be tokenized securely)
      const cardToken = `tok_${cardDetails.cardNumber.slice(-4)}_${Date.now()}`;
      
      // Call the ATM Staging Service
      const response = await stageWithdrawal({
        cardToken,
        amount: parseFloat(selectedAmount)
      });
      
      console.log('Withdrawal staged successfully:', response);
      
      // Navigate to confirmation screen (would be implemented with router)
      alert(`Withdrawal of $${selectedAmount} has been staged successfully! Transaction ID: ${response.transactionId}`);
      
    } catch (error) {
      console.error('Failed to stage withdrawal:', error);
      setErrors({
        submit: error.message || 'We were unable to stage your withdrawal at this time. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBFA]">
      {/* Header */}
      <Header title="ATM Cash Withdrawal" />
      
      {/* Back to Dashboard Link */}
      <div className="px-[18px] pt-4 pb-2">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 text-[#1B281E] hover:text-[#277C3D] transition-colors"
          aria-label="Back to Dashboard"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[16px]">Back to Dashboard</span>
        </button>
      </div>
      
      {/* Main Content */}
      <main className="flex flex-col self-stretch flex-1">
        {/* Card Details Form */}
        <CardDetailsForm
          cardDetails={cardDetails}
          onCardDetailsChange={handleCardDetailsChange}
          onScanCard={handleScanCard}
          errors={errors}
        />
        
        {/* Amount Selection */}
        <AmountSelection
          selectedAmount={selectedAmount}
          onAmountChange={handleAmountChange}
          errors={errors}
        />
        
        {/* Submit Button */}
        <div className="flex flex-row justify-stretch items-stretch self-stretch gap-[18px] p-[18px]">
          <Button
            variant="primary"
            size="lg"
            onClick={handleStageWithdrawal}
            disabled={isLoading}
            loading={isLoading}
            ariaLabel="Stage withdrawal"
            className="flex-1"
          >
            {isLoading ? 'Staging...' : 'Proceed'}
          </Button>
        </div>
        
        {/* Submit Error */}
        {errors.submit && (
          <div className="px-[18px] pb-4 text-red-600 text-sm text-center">
            {errors.submit}
          </div>
        )}
      </main>
      
      {/* Bottom Bar */}
      <footer className="flex flex-col justify-end self-stretch bg-[#FFFBFA]">
        <GestureIndicator />
      </footer>
    </div>
  );
};

export default ATMCashWithdrawal;