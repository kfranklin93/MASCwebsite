import { render, screen, waitFor, within } from '@testing-library/react';
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

    // Lazy routes arrive in a separate chunk, so wait for real content rather
    // than asserting against the Suspense fallback.
    const headings = await within(main).findAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    expect(main.textContent.trim().length).toBeGreaterThan(0);

    // ...and it must be the real page, not the catch-all standing in for a
    // missing route. Without this the 404 heading would satisfy the check above.
    expect(
      within(main).queryByRole('heading', { name: /couldn't find that page/i })
    ).not.toBeInTheDocument();
  });

  it('emits social meta tags pointing at the real domain', async () => {
    renderAt('/');
    await screen.findByRole('main');

    const content = (selector) =>
      document.head.querySelector(selector)?.getAttribute('content');

    await waitFor(() => {
      expect(content('meta[property="og:url"]')).toBe(
        'https://mommyangelsspecialtycare.com/'
      );
    });

    expect(content('meta[property="og:image"]')).toBe(
      'https://mommyangelsspecialtycare.com/social-preview.png'
    );
    expect(content('meta[name="twitter:image"]')).toBe(
      'https://mommyangelsspecialtycare.com/social-preview.png'
    );
    expect(content('meta[property="og:type"]')).toBe('website');
    expect(content('meta[property="og:site_name"]')).toBe(
      'Mommy Angels Specialty Care'
    );

    // No placeholder domain may survive anywhere in the emitted head.
    expect(document.head.innerHTML).not.toMatch(/yourdomain\.com/);
  });

  it('emits valid LocalBusiness and FAQ JSON-LD', async () => {
    renderAt('/');
    await screen.findByRole('main');

    let blocks = [];
    await waitFor(() => {
      blocks = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      expect(blocks.length).toBe(2);
    });

    // Must be parseable - a malformed block is silently ignored by crawlers.
    const parsed = blocks.map((b) => JSON.parse(b.textContent));
    const business = parsed.find((p) => p['@type'] === 'MedicalBusiness');
    const faq = parsed.find((p) => p['@type'] === 'FAQPage');

    expect(business).toBeDefined();
    expect(faq).toBeDefined();
    expect(business.telephone).toBe('+1-678-353-6829');
    expect(business.address.addressLocality).toBe('Dunwoody');
    expect(business.openingHours).toBe('Mo-Fr 08:00-18:00');
    expect(faq.mainEntity.length).toBeGreaterThan(0);

    // Every URL it advertises must be on the real domain, and the image it
    // points at must be a file that actually ships in the build.
    expect(business.url).toMatch(/^https:\/\/mommyangelsspecialtycare\.com/);
    expect(business.image).toBe(
      'https://mommyangelsspecialtycare.com/social-preview.png'
    );
  });

  it('shows the 404 page for an unknown URL', async () => {
    renderAt('/this-route-does-not-exist');

    const main = await screen.findByRole('main');
    expect(
      await within(main).findByRole('heading', { name: /couldn't find that page/i })
    ).toBeInTheDocument();
    expect(within(main).getByRole('link', { name: /back to home/i })).toBeInTheDocument();
  });
});
