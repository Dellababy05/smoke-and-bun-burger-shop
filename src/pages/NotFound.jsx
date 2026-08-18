import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1>This page fell off the grill.</h1>
      <p style={{ margin: '16px 0 28px', color: '#7a6f64' }}>
        We couldn't find what you're looking for.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </section>
  );
}