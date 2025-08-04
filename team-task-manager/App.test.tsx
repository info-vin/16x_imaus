import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the main application container', () => {
    render(<App />);
    const appContainer = screen.getByRole('main');
    expect(appContainer).toBeInTheDocument();
  });
});
