import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// Every internal destination reachable from the Navbar or Footer.
// A route that renders nothing produces an empty <main>, which is the
// blank-page bug this guards against.
const NAV_DESTINATIONS = [
  '/',
  '/aba',
  '/about',
  '/services',
  '/contact',
  '/what-to-expect',
  '/services/aba-therapy',
  '/services/autism-diagnostic',
  '/services/speech-therapy',
  '/services/early-intervention',
];

const renderAt = (route) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('routing', () => {
  it.each(NAV_DESTINATIONS)('renders real content at %s', async (route) => {
    renderAt(route);

    const main = await screen.findByRole('main');
    expect(main).toBeInTheDocument();
    expect(main.textContent.trim().length).toBeGreaterThan(0);

    // A matched route renders at least one heading; a blank page renders none.
    const headings = within(main).queryAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);

    // ...and it must be the real page, not the catch-all standing in for a
    // missing route. Without this the 404 heading would satisfy the check above.
    expect(
      within(main).queryByRole('heading', { name: /couldn't find that page/i })
    ).not.toBeInTheDocument();
  });

  it('shows the 404 page for an unknown URL', async () => {
    renderAt('/this-route-does-not-exist');

    const main = await screen.findByRole('main');
    expect(
      within(main).getByRole('heading', { name: /couldn't find that page/i })
    ).toBeInTheDocument();
    expect(within(main).getByRole('link', { name: /back to home/i })).toBeInTheDocument();
  });
});
