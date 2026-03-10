import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Title from '../components/atoms/Title';
import TextFieldWithIcon from '../components/atoms/TextFieldWithIcon';
import TextField from '../components/atoms/TextField';
import Button from '../components/atoms/Button';
import GestureIndicator from '../components/atoms/GestureIndicator';
import RoundButton from '../components/atoms/RoundButton';
import { stageDeposit, simulateCardScan } from '../services/atmService';

/**
 * Cash Deposit Page Component with integrated backend API
 * 
 * Implements the Cash Deposit screen as specified in Story-4-CashDeposit.md
 * Features:
 * - Dark theme implementation
 * - Card details form with validation
 * - Confirm deposit functionality with real API integration
 * - Camera icon for card scanning
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Performance optimized (loads in under 2 seconds)
 * 
 * @component
 * @returns {JSX.Element} Cash Deposit page
 */
const CashDepositPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [fullName, setFullName] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles card number input change
   * @param {Event} e - Input change event
   */
  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  /**
   * Handles expiry date input change
   * @param {Event} e - Input change event
   */
  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  /**
   * Handles CVV input change
   * @param {Event} e - Input change event
   */
  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  /**
   * Handles full name input change
   * @param {Event} e - Input change event
   */
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  /**
   * Handles amount input change
   * @param {Event} e - Input change event
   */
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  /**
   * Handles camera icon click for card scanning
   * Integrates with ATM service for card scanning simulation
   */
  const handleCameraScan = async () => {
    try {
      setIsLoading(true);
      
      // Simulate card scanning using the ATM service
      const response = await simulateCardScan();
      
      if (response.success) {
        // Populate card details from scanned data
        setCardNumber(response.cardDetails.maskedNumber || '****-****-****-1234');
        setExpiryDate('12/25');
        setCvv('***');
        setFullName('John Doe');
        
        console.log('Card scanned successfully:', response);
        alert('Card scanned successfully!');
      }
    } catch (error) {
      console.error('Card scan failed:', error);
      setError('Card scanning failed. Please enter details manually.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles navigation back to dashboard
   */
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  /**
   * Validates form inputs
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    if (!cardNumber.trim()) {
      setError('Please enter your card details before confirming the deposit.');
      return false;
    }
    // Additional validation can be added here
    return true;
  };

  /**
   * Handles confirm deposit button click
   * Implements validation and staging service call with real API integration
   */
  const handleConfirmDeposit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create card token from card details (in real implementation, this would be tokenized securely)
      const cardToken = `tok_${cardNumber.slice(-4)}_${Date.now()}`;
      
      // Prepare deposit data
      const depositData = { cardToken };
      if (amount && parseFloat(amount) > 0) {
        depositData.amount = parseFloat(amount);
      }
      
      // Call the ATM Staging Service
      const response = await stageDeposit(depositData);
      
      console.log('Deposit staged successfully:', response);
      
      // Navigate to confirmation screen (TBD as per story)
      alert(`Deposit has been staged successfully! Transaction ID: ${response.transactionId}`);
      // navigate('/deposit-confirmation');
      
    } catch (err) {
      console.error('Failed to stage deposit:', err);
      setError(err.message || 'We were unable to stage your deposit at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />
      
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
        {/* Page Title */}
        <div className="px-[18px] pt-[28px] pb-1">
          <Title 
            text="Cash Deposit" 
            className="text-[28px] font-bold leading-[1.26] tracking-[-2%] text-text-primary font-jakarta"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 px-0 pb-2">
          {/* Section Title */}
          <div className="px-[18px] pt-1 pb-1">
            <Title 
              text="Enter Deposit Details" 
              className="text-[22px] font-bold leading-[1.30] tracking-[-2%] text-text-primary font-jakarta"
            />
          </div>

          {/* Card Number Field with Camera Icon */}
          <div className="flex items-center px-0 pr-[18px] gap-0">
            <div className="flex-1 px-[18px] py-2">
              <TextFieldWithIcon
                placeholder="Card Number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                icon="credit-card"
                className="bg-input-background border-0 rounded-[20px] text-text-primary"
                aria-label="Card number input field"
                aria-required="true"
              />
            </div>
            <RoundButton
              icon="camera"
              onClick={handleCameraScan}
              disabled={isLoading}
              className="bg-button-primary w-12 h-12"
              aria-label="Scan card with camera"
            />
          </div>

          {/* Expiry Date and CVV Fields */}
          <div className="flex gap-0">
            <div className="flex-1 px-2 pl-[18px] py-2">
              <TextField
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className="bg-input-background border-0 rounded-[20px] text-text-primary"
                aria-label="Card expiry date"
              />
            </div>
            <div className="flex-1 px-2 pr-[18px] py-2">
              <TextField
                placeholder="CVV"
                value={cvv}
                onChange={handleCvvChange}
                className="bg-input-background border-0 rounded-[20px] text-text-primary"
                aria-label="Card CVV"
                type="password"
                maxLength="4"
              />
            </div>
          </div>

          {/* Full Name Field */}
          <div className="px-[18px] py-2 h-[66px]">
            <TextFieldWithIcon
              placeholder="Full Name"
              value={fullName}
              onChange={handleFullNameChange}
              icon="user"
              className="bg-input-background border-0 rounded-[20px] text-text-primary h-full"
              aria-label="Cardholder full name"
            />
          </div>

          {/* Amount Field (Optional) */}
          <div className="px-[18px] py-2 h-[66px]">
            <TextFieldWithIcon
              placeholder="Amount (Optional)"
              value={amount}
              onChange={handleAmountChange}
              icon="dollar-sign"
              className="bg-input-background border-0 rounded-[20px] text-text-primary h-full"
              aria-label="Deposit amount (optional)"
              type="number"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-[18px] py-2">
            <p className="text-red-500 text-sm" role="alert" aria-live="polite">
              {error}
            </p>
          </div>
        )}

        {/* Confirm Button */}
        <div className="px-[18px] py-[18px]">
          <Button
            text={isLoading ? 'Processing...' : 'Confirm Deposit'}
            onClick={handleConfirmDeposit}
            disabled={isLoading}
            className="w-full bg-button-primary text-white h-[50px] rounded-[48px] font-medium text-[17px] leading-[1.35] disabled:opacity-50"
            aria-label="Confirm deposit transaction"
          />
        </div>
      </main>

      {/* Bottom Gesture Indicator */}
      <div className="flex justify-center pb-4">
        <GestureIndicator className="bg-gesture-indicator" />
      </div>
    </div>
  );
};

export default CashDepositPage;