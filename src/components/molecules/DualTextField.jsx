import React from 'react';
import AccountSelector from '../atoms/AccountSelector';

/**
 * DualTextField component for From Account and To Account selectors
 * @param {Object} props - Component props
 * @param {Object} props.fromAccount - From account props
 * @param {Object} props.toAccount - To account props
 * @param {Array} props.accountOptions - Available account options
 * @param {Function} props.onFromAccountChange - From account change handler
 * @param {Function} props.onToAccountChange - To account change handler
 * @param {string} props.fromAccountError - From account error message
 * @param {string} props.toAccountError - To account error message
 */
const DualTextField = ({
  fromAccount = {},
  toAccount = {},
  accountOptions = [],
  onFromAccountChange,
  onToAccountChange,
  fromAccountError,
  toAccountError
}) => {
  return (
    <div className="flex flex-row justify-stretch items-stretch self-stretch">
      <div className="flex flex-col p-2 pl-4 flex-1">
        <AccountSelector
          placeholder="From Account"
          value={fromAccount.value}
          onChange={onFromAccountChange}
          options={accountOptions}
          ariaLabel="Select account to transfer from"
          ariaDescribedBy={fromAccountError ? 'from-account-error' : undefined}
          required
        />
        {fromAccountError && (
          <div id="from-account-error" className="text-red-500 text-sm mt-1 px-4">
            {fromAccountError}
          </div>
        )}
      </div>
      <div className="flex flex-col p-2 pr-4 pl-2 flex-1">
        <AccountSelector
          placeholder="To Account"
          value={toAccount.value}
          onChange={onToAccountChange}
          options={accountOptions}
          ariaLabel="Select account to transfer to"
          ariaDescribedBy={toAccountError ? 'to-account-error' : undefined}
          required
        />
        {toAccountError && (
          <div id="to-account-error" className="text-red-500 text-sm mt-1 px-4">
            {toAccountError}
          </div>
        )}
      </div>
    </div>
  );
};

export default DualTextField;