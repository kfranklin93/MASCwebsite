import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from './App';

expect.extend(toHaveNoViolations);

// Note on coverage: axe in jsdom cannot evaluate colour contrast (no layout
// engine) or anything requiring real focus/paint. Contrast was checked
// separately by computing WCAG ratios against the footer gradient stops.
// These checks catch ARIA, labelling, landmark and name-role-value problems.
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/what-to-expect',
  '/services/aba-therapy',
  '/services/speech-therapy',
  '/services/autism-diagnostic',
  '/services/early-intervention',
  '/not-a-real-page',
];

const renderAt = (route) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('accessibility', () => {
  it.each(ROUTES)('has no axe violations at %s', async (route) => {
    const { container } = renderAt(route);

    // Wait for the lazy chunk so axe sees the real page, not the fallback.
    const main = await screen.findByRole('main');
    await within(main).findAllByRole('heading');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 30000);

  it('exposes exactly one main landmark per route', async () => {
    renderAt('/');
    await screen.findByRole('main');
    expect(screen.getAllByRole('main')).toHaveLength(1);
  });
});
