import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import BalanceCard from '../components/molecules/BalanceCard';
import HelpfulTipsSection from '../components/organisms/HelpfulTipsSection';
import BottomTabBar from '../components/organisms/BottomTabBar';
import { getAccountBalances } from '../services/bankingService';

/**
 * BalanceEnquiryPage component with integrated backend API
 * Displays account balance and helpful tips using real banking service
 * Implements the functional requirements from Story-5-BalanceEnquiry.md
 */
const BalanceEnquiryPage = () => {
  const navigate = useNavigate();
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [personalizedTip, setPersonalizedTip] = useState(null);

  // Fetch account balances from Core Banking Service
  useEffect(() => {
    const fetchBalances = async () => {
      try {
        setLoading(true);
        
        // Call the banking service to get account balances
        const response = await getAccountBalances();
        
        if (response.success && response.accounts) {
          setBalances(response.accounts);
          setError(null);
        } else {
          throw new Error('Failed to retrieve account balances');
        }
      } catch (err) {
        console.error('Failed to fetch balances:', err);
        setError(err.message || 'We could not retrieve your account balance at this time. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  // Mock Personalized AI Nudge Engine call
  useEffect(() => {
    const fetchPersonalizedTip = async () => {
      try {
        // Simulate AI tip generation (under 200ms as per requirements)
        await new Promise(resolve => setTimeout(resolve, 150));
        
        // Mock personalized tip based on balance data
        const tips = [
          'Consider setting up a recurring transfer to your savings account.',
          'Your spending this month is 15% lower than last month. Great job!',
          'You could earn more interest by upgrading to our premium savings account.',
          'Set up automatic bill payments to avoid late fees.'
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        setPersonalizedTip(randomTip);
      } catch (err) {
        // Fallback to default tip
        setPersonalizedTip('Did you know you can transfer funds between your accounts?');
      }
    };

    fetchPersonalizedTip();
  }, []);

  const handleWithdraw = () => {
    // Navigate to ATM Cash Withdrawal Screen (Light Theme)
    console.log('Navigate to ATM Cash Withdrawal');
    try {
      navigate('/cash-withdrawal');
    } catch (error) {
      console.error('Navigation error:', error);
      alert('We\'re sorry, we couldn\'t load that screen right now. Please try again.');
    }
  };

  const handleDeposit = () => {
    // Navigate to Cash Deposit Screen (Dark Theme)
    console.log('Navigate to Cash Deposit');
    try {
      navigate('/cash-deposit');
    } catch (error) {
      console.error('Navigation error:', error);
      alert('We\'re sorry, we couldn\'t load that screen right now. Please try again.');
    }
  };

  const handleTipClick = (tipId) => {
    console.log('Tip clicked:', tipId);
    // TODO: Implement tip navigation/actions
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleTabChange = (tabIndex, tabId) => {
    console.log('Tab changed:', tabIndex, tabId);
    // Implement tab navigation
    switch (tabId) {
      case 'home':
        navigate('/dashboard');
        break;
      case 'transactions':
        // TODO: Implement when transactions page is available
        console.log('Transactions page not yet implemented');
        break;
      case 'transfer':
        navigate('/transfer-funds');
        break;
      case 'settings':
        // TODO: Implement when settings page is available
        console.log('Settings page not yet implemented');
        break;
      case 'profile':
        // TODO: Implement when profile page is available
        console.log('Profile page not yet implemented');
        break;
      default:
        console.log('Unknown tab:', tabId);
    }
  };

  // Format balance for display
  const getFormattedBalance = () => {
    if (!balances || balances.length === 0) return '$0.00';
    
    // Display primary account balance (usually first account or savings)
    const primaryAccount = balances.find(account => account.type === 'savings') || balances[0];
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(primaryAccount.balance);
  };

  // Enhanced tips with personalized tip if available
  const tips = [
    ...(personalizedTip ? [{ id: 'personalized', title: personalizedTip, iconName: 'lightbulb' }] : []),
    { id: 'interest', title: 'Understanding interest rates', iconName: 'info' },
    { id: 'budgeting', title: 'Budgeting tips', iconName: 'chart' },
    { id: 'customer-care', title: 'Contact Customer Care', iconName: 'phone' },
    { id: 'security', title: 'Security tips', iconName: 'shield' }
  ];

  return (
    <div className="min-h-screen bg-[#FBFEFC] flex flex-col">
      {/* Header */}
      <Header 
        title="Balance Enquiry"
        className="bg-[#FBFEFC]"
      />
      
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
      <main className="flex-1 flex flex-col w-full">
        {/* Balance Card Section */}
        <div className="flex flex-col p-[18px] w-full">
          {loading ? (
            <div className="bg-[#FDFEFD] rounded-[18px] shadow-[0px_2px_7px_rgba(0,0,0,0.08)] flex items-center justify-center h-48 w-full">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-[#1B281E] border-t-transparent rounded-full animate-spin" />
                <span className="font-['Plus_Jakarta_Sans'] text-[#1B281E]">Loading balance...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-[#FDFEFD] rounded-[18px] shadow-[0px_2px_7px_rgba(0,0,0,0.08)] flex items-center justify-center h-48 w-full">
              <div className="text-center p-6">
                <p className="font-['Plus_Jakarta_Sans'] text-[#1B281E] mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-[rgba(39,124,61,0.09)] text-[#1B281E] px-4 py-2 rounded-[48px] font-['Plus_Jakarta_Sans'] font-medium hover:bg-[rgba(39,124,61,0.15)] transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <BalanceCard
              balance={getFormattedBalance()}
              onWithdraw={handleWithdraw}
              onDeposit={handleDeposit}
            />
          )}
        </div>
        
        {/* Helpful Tips Section */}
        <HelpfulTipsSection
          tips={tips}
          onTipClick={handleTipClick}
          className="bg-[#FBFEFC]"
        />
      </main>
      
      {/* Bottom Tab Bar */}
      <BottomTabBar
        activeTab={1} // Assuming Balance Enquiry is the second tab
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default BalanceEnquiryPage;