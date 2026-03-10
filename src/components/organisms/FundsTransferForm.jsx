import React, { useState } from 'react';
import DualTextField from '../molecules/DualTextField';
import AmountDisplay from '../molecules/AmountDisplay';
import ActionButtons from '../molecules/ActionButtons';

/**
 * FundsTransferForm organism component for the main transfer form
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Function} props.onCancel - Cancel handler
 * @param {Array} props.accountOptions - Available account options
 */
const FundsTransferForm = ({
  onSubmit,
  onCancel,
  accountOptions = [
    { value: 'savings', label: 'Savings' },
    { value: 'checking', label: 'Checking' }
  ]
}) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fromAccount) {
      newErrors.fromAccount = 'Please select an account to transfer funds from.';
    }
    
    if (!formData.toAccount) {
      newErrors.toAccount = 'Please select an account to transfer funds to.';
    }
    
    if (formData.fromAccount && formData.toAccount && formData.fromAccount === formData.toAccount) {
      newErrors.toAccount = "The 'From' and 'To' accounts cannot be the same.";
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Please enter an amount to transfer.';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter an amount greater than zero.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Transfer failed:', error);
      setErrors({ submit: 'We were unable to process your transfer at this time. No funds have been moved. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFromAccountChange = (e) => {
    setFormData(prev => ({ ...prev, fromAccount: e.target.value }));
    if (errors.fromAccount) {
      setErrors(prev => ({ ...prev, fromAccount: '' }));
    }
  };

  const handleToAccountChange = (e) => {
    setFormData(prev => ({ ...prev, toAccount: e.target.value }));
    if (errors.toAccount) {
      setErrors(prev => ({ ...prev, toAccount: '' }));
    }
  };

  const handleAmountChange = (e) => {
    setFormData(prev => ({ ...prev, amount: e.target.value }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  const isFormValid = formData.fromAccount && formData.toAccount && formData.amount && 
                     formData.fromAccount !== formData.toAccount && 
                     parseFloat(formData.amount) > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col self-stretch">
      {/* Dual Text Fields for Account Selection */}
      <DualTextField
        fromAccount={{ value: formData.fromAccount }}
        toAccount={{ value: formData.toAccount }}
        accountOptions={accountOptions}
        onFromAccountChange={handleFromAccountChange}
        onToAccountChange={handleToAccountChange}
        fromAccountError={errors.fromAccount}
        toAccountError={errors.toAccount}
      />
      
      {/* Amount Display */}
      <AmountDisplay
        amount={formData.amount}
        onAmountChange={handleAmountChange}
        amountError={errors.amount}
      />
      
      {/* Action Buttons */}
      <ActionButtons
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        isFormValid={isFormValid}
      />
      
      {/* Submit Error */}
      {errors.submit && (
        <div className="text-red-500 text-sm mt-4 px-4 text-center">
          {errors.submit}
        </div>
      )}
    </form>
  );
};

export default FundsTransferForm;