import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowUpRight,
  Heart,
  Menu,
  Moon,
  Plus,
  Search,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

import auroraGraphicTee from '@assets/15986_1787110621127.png';
import auroraWhiteGraphicTee from '@assets/15978_1787110621129.jpg';
import auroraSignaturePortrait from '@assets/16001_1787110621130.png';
import auroraSignatureTee from '@assets/16000_1787110621131.png';
import auroraDenimLook from '@assets/15977_1787110621132.jpg';
import auroraSquareLook from '@assets/15979_1787110621133.jpg';

const queryClient = new QueryClient();

type Category = 'All' | 'New in' | 'Tops';

type Product = {
  id: number;
  name: string;
  detail: string;
  price: string;
  category: Exclude<Category, 'All'>;
  image: string;
  flag?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Aurora Wave Tee',
    detail: 'Heavyweight cotton · Black',
    price: '$48',
    category: 'New in',
    flag: 'Bestseller',
    image: auroraGraphicTee,
  },
  {
    id: 2,
    name: 'Orbit Graphic Tee',
    detail: 'Organic cotton · White',
    price: '$44',
    category: 'Tops',
    image: auroraWhiteGraphicTee,
  },
  {
    id: 3,
    name: 'Aurora Signature Tee',
    detail: 'Premium cotton · Black',
    price: '$42',
    category: 'Tops',
    image: auroraSignatureTee,
  },
];

