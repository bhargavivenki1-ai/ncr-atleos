import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import PinForm from '../components/molecules/PinForm';
import GestureIndicator from '../components/atoms/GestureIndicator';
import { authenticatePin } from '../services/authService';

/**
 * LoginPage component - Main PIN entry screen
 * Implements all functional requirements from Story-1-Login.md
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
  const MAX_FAILED_ATTEMPTS = 3;
  
  const handlePinSubmit = useCallback(async (pin) => {
    if (isLocked) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await authenticatePin(pin);
      
      if (response.success) {
        // Reset failed attempts on successful login
        setFailedAttempts(0);
        // Navigate to home screen
        navigate('/dashboard', { replace: true });
      } else {
        // Handle failed authentication
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        
        if (newFailedAttempts >= MAX_FAILED_ATTEMPTS) {
          setIsLocked(true);
          setError('For your security, your account has been temporarily locked after too many incorrect attempts. Please contact support.');
        } else {
          setError('The PIN you entered is incorrect. Please try again.');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('We could not log you in at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [navigate, failedAttempts, isLocked]);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Status Bar and Title */}
      <Header title="Enter PIN" />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-0">
        <div className="w-full max-w-md mx-auto">
          <PinForm
            onSubmit={handlePinSubmit}
            loading={loading}
            error={error}
            disabled={isLocked}
          />
        </div>
      </main>
      
      {/* Bottom Gesture Indicator */}
      <footer className="pb-4">
        <GestureIndicator />
      </footer>
    </div>
  );
};

export default LoginPage;