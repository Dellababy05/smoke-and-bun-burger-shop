import { useState } from 'react';
import Modal from '../components/Modal.jsx';
import './Contact.css';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.message.trim()) next.message = "Don't forget your message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Mocked send — in a real app this would POST to a backend or email service.
    setShowConfirm(true);
    setForm(INITIAL_FORM);
  };

  return (
    <section className="container contact-page">
      <p className="eyebrow">Get in touch</p>
      <h1>Contact Us</h1>
      <div className="stack-divider" aria-hidden="true">
        <span className="bun-top" /><span className="patty" /><span className="bun-bottom" />
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={form.name} onChange={handleChange('name')} />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={handleChange('email')} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" type="text" value={form.subject} onChange={handleChange('subject')} />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={5} value={form.message} onChange={handleChange('message')} />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <div>
            <h3>Visit</h3>
            <p>142 Ember Street, Riverside, CA 92501</p>
          </div>
          <div>
            <h3>Call</h3>
            <p>(951) 555-0148</p>
          </div>
          <div>
            <h3>Hours</h3>
            <p>Mon–Sun · 11am – 10pm</p>
          </div>
        </div>
      </div>

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Message sent!">
        <p>Thanks for reaching out — our team will get back to you within one business day.</p>
        <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={() => setShowConfirm(false)}>
          Done
        </button>
      </Modal>
    </section>
  );
}