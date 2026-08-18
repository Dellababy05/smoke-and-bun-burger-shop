import './About.css';
import founderPhoto from '../assets/Founder.png';

const TIMELINE = [
  { year: '2018', text: 'Started as a single charcoal grill cart at the Linköping farmers market.' },
  { year: '2020', text: 'Opened our first storefront on Ember Street.' },
  { year: '2023', text: 'Served our 250,000th burger to the neighborhood.' },
  { year: '2026', text: 'Took Smoke & Bun online, so the whole city can order in.' },
];

export default function About() {
  return (
    <section className="about-page">
      <div className="container about-hero">
        <div className="about-hero__copy">
          <p className="eyebrow">Our Story</p>
          <h1>Built on charcoal, family, and a stubborn love of a good burger.</h1>
          <p className="about-hero__lead">
            Smoke &amp; Bun started with one question: why does a "quick" burger have to taste like it
            was rushed? Every patty we grill still gets the same attention it did on day one.
          </p>
        </div>
      </div>

      <div className="container about-founder">
        <div className="about-founder__image">
          <img
            src={founderPhoto}
            alt="Portrait of Jim Joe, founder of Smoke & Bun, standing in front of the grill"
          />
        </div>
        <div className="about-founder__copy">
          <p className="eyebrow">Meet the Founder</p>
          <h2>Jim Joe</h2>
          <p>
            Mateo grew up helping run his family's taqueria before trading tortillas for buns. In
            2018 he welded together a charcoal cart from spare parts and started grilling burgers
            at the weekend market — and never looked back.
          </p>
          <p>
            "I don't want to sell you the fastest burger in town. I want to sell you the one you're
            still thinking about tomorrow."
          </p>
        </div>
      </div>

      <div className="container about-timeline">
        <p className="eyebrow">How we got here</p>
        <h2>The Smoke &amp; Bun Timeline</h2>
        <div className="stack-divider" aria-hidden="true">
          <span className="bun-top" /><span className="patty" /><span className="bun-bottom" />
        </div>
        <ol className="timeline">
          {TIMELINE.map((entry) => (
            <li key={entry.year} className="timeline__item">
              <span className="timeline__year">{entry.year}</span>
              <p>{entry.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="about-values">
        <div className="container about-values__grid">
          <div>
            <h3>Fresh, always</h3>
            <p>No frozen patties, ever. Ground and formed in-house every morning.</p>
          </div>
          <div>
            <h3>Real charcoal</h3>
            <p>Every burger touches an open flame — that's non-negotiable.</p>
          </div>
          <div>
            <h3>Local first</h3>
            <p>We source buns, produce, and beef from growers within 60 miles.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
