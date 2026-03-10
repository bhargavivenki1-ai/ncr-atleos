import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ATMCashWithdrawal from './pages/ATMCashWithdrawal';
import CashDepositPage from './pages/CashDepositPage';
import BalanceEnquiryPage from './pages/BalanceEnquiryPage';
import FundsTransferPage from './pages/FundsTransferPage';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Main App component with routing configuration
 * Implements the application startup sequence as specified in Story-1-Login.md
 * Updated to include Cash Deposit page routing as per Story-4-CashDeposit.md
 * Updated to include Balance Enquiry page routing as per Story-5-BalanceEnquiry.md
 * Updated to include Funds Transfer page routing as per Story-6-FundsTransfer.md
 */
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            {/* Default route redirects to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Login page - PIN Entry Screen */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Dashboard page - Banking App Home Screen */}
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* ATM Cash Withdrawal page */}
            <Route path="/cash-withdrawal" element={<ATMCashWithdrawal />} />
            
            {/* Cash Deposit page */}
            <Route path="/cash-deposit" element={<CashDepositPage />} />
            
            {/* Balance Enquiry page */}
            <Route path="/balance-enquiry" element={<BalanceEnquiryPage />} />
            
            {/* Funds Transfer page */}
            <Route path="/funds-transfer" element={<FundsTransferPage />} />
            
            {/* Catch-all route redirects to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;