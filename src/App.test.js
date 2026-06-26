import { render, screen } from '@testing-library/react';
import App from './App';

test('renders team name', () => {
  render(<App />);
  const teamName = screen.getAllByText(/NC Valkyries/i)[0];
  expect(teamName).toBeInTheDocument();
});
