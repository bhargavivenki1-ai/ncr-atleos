import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import DashboardPage from '../DashboardPage';

// Mock the navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock console.log to avoid noise in tests
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock alert to test placeholder functionality
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear session and local storage
    sessionStorage.clear();
    localStorage.clear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockAlert.mockRestore();
  });

  it('renders the dashboard page with header', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('Banking App')).toBeInTheDocument();
    expect(screen.getByText('10:30')).toBeInTheDocument(); // Status bar time
  });

  it('renders all four navigation tiles', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByText('Cash Deposit')).toBeInTheDocument();
    expect(screen.getByText('Balance Enquiry')).toBeInTheDocument();
    expect(screen.getByText('Transfer Funds')).toBeInTheDocument();
  });

  it('displays savings balance', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('handles savings tile click', () => {
    renderWithRouter(<DashboardPage />);
    
    const savingsTile = screen.getByLabelText('Navigate to Savings account');
    fireEvent.click(savingsTile);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Navigating to Savings/Cash Withdrawal');
    expect(mockAlert).toHaveBeenCalledWith('Cash Withdrawal feature coming soon!');
  });

  it('handles cash deposit tile click', () => {
    renderWithRouter(<DashboardPage />);
    
    const cashDepositTile = screen.getByLabelText('Navigate to Cash Deposit');
    fireEvent.click(cashDepositTile);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Navigating to Cash Deposit');
    expect(mockAlert).toHaveBeenCalledWith('Cash Deposit feature coming soon!');
  });

  it('handles balance enquiry tile click', () => {
    renderWithRouter(<DashboardPage />);
    
    const balanceEnquiryTile = screen.getByLabelText('Navigate to Balance Enquiry');
    fireEvent.click(balanceEnquiryTile);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Navigating to Balance Enquiry');
    expect(mockAlert).toHaveBeenCalledWith('Balance Enquiry feature coming soon!');
  });

  it('handles transfer funds tile click', () => {
    renderWithRouter(<DashboardPage />);
    
    const transferFundsTile = screen.getByLabelText('Navigate to Transfer Funds');
    fireEvent.click(transferFundsTile);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Navigating to Transfer Funds');
    expect(mockAlert).toHaveBeenCalledWith('Transfer Funds feature coming soon!');
  });

  it('renders gesture indicator in footer', () => {
    renderWithRouter(<DashboardPage />);
    
    // Check for footer element
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    renderWithRouter(<DashboardPage />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    expect(screen.getByRole('grid')).toBeInTheDocument(); // Dashboard grid
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<DashboardPage />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-label', 'Banking services navigation');
    
    const gridCells = screen.getAllByRole('gridcell');
    expect(gridCells).toHaveLength(4);
  });

  it('applies correct styling classes', () => {
    renderWithRouter(<DashboardPage />);
    
    const container = screen.getByRole('main').parentElement;
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('bg-background');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
  });
});