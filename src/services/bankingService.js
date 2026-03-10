/**
 * Banking Service - Handles banking-related API calls
 * Integrates with backend core banking service
 */

import apiClient from './apiClient';

/**
 * Get account balances
 * @returns {Promise<Object>} Account balances
 */
export const getAccountBalances = async () => {
  try {
    const response = await apiClient.get('/banking/accounts/balance');
    
    return {
      success: true,
      accounts: response.accounts,
      message: response.message || 'Balances retrieved successfully',
    };
  } catch (error) {
    console.error('Get Account Balances Error:', error);
    
    // Handle specific error cases
    if (error.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }
    
    if (error.status >= 500) {
      throw new Error('Banking service is temporarily unavailable. Please try again later.');
    }
    
    throw new Error(error.message || 'Failed to retrieve account balances');
  }
};

/**
 * Get user accounts
 * @returns {Promise<Object>} User accounts
 */
export const getUserAccounts = async () => {
  try {
    const response = await apiClient.get('/banking/accounts');
    
    return {
      success: true,
      accounts: response.accounts,
    };
  } catch (error) {
    console.error('Get User Accounts Error:', error);
    
    if (error.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }
    
    throw new Error(error.message || 'Failed to retrieve accounts');
  }
};

/**
 * Transfer funds between accounts
 * @param {Object} transferData - Transfer details
 * @param {string} transferData.fromAccountId - Source account ID
 * @param {string} transferData.toAccountId - Destination account ID
 * @param {number} transferData.amount - Transfer amount
 * @param {string} [transferData.description] - Optional description
 * @returns {Promise<Object>} Transfer response
 */
export const transferFunds = async (transferData) => {
  try {
    const { fromAccountId, toAccountId, amount, description } = transferData;
    
    // Validate input
    if (!fromAccountId || !toAccountId || !amount) {
      throw new Error('From account, to account, and amount are required');
    }
    
    if (fromAccountId === toAccountId) {
      throw new Error('Source and destination accounts cannot be the same');
    }
    
    if (amount <= 0 || amount > 5000) {
      throw new Error('Amount must be between $0.01 and $5,000.00');
    }
    
    const payload = {
      fromAccountId,
      toAccountId,
      amount: parseFloat(amount),
    };
    
    if (description) {
      payload.description = description.trim();
    }
    
    const response = await apiClient.post('/banking/transfers', payload);
    
    return {
      success: true,
      transactionId: response.transactionId,
      status: response.status,
      amount: response.amount,
      fromAccountId: response.fromAccountId,
      toAccountId: response.toAccountId,
      completedAt: response.completedAt,
      message: response.message || 'Transfer completed successfully',
    };
  } catch (error) {
    console.error('Transfer Funds Error:', error);
    
    // Handle specific error cases
    if (error.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }
    
    if (error.status === 400) {
      throw new Error(error.message || 'Invalid transfer details');
    }
    
    if (error.status === 409) {
      throw new Error('Insufficient funds or account conflict');
    }
    
    if (error.status >= 500) {
      throw new Error('Banking service is temporarily unavailable. Please try again later.');
    }
    
    throw new Error(error.message || 'Transfer failed');
  }
};

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} [currency='USD'] - Currency code
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};