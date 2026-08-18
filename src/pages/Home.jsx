import { Link } from 'react-router-dom';
import { menuItems } from '../data/menuData.js';
import MenuCard from '../components/MenuCard.jsx';
import './Home.css';

export default function Home() {
  const featured = menuItems.filter((item) => item.category === 'Signature');

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Linköping, SE · Since 2018</p>
            <h1>
              Flame-grilled.
              <br />
              Hand-stacked.
              <br />
              <span className="hero__accent">Ordered in seconds.</span>
            </h1>
            <p className="hero__sub">
              Smoke &amp; Bun brings the smell of the charcoal grill to your door. Build your burger,
              track your order, skip the line.
            </p>
            <div className="hero__cta">
              <Link to="/menu" className="btn btn-primary">
                Order Now
              </Link>
              <Link to="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
            <div className="hero__plate">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container featured-section">
        <p className="eyebrow">Fan favorites</p>
        <h2>The Signature Line-Up</h2>
        <div className="stack-divider" aria-hidden="true">
          <span className="bun-top" /><span className="patty" /><span className="bun-bottom" />
        </div>
        <div className="menu-grid">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        <div className="featured-section__more">
          <Link to="/menu" className="btn btn-mustard">
            See Full Menu
          </Link>
        </div>
      </section>

      <section className="promise-strip">
        <div className="container promise-strip__inner">
          <div>
            <h3>15 min</h3>
            <p>Average grill-to-door time</p>
          </div>
          <div>
            <h3>100%</h3>
            <p>Fresh, never-frozen beef</p>
          </div>
          <div>
            <h3>4.9★</h3>
            <p>Average customer rating</p>
          </div>
        </div>
      </section>
    </>
  );
}
