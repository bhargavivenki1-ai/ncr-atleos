import React from 'react';
import Button from '../atoms/Button';

/**
 * ActionButtons component for Submit and Cancel buttons
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Submit button click handler
 * @param {Function} props.onCancel - Cancel button click handler
 * @param {boolean} props.isSubmitting - Whether form is submitting
 * @param {boolean} props.isFormValid - Whether form is valid
 */
const ActionButtons = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
  isFormValid = false
}) => {
  return (
    <div className="flex flex-col self-stretch gap-4">
      {/* Submit Button */}
      <div className="flex flex-row justify-stretch items-stretch self-stretch gap-4 px-4">
        <Button
          variant="fundsTransferPrimary"
          size="fundsTransferLarge"
          onClick={onSubmit}
          disabled={!isFormValid || isSubmitting}
          loading={isSubmitting}
          type="submit"
          ariaLabel="Submit transfer"
          className="flex-1"
        >
          Submit
        </Button>
      </div>
      
      {/* Cancel Button */}
      <div className="flex flex-row justify-stretch items-stretch self-stretch gap-4 px-4">
        <Button
          variant="fundsTransferSecondary"
          size="fundsTransferLarge"
          onClick={onCancel}
          disabled={isSubmitting}
          ariaLabel="Cancel transfer"
          className="flex-1"
        >
          <span className="flex items-center justify-center gap-2">
            {/* Icon placeholder */}
            <span>Cancel</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;