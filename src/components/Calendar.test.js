import React from 'react';
import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';
import '@testing-library/jest-dom';

// Mock FullCalendar to avoid JSDOM issues
jest.mock('@fullcalendar/react', () => {
  return function DummyFullCalendar() {
    return <div data-testid="full-calendar">FullCalendar Mock</div>;
  };
});

// Mock fetch
global.fetch = jest.fn();

describe('Calendar Component', () => {
  it('renders team calendar heading', () => {
    render(<Calendar />);
    expect(screen.getByText(/Team Calendar/i)).toBeInTheDocument();
  });
});