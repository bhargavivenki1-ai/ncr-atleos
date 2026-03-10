/**
 * ATM Service - Handles ATM-related API calls
 * Integrates with backend ATM staging service
 */

import apiClient from './apiClient';

/**
 * Stage a cash withdrawal transaction
 * @param {Object} withdrawalData - Withdrawal details
 * @param {string} withdrawalData.cardToken - Tokenized card data
 * @param {number} withdrawalData.amount - Withdrawal amount
 * @returns {Promise<Object>} Transaction response
 */
export const stageWithdrawal = async (withdrawalData) => {
  try {
    const { cardToken, amount } = withdrawalData;
    
    // Validate input
    if (!cardToken || !amount) {
      throw new Error('Card token and amount are required');
    }
    
    if (amount <= 0 || amount > 1000) {
      throw new Error('Amount must be between $0.01 and $1000.00');
    }
    
    const response = await apiClient.post('/atm/transactions/withdrawal', {
      cardToken,
      amount: parseFloat(amount),
    });
    
    return {
      success: true,
      transactionId: response.transactionId,
      status: response.status,
      amount: response.amount,
      estimatedCompletionTime: response.estimatedCompletionTime,
      message: response.message || 'Withdrawal staged successfully',
    };
  } catch (error) {
    console.error('ATM Withdrawal Error:', error);
    
    // Handle specific error cases
    if (error.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }
    
    if (error.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }
    
    if (error.status >= 500) {
      throw new Error('ATM service is temporarily unavailable. Please try again later.');
    }
    
    throw new Error(error.message || 'Failed to stage withdrawal');
  }
};

/**
 * Stage a cash deposit transaction
 * @param {Object} depositData - Deposit details
 * @param {string} depositData.cardToken - Tokenized card data
 * @param {number} [depositData.amount] - Optional deposit amount
 * @returns {Promise<Object>} Transaction response
 */
export const stageDeposit = async (depositData) => {
  try {
    const { cardToken, amount } = depositData;
    
    // Validate input
    if (!cardToken) {
      throw new Error('Card token is required');
    }
    
    if (amount && (amount <= 0 || amount > 10000)) {
      throw new Error('Amount must be between $0.01 and $10,000.00');
    }
    
    const payload = { cardToken };
    if (amount) {
      payload.amount = parseFloat(amount);
    }
    
    const response = await apiClient.post('/atm/transactions/deposit', payload);
    
    return {
      success: true,
      transactionId: response.transactionId,
      status: response.status,
      amount: response.amount,
      estimatedCompletionTime: response.estimatedCompletionTime,
      message: response.message || 'Deposit staged successfully',
    };
  } catch (error) {
    console.error('ATM Deposit Error:', error);
    
    // Handle specific error cases
    if (error.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }
    
    if (error.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }
    
    if (error.status >= 500) {
      throw new Error('ATM service is temporarily unavailable. Please try again later.');
    }
    
    throw new Error(error.message || 'Failed to stage deposit');
  }
};

/**
 * Simulate card scan for testing
 * @returns {Promise<Object>} Scanned card data
 */
export const simulateCardScan = async () => {
  try {
    const response = await apiClient.post('/atm/scan-card');
    
    return {
      success: true,
      cardToken: response.cardToken,
      cardDetails: response.cardDetails,
      message: response.message || 'Card scanned successfully',
    };
  } catch (error) {
    console.error('Card Scan Error:', error);
    throw new Error(error.message || 'Failed to scan card');
  }
};