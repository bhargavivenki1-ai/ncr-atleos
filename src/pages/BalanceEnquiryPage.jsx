import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import BalanceCard from '../components/molecules/BalanceCard';
import HelpfulTipsSection from '../components/organisms/HelpfulTipsSection';
import BottomTabBar from '../components/organisms/BottomTabBar';

/**
 * BalanceEnquiryPage component for displaying account balance and helpful tips
 * Implements the functional requirements from Story-5-BalanceEnquiry.md
 */
const BalanceEnquiryPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [personalizedTip, setPersonalizedTip] = useState(null);

  // Mock Core Banking Service call
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock successful response
        const mockBalance = '$10,500.00';
        setBalance(mockBalance);
        setError(null);
      } catch (err) {
        setError('We could not retrieve your account balance at this time. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  // Mock Personalized AI Nudge Engine call
  useEffect(() => {
    const fetchPersonalizedTip = async () => {
      try {
        // Simulate AI tip generation (under 200ms as per requirements)
        await new Promise(resolve => setTimeout(resolve, 150));
        
        // Mock personalized tip
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
        // TODO: Implement when transfer page is available
        console.log('Transfer page not yet implemented');
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
              balance={balance}
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