const categories: Category[] = ['All', 'New in', 'Tops'];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
  });
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [category, setCategory] = useState<Category>('All');
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [bag, setBag] = useState<Product[]>([]);
  const [toast, setToast] = useState('');

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('aurora-theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);

    localStorage.setItem(
      'aurora-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  const filteredProducts =
    category === 'All'
      ? products
      : products.filter(
          (product) => product.category === category
        );

  const announce = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast('');
    }, 2400);
  };

  const addToBag = (product: Product) => {
    setBag((current) => [...current, product]);

    announce(`${product.name} added to your bag`);
  };

  const toggleFavorite = (product: Product) => {
    const wasFavorite = favorites[product.id];

    setFavorites((current) => ({
      ...current,
      [product.id]: !current[product.id],
    }));

    announce(
      wasFavorite
        ? 'Removed from saved pieces'
        : 'Saved to your edit'
    );
  };

  const handleNewsletter = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    announce('You are on the Aurora list');

    event.currentTarget.reset();
  };

  const closeMenuAndScroll = (id: string) => {
    setMenuOpen(false);

    window.setTimeout(() => {
      scrollToSection(id);
    }, 10);
  };

  const toggleTheme = () => {
    setDarkMode((current) => !current);

    announce(
      darkMode
        ? 'Light mode activated'
        : 'Dark mode activated'
    );
  };

  return (
    <main className="loom-page">
      <div className="grain" aria-hidden="true" />
            
      <div className="topline">
        Free shipping on orders over $100 · Aurora essentials · Made for your everyday
      </div>

      <header
        className="site-nav"
        data-testid="header-navigation"
      >
        <a
          className="wordmark"
          href="#top"
          data-testid="link-home"
        >
          Aurora<span aria-hidden="true"></span>
        </a>

        <nav
          className="nav-links"
          aria-label="Main navigation"
        >
          <a
            className="nav-link"
            href="#shop"
            data-testid="link-shop"
          >
            Shop
          </a>

          <a
            className="nav-link"
            href="#story"
            data-testid="link-story"
          >
            Our story
          </a>

          <a
            className="nav-link"
            href="#journal"
            data-testid="link-journal"
          >
            Journal
          </a>
        </nav>

        <div className="nav-actions">
          {/* DARK MODE */}
          <button
            className="icon-button theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            title={
              darkMode
                ? 'Light mode'
                : 'Dark mode'
            }
            data-testid="button-theme"
          >
            {darkMode ? (
              <Sun
                size={18}
                strokeWidth={1.7}
              />
            ) : (
              <Moon
                size={18}
                strokeWidth={1.7}
              />
            )}
          </button>

          {/* SEARCH */}
          <button
            className="icon-button"
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search Aurora"
            data-testid="button-open-search"
          >
            <Search
              size={18}
              strokeWidth={1.6}
            />
          </button>

          {/* BAG */}
          <button
            className="icon-button"
            type="button"
            onClick={() => setBagOpen(true)}
            aria-label={`Open bag with ${bag.length} items`}
            data-testid="button-open-bag"
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.6}
            />

            {bag.length > 0 && (
              <span
                className="bag-count"
                data-testid="text-bag-count"
              >
                {bag.length}
              </span>
            )}
          </button>

          {/* MOBILE MENU */}
          <button
            className="icon-button mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            data-testid="button-open-menu"
          >
            <Menu
              size={20}
              strokeWidth={1.6}
            />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <button
            className="drawer-close"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            data-testid="button-close-menu"
          >
            <X
              size={25}
              strokeWidth={1.5}
            />
          </button>

          <button
            className="mobile-theme-toggle"
            type="button"
            onClick={toggleTheme}
          >
            {darkMode ? (
              <>
                <Sun size={17} />
                Light mode
              </>
            ) : (
              <>
                <Moon size={17} />
                Dark mode
              </>
            )}
          </button>

          <a
            href="#shop"
            onClick={() =>
              closeMenuAndScroll('shop')
            }
            data-testid="mobile-link-shop"
          >
            Shop the edit
          </a>

          <a
            href="#story"
            onClick={() =>
              closeMenuAndScroll('story')
            }
            data-testid="mobile-link-story"
          >
            Our story
          </a>

          <a
            href="#journal"
            onClick={() =>
              closeMenuAndScroll('journal')
            }
            data-testid="mobile-link-journal"
          >
            The journal
          </a>

          <div className="mobile-meta">
            Graphic essentials with a point of view.
            <br />
            For every version of you.
          </div>
        </div>
      )}

      {/* HERO */}

      <section
        className="hero"
        id="top"
      >
        <div className="hero-copy">
          <div className="eyebrow">
            The Aurora graphic edit
          </div>

          <h1>
            Wear your
            <br />
            <em>light.</em>
          </h1>

          <p className="hero-description">
            Graphic essentials for people who notice
            the details. Easy silhouettes, bold artwork,
            and just enough of the unexpected.
          </p>

          <button
            className="primary-link"
            type="button"
            onClick={() =>
              scrollToSection('shop')
            }
            data-testid="button-shop-edit"
          >
            Shop the new edit
            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <div
          className="hero-art"
          aria-label="Model wearing Aurora's latest graphic tee"
        >
          <div className="hero-photo">
            <img
              src={auroraSignaturePortrait}
              alt="Model wearing an Aurora signature black tee"
            />
          </div>

          <div className="hero-accent">
            Find your 
            <br />
            frequency
          </div>

          <div className="hero-number">
            LOOK 01 / 06
          </div>

          <div className="hero-caption">
            Aurora studio · 2026
          </div>
        </div>
      </section>

      {/* MARQUEE */}

      <div
        className="marquee"
        aria-label="Aurora values"
      >
        <div className="marquee-track">
          <span>Make a statement</span>
          <span>Wear often</span>
          <span>Stay curious</span>
          <span>Make a statement</span>
          <span>Wear often</span>
          <span>Stay curious</span>
          <span>Make a statement</span>
          <span>Wear often</span>
          <span>Stay curious</span>
        </div>
      </div>

      {/* MANIFESTO */}

      <section
        className="manifesto"
        aria-labelledby="manifesto-title"
      >
        <div className="section-index">
          01 / The point of view
        </div>

        <div>
          <h2 id="manifesto-title">
            Everyday, but <em>never</em> ordinary.
          </h2>

          <p className="manifesto-copy">
            <strong>
              Aurora makes the pieces that light up
              your rotation.
            </strong>{' '}
            The tee you reach for without thinking.
            The graphic that starts a conversation.
            The layer that somehow makes Tuesday feel
            considered.
            <br />
            <br />
            We create in small runs, choose cloth for
            comfort, and leave room for a little
            character. Nothing precious. Nothing
            disposable.
          </p>
        </div>
      </section>

      {/* COLLECTION */}

      <section
        className="collection"
        id="shop"
        aria-labelledby="collection-title"
      >
        <div className="collection-head">
          <div>
            <div className="eyebrow">
              Graphic pieces in rotation
            </div>

            <h2 id="collection-title">
              The Aurora edit
            </h2>
          </div>

          <button
            className="primary-link"
            type="button"
            onClick={() =>
              announce(
                'You are looking at the complete Aurora edit'
              )
            }
            data-testid="button-view-all"
          >
            View all pieces
            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <div
          className="filter-row"
          role="tablist"
          aria-label="Filter products"
        >
          {categories.map((item) => (
            <button
              className={`filter-button ${
                category === item ? 'active' : ''
              }`}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
              key={item}
              data-testid={`button-filter-${item
                .toLowerCase()
                .replace(' ', '-')}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article
              className="product-card"
              key={product.id}
              data-testid={`card-product-${product.id}`}
            >
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />

                {product.flag && (
                  <span className="product-flag">
                    {product.flag}
                  </span>
                )}

                <button
                  className={`favorite ${
                    favorites[product.id]
                      ? 'active'
                      : ''
                  }`}
                  type="button"
                  aria-label={`${
                    favorites[product.id]
                      ? 'Remove'
                      : 'Save'
                  } ${product.name}`}
                  onClick={() =>
                    toggleFavorite(product)
                  }
                  data-testid={`button-favorite-${product.id}`}
                >
                  <Heart
                    size={16}
                    fill={
                      favorites[product.id]
                        ? 'currentColor'
                        : 'none'
                    }
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              <div className="product-info">
                <div>
                  <div
                    className="product-name"
                    data-testid={`text-product-name-${product.id}`}
                  >
                    {product.name}
                  </div>

                  <div className="product-detail">
                    {product.detail}
                  </div>

                  <button
                    className="add-button"
                    type="button"
                    onClick={() =>
                      addToBag(product)
                    }
                    data-testid={`button-add-product-${product.id}`}
                  >
                    Add to bag
                    <Plus
                      size={13}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                <div
                  className="product-price"
                  data-testid={`text-product-price-${product.id}`}
                >
                  {product.price}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MATERIALS */}

      <section
        className="materials"
        aria-labelledby="materials-title"
      >
        <div
          className="material-swatch"
          aria-hidden="true"
        >
          <span>
            Cloth
            <br />
            with a memory.
          </span>
        </div>

        <div>
          <div className="eyebrow">
            What we put in
          </div>

          <h2 id="materials-title">
            Comfort first. Character always.
          </h2>

          <p>
            We choose cloth that feels good from the
            first wear: soft cotton with a little
            weight, breathable blends, and prints made
            to stay bright. Materials chosen to get
            better at being yours.
          </p>

          <div
            className="material-list"
            aria-label="Aurora materials"
          >
            <span className="material-pill">
              100% organic cotton
            </span>

            <span className="material-pill">
              Soft-touch finish
            </span>

            <span className="material-pill">
              100% plastic-free packaging
            </span>
            
            <span className="material-pill">
              Natural-dye
            </span>
          </div>
        </div>
      </section>

      {/* STORY */}

      <section
        className="story"
        id="story"
        aria-labelledby="story-title"
      >
        <div className="story-inner">
          <div className="story-image">
            <img
              src={auroraSquareLook}
              alt="Aurora model in a colorful city look"
              loading="lazy"
            />
          </div>

          <div className="story-copy">
            <div className="eyebrow">
              02 / The making of it
            </div>

            <h2 id="story-title">
              From a spark of light to your favourite
              thing.
            </h2>

            <p>
              Aurora started with a simple belief:
              what you wear should feel like you. So we
              focus on useful shapes, expressive
              graphics, and the people who make them
              come alive.
            </p>

            <button
              className="primary-link"
              type="button"
              onClick={() =>
                announce(
                  'Our studio notes are coming soon'
                )
              }
              data-testid="button-read-story"
            >
              Read our story
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </section>

      {/* JOURNAL */}

      <section
        className="journal"
        id="journal"
        aria-labelledby="journal-title"
      >
        <div className="journal-top">
          <h2 id="journal-title">
            From the journal
          </h2>

          <span className="section-index">
            03 / Notes on living well
          </span>
        </div>

        <div className="journal-grid">
          <article className="journal-card feature">
            <div className="journal-photo">
              <img
                src={auroraDenimLook}
                alt="Aurora denim look against a colorful city wall"
                loading="lazy"
              />
            </div>

            <div className="journal-kicker">
              In practice · 06.18.26
            </div>

            <h3>
              How to make an everyday look feel like
              yours.
            </h3>

            <p>
              A few honest thoughts on color,
              confidence, and getting dressed.
            </p>
          </article>

          <article className="journal-card">
            <div className="journal-photo">
              <img
                src={auroraGraphicTee}
                alt="Aurora black tee with colorful wave graphic"
                loading="lazy"
              />
            </div>

            <div className="journal-kicker">
              Field notes · 05.29.26
            </div>

            <h3>
              In praise of the graphic tee.
            </h3>

            <p>
              The easiest way to say something without
              saying a word.
            </p>
          </article>

          <article className="journal-card">
            <div className="journal-photo">
              <img
                src={auroraWhiteGraphicTee}
                alt="Aurora white tee with colorful orbit graphic"
                loading="lazy"
              />
            </div>

            <div className="journal-kicker">
              Material study · 04.12.26
            </div>

            <h3>
              Why color changes the whole mood.
            </h3>

            <p>
              Look closely. There is more going on.
            </p>
          </article>
        </div>
      </section>

      {/* NEWSLETTER */}

      <section
        className="newsletter"
        aria-labelledby="newsletter-title"
      >
        <div className="newsletter-inner">
          <div className="eyebrow">
            A note from Aurora
          </div>

          <h2 id="newsletter-title">
            Keep in touch.
          </h2>

          <p>
            New pieces, studio notes, and the occasional
            good idea. No noise, promise.
          </p>

          <form
            className="signup"
            onSubmit={handleNewsletter}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
              data-testid="input-newsletter-email"
            />

            <button
              type="submit"
              aria-label="Join the Aurora list"
              data-testid="button-newsletter-submit"
            >
              <ArrowUpRight
                size={20}
                strokeWidth={1.4}
              />
            </button>
          </form>

          <span className="signup-note">
            By signing up, you agree to hear from us.
            Unsubscribe anytime.
          </span>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="site-footer">
        <div className="footer-main">
          <div>
            <div className="footer-brand">
              aurora.
            </div>

            <div className="footer-tagline">
              Graphic essentials made to bring a
              little more light to your everyday.
            </div>
          </div>

          <div className="footer-links">
            <div>
              <h4>Explore</h4>

              <a
                href="#shop"
                data-testid="footer-link-shop"
              >
                Shop
              </a>

              <a
                href="#story"
                data-testid="footer-link-story"
              >
                Our story
              </a>

              <a
                href="#journal"
                data-testid="footer-link-journal"
              >
                Journal
              </a>
            </div>

            <div>
              <h4>Say hello</h4>

              <a
                href="mailto:hello@aurora-studio.example"
                data-testid="footer-link-email"
              >
                Email us
              </a>

              <button
                type="button"
                onClick={() =>
                  announce(
                    'Instagram opens when the studio has something to share'
                  )
                }
                data-testid="footer-button-instagram"
              >
                Instagram
              </button>

              <button
                type="button"
                onClick={() =>
                  announce(
                    'Shipping is free over $150'
                  )
                }
                data-testid="footer-button-shipping"
              >
                Shipping & returns
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright © 2026 Aurora | The Clothing Store. All rights reserved.</span>
          <span>Find your frequency</span>
        </div>
      </footer>

      {/* SEARCH */}

      {searchOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
            data-testid="overlay-search"
          />

          <div
            className="search-panel"
            role="dialog"
            aria-label="Search Aurora"
          >
            <div className="search-row">
              <Search
                size={23}
                strokeWidth={1.3}
              />

              <input
                autoFocus
                type="search"
                placeholder="Search the Aurora edit"
                aria-label="Search products"
                data-testid="input-search"
              />

              <button
                className="search-close"
                type="button"
                onClick={() =>
                  setSearchOpen(false)
                }
                aria-label="Close search"
                data-testid="button-close-search"
              >
                <X
                  size={24}
                  strokeWidth={1.4}
                />
              </button>
            </div>
          </div>
        </>
      )}

      {/* SHOPPING BAG */}

      {bagOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setBagOpen(false)}
            aria-hidden="true"
            data-testid="overlay-bag"
          />

          <aside
            className="bag-drawer"
            role="dialog"
            aria-label="Shopping bag"
          >
            <div className="drawer-head">
              <h2>
                Your bag{' '}
                <span className="section-index">
                  ({bag.length})
                </span>
              </h2>

              <button
                className="drawer-close"
                type="button"
                onClick={() =>
                  setBagOpen(false)
                }
                aria-label="Close bag"
                data-testid="button-close-bag"
              >
                <X
                  size={23}
                  strokeWidth={1.4}
                />
              </button>
            </div>

            {bag.length === 0 ? (
              <div className="bag-empty">
                <div>
                  <ShoppingBag
                    size={29}
                    strokeWidth={1.2}
                  />

                  <p>
                    Your bag is waiting for something
                    good. Take a look through the new
                    edit.
                  </p>

                  <button
                    className="primary-link"
                    type="button"
                    onClick={() => {
                      setBagOpen(false);
                      scrollToSection('shop');
                    }}
                    data-testid="button-empty-bag-shop"
                  >
                    Browse pieces
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  {bag.map((product, index) => (
                    <div
                      className="bag-item"
                      key={`${product.id}-${index}`}
                    >
                      <img
                        src={product.image}
                        alt=""
                      />

                      <div>
                        <h3>
                          {product.name}
                        </h3>

                        <span>
                          {product.detail}
                        </span>

                        <br />

                        <span>
                          {product.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="drawer-footer">
                  <div className="drawer-total">
                    <span>Estimated total</span>

                    <span>
                      $
                      {bag.reduce(
                        (total, item) =>
                          total +
                          Number(
                            item.price.replace(
                              '$',
                              ''
                            )
                          ),
                        0
                      )}
                    </span>
                  </div>

                  <button
                    className="checkout-button"
                    type="button"
                    onClick={() =>
                      announce(
                        'Checkout is ready when you are'
                      )
                    }
                    data-testid="button-checkout"
                  >
                    Continue to checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      )}

      {toast && (
        <div
          className="toast-message"
          role="status"
          data-testid="status-toast"
        >
          {toast}
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route
          path="/"
          component={Home}
        />

        <Route
          component={NotFound}
        />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const [location] = useLocation();

  return (
    <ErrorBoundary resetKey={location}>
      {children}
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(
            /\/$/,
            ''
          )}
        >
          <Router />
        </WouterRouter>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
