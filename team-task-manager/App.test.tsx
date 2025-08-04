import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './src/App';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('App', () => {
  it('renders the main application container', () => {
    render(<App />);
    const appContainer = screen.getByRole('main');
    expect(appContainer).toBeInTheDocument();
  });
});
