import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardGrid from '../DashboardGrid';

describe('DashboardGrid', () => {
  const defaultProps = {
    onSavingsTileClick: jest.fn(),
    onCashDepositTileClick: jest.fn(),
    onBalanceEnquiryTileClick: jest.fn(),
    onTransferFundsTileClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all four dashboard tiles', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByText('Cash Deposit')).toBeInTheDocument();
    expect(screen.getByText('Balance Enquiry')).toBeInTheDocument();
    expect(screen.getByText('Transfer Funds')).toBeInTheDocument();
  });

  it('displays savings tile with subtitle', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('calls onSavingsTileClick when Savings tile is clicked', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    const savingsTile = screen.getByLabelText('Navigate to Savings account');
    fireEvent.click(savingsTile);
    
    expect(defaultProps.onSavingsTileClick).toHaveBeenCalledTimes(1);
  });

  it('calls onCashDepositTileClick when Cash Deposit tile is clicked', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    const cashDepositTile = screen.getByLabelText('Navigate to Cash Deposit');
    fireEvent.click(cashDepositTile);
    
    expect(defaultProps.onCashDepositTileClick).toHaveBeenCalledTimes(1);
  });

  it('calls onBalanceEnquiryTileClick when Balance Enquiry tile is clicked', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    const balanceEnquiryTile = screen.getByLabelText('Navigate to Balance Enquiry');
    fireEvent.click(balanceEnquiryTile);
    
    expect(defaultProps.onBalanceEnquiryTileClick).toHaveBeenCalledTimes(1);
  });

  it('calls onTransferFundsTileClick when Transfer Funds tile is clicked', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    const transferFundsTile = screen.getByLabelText('Navigate to Transfer Funds');
    fireEvent.click(transferFundsTile);
    
    expect(defaultProps.onTransferFundsTileClick).toHaveBeenCalledTimes(1);
  });

  it('has proper grid accessibility attributes', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-label', 'Banking services navigation');
  });

  it('has proper gridcell structure', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    const gridCells = screen.getAllByRole('gridcell');
    expect(gridCells).toHaveLength(4);
  });

  it('applies custom className', () => {
    render(<DashboardGrid {...defaultProps} className="custom-grid-class" />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('custom-grid-class');
  });

  it('has proper responsive grid styling', () => {
    render(<DashboardGrid {...defaultProps} />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('flex-row');
    expect(grid).toHaveClass('flex-wrap');
    expect(grid).toHaveClass('gap-4');
  });
});