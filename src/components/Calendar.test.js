import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calendar from './Calendar';

// Mock fetch
global.fetch = jest.fn();

describe('Calendar Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    
    // Mock environment variables
    process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY = 'test-api-key';
    process.env.REACT_APP_GOOGLE_CALENDAR_ID = 'test-calendar-id';
  });

  it('renders loading state initially', () => {
    // Mock a pending fetch request
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    
    render(<Calendar />);
    
    expect(screen.getByText(/loading team events/i)).toBeInTheDocument();
  });

  it('renders events when fetch is successful', async () => {
    // Mock successful fetch with sample events
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            id: '1',
            summary: 'Team Practice',
            start: { dateTime: '2025-10-23T18:00:00' },
            end: { dateTime: '2025-10-23T20:00:00' },
            location: 'Main Field'
          },
          {
            id: '2',
            summary: 'Game vs Eagles',
            start: { dateTime: '2025-10-25T10:00:00' },
            end: { dateTime: '2025-10-25T12:00:00' },
            location: 'Away Field'
          }
        ]
      })
    });
    
    render(<Calendar />);
    
    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText('Team Practice')).toBeInTheDocument();
    });
    
    // Check for second event
    expect(screen.getByText('Game vs Eagles')).toBeInTheDocument();
  });

  it('renders error message when fetch fails', async () => {
    // Mock failed fetch
    fetch.mockRejectedValueOnce(new Error('API Error'));
    
    render(<Calendar />);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/failed to load team events/i)).toBeInTheDocument();
    });
  });

  it('toggles between month and list views', async () => {
    // Mock successful fetch with sample events
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            id: '1',
            summary: 'Team Practice',
            start: { dateTime: '2025-10-23T18:00:00' },
            end: { dateTime: '2025-10-23T20:00:00' }
          }
        ]
      })
    });
    
    render(<Calendar />);
    
    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText('Team Practice')).toBeInTheDocument();
    });
    
    // Default view should be month view
    expect(screen.getByText('Month View')).toHaveClass('active');
    
    // Click on list view button
    userEvent.click(screen.getByText('List View'));
    
    // List view should now be active
    expect(screen.getByText('List View')).toHaveClass('active');
    expect(screen.getByText('Month View')).not.toHaveClass('active');
  });
});