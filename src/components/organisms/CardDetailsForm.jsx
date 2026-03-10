import React, { useState } from 'react';
import TextFieldWithIcon from '../atoms/TextFieldWithIcon';
import TextField from '../atoms/TextField';
import RoundButton from '../atoms/RoundButton';
import Icon from '../atoms/Icon';

/**
 * CardDetailsForm organism component for card details input
 * @param {Object} props - Component props
 * @param {Object} props.cardDetails - Card details object
 * @param {Function} props.onCardDetailsChange - Card details change handler
 * @param {Function} props.onScanCard - Card scan handler
 * @param {Object} props.errors - Validation errors
 */
const CardDetailsForm = ({
  cardDetails = {},
  onCardDetailsChange,
  onScanCard,
  errors = {},
  ...props
}) => {
  const [localCardDetails, setLocalCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    fullName: '',
    ...cardDetails
  });

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    const updatedDetails = {
      ...localCardDetails,
      [field]: value
    };
    setLocalCardDetails(updatedDetails);
    if (onCardDetailsChange) {
      onCardDetailsChange(updatedDetails);
    }
  };

  const handleScanCard = () => {
    if (onScanCard) {
      onScanCard();
    }
  };

  return (
    <div className="flex flex-col self-stretch pb-2" {...props}>
      {/* Table Title */}
      <div className="flex flex-col self-stretch bg-[#FFFBFA]">
        <div className="flex flex-row justify-stretch items-stretch self-stretch py-[28px] px-[18px] pb-1">
          <h2 className="flex-1 font-['Public_Sans'] font-bold text-[22px] leading-[1.30em] tracking-[-2%] text-[#281D1B]">
            Enter Your Card Details
          </h2>
        </div>
      </div>

      {/* Card Number Field */}
      <div className="flex flex-row items-center self-stretch pr-[18px] pl-0">
        <div className="flex-1">
          <TextFieldWithIcon
            placeholder="Card Number"
            value={localCardDetails.cardNumber}
            onChange={handleInputChange('cardNumber')}
            type="text"
            ariaLabel="Card number"
            ariaDescribedBy={errors.cardNumber ? 'card-number-error' : undefined}
            icon={<Icon name="creditCard" size="md" color="rgba(46,24,20,0.62)" />}
          />
        </div>
        <RoundButton
          onClick={handleScanCard}
          ariaLabel="Scan card with camera"
          size="md"
          className="ml-2"
        >
          <Icon name="camera" size="sm" color="#000000" />
        </RoundButton>
      </div>
      {errors.cardNumber && (
        <div id="card-number-error" className="px-[18px] text-red-600 text-sm">
          {errors.cardNumber}
        </div>
      )}

      {/* Expiry Date and CVV */}
      <div className="flex flex-row justify-stretch items-stretch self-stretch">
        <div className="flex-1">
          <TextField
            placeholder="MM/YY"
            value={localCardDetails.expiryDate}
            onChange={handleInputChange('expiryDate')}
            type="text"
            ariaLabel="Expiry date"
            ariaDescribedBy={errors.expiryDate ? 'expiry-date-error' : undefined}
            className="pr-2"
          />
        </div>
        <div className="flex-1">
          <TextField
            placeholder="CVV"
            value={localCardDetails.cvv}
            onChange={handleInputChange('cvv')}
            type="text"
            ariaLabel="CVV"
            ariaDescribedBy={errors.cvv ? 'cvv-error' : undefined}
            className="pl-2"
          />
        </div>
      </div>
      {(errors.expiryDate || errors.cvv) && (
        <div className="px-[18px] text-red-600 text-sm">
          {errors.expiryDate && (
            <div id="expiry-date-error">{errors.expiryDate}</div>
          )}
          {errors.cvv && (
            <div id="cvv-error">{errors.cvv}</div>
          )}
        </div>
      )}

      {/* Full Name */}
      <div className="flex flex-col self-stretch py-2 px-[18px] h-[66px]">
        <TextFieldWithIcon
          placeholder="Full Name"
          value={localCardDetails.fullName}
          onChange={handleInputChange('fullName')}
          type="text"
          ariaLabel="Full name"
          ariaDescribedBy={errors.fullName ? 'full-name-error' : undefined}
          icon={<Icon name="user" size="md" color="rgba(46,24,20,0.62)" />}
        />
      </div>
      {errors.fullName && (
        <div id="full-name-error" className="px-[18px] text-red-600 text-sm">
          {errors.fullName}
        </div>
      )}
    </div>
  );
};

export default CardDetailsForm;