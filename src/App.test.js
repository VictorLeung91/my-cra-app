import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CICD text', () => {
  render(<App />);
  const textElement = screen.getByText(/react cicd app/i);
  expect(textElement).toBeInTheDocument();
});