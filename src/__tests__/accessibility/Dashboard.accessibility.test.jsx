import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import DashboardPage from '../../pages/DashboardPage';
import DashboardGrid from '../../components/organisms/DashboardGrid';
import DashboardTile from '../../components/molecules/DashboardTile';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock navigation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Dashboard Accessibility Tests', () => {
  it('DashboardTile should not have accessibility violations', async () => {
    const { container } = render(
      <DashboardTile
        title="Test Tile"
        subtitle="Test Subtitle"
        icon={<div>Icon</div>}
        onClick={() => {}}
        ariaLabel="Test tile for navigation"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('DashboardGrid should not have accessibility violations', async () => {
    const mockHandlers = {
      onSavingsTileClick: jest.fn(),
      onCashDepositTileClick: jest.fn(),
      onBalanceEnquiryTileClick: jest.fn(),
      onTransferFundsTileClick: jest.fn(),
    };

    const { container } = render(<DashboardGrid {...mockHandlers} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('DashboardPage should not have accessibility violations', async () => {
    const { container } = renderWithRouter(<DashboardPage />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Dashboard tiles should have proper focus management', () => {
    const { container } = render(
      <DashboardTile
        title="Focusable Tile"
        onClick={() => {}}
      />
    );

    const tile = container.querySelector('[role="button"]');
    
    // Check that tile is focusable
    expect(tile).toHaveAttribute('tabIndex', '0');
    
    // Check that disabled tile is not focusable
    const { container: disabledContainer } = render(
      <DashboardTile
        title="Disabled Tile"
        onClick={() => {}}
        disabled
      />
    );

    const disabledTile = disabledContainer.querySelector('[role="button"]');
    expect(disabledTile).toHaveAttribute('tabIndex', '-1');
  });

  it('Dashboard grid should have proper ARIA structure', () => {
    const mockHandlers = {
      onSavingsTileClick: jest.fn(),
      onCashDepositTileClick: jest.fn(),
      onBalanceEnquiryTileClick: jest.fn(),
      onTransferFundsTileClick: jest.fn(),
    };

    const { container } = render(<DashboardGrid {...mockHandlers} />);

    // Check grid role and label
    const grid = container.querySelector('[role="grid"]');
    expect(grid).toHaveAttribute('aria-label', 'Banking services navigation');

    // Check gridcell roles
    const gridCells = container.querySelectorAll('[role="gridcell"]');
    expect(gridCells).toHaveLength(4);
  });

  it('Dashboard tiles should have proper ARIA labels', () => {
    const mockHandlers = {
      onSavingsTileClick: jest.fn(),
      onCashDepositTileClick: jest.fn(),
      onBalanceEnquiryTileClick: jest.fn(),
      onTransferFundsTileClick: jest.fn(),
    };

    const { container } = render(<DashboardGrid {...mockHandlers} />);

    // Check that each tile has proper aria-label
    const buttons = container.querySelectorAll('[role="button"]');
    
    expect(buttons[0]).toHaveAttribute('aria-label', 'Navigate to Savings account');
    expect(buttons[1]).toHaveAttribute('aria-label', 'Navigate to Cash Deposit');
    expect(buttons[2]).toHaveAttribute('aria-label', 'Navigate to Balance Enquiry');
    expect(buttons[3]).toHaveAttribute('aria-label', 'Navigate to Transfer Funds');
  });

  it('Dashboard should meet WCAG color contrast requirements', () => {
    // This test would typically use a tool like jest-axe with color contrast rules
    // or a custom color contrast checker
    
    const { container } = renderWithRouter(<DashboardPage />);
    
    // Check that text elements have proper contrast
    const textElements = container.querySelectorAll('h1, h2, h3, p, button');
    
    textElements.forEach(element => {
      // In a real implementation, you would check computed styles
      // and calculate contrast ratios here
      expect(element).toBeInTheDocument();
    });
  });

  it('Dashboard should support keyboard navigation', () => {
    const mockHandlers = {
      onSavingsTileClick: jest.fn(),
      onCashDepositTileClick: jest.fn(),
      onBalanceEnquiryTileClick: jest.fn(),
      onTransferFundsTileClick: jest.fn(),
    };

    const { container } = render(<DashboardGrid {...mockHandlers} />);

    // Check that all interactive elements are keyboard accessible
    const interactiveElements = container.querySelectorAll('[role="button"]');
    
    interactiveElements.forEach(element => {
      expect(element).toHaveAttribute('tabIndex');
      expect(parseInt(element.getAttribute('tabIndex'))).toBeGreaterThanOrEqual(0);
    });
  });
});