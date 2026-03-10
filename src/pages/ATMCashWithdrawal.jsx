import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import CardDetailsForm from '../components/organisms/CardDetailsForm';
import AmountSelection from '../components/organisms/AmountSelection';
import Button from '../components/atoms/Button';
import GestureIndicator from '../components/atoms/GestureIndicator';

/**
 * ATMCashWithdrawal page component
 * Main page for ATM cash withdrawal functionality
 */
const ATMCashWithdrawal = () => {
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

  const handleScanCard = () => {
    // Mock card scanning functionality
    console.log('Card scanning initiated');
    // In a real implementation, this would open the camera interface
    alert('Card scanning feature would open camera interface');
  };

  const handleStageWithdrawal = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock API call to stage withdrawal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call the ATM Staging Service
      console.log('Withdrawal staged successfully', {
        cardDetails,
        amount: selectedAmount
      });
      
      // Navigate to confirmation screen (would be implemented with router)
      alert(`Withdrawal of $${selectedAmount} has been staged successfully!`);
      
    } catch (error) {
      console.error('Failed to stage withdrawal:', error);
      setErrors({
        submit: 'We were unable to stage your withdrawal at this time. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBFA]">
      {/* Header */}
      <Header title="ATM Cash Withdrawal" />
      
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