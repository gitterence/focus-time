import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Settings button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Settings/i);
  expect(linkElement).toBeInTheDocument();
});
