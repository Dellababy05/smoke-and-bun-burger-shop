import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './LoginRegister.css';

export default function LoginRegister() {
  const [tab, setTab] = useState('login');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setError('Enter both email and password.');
      return;
    }
    login(loginForm);
    navigate(redirectTo);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || registerForm.password.length < 6) {
      setError('Fill in your name, email, and a password of at least 6 characters.');
      return;
    }
    register(registerForm);
    navigate(redirectTo);
  };

  const switchTab = (next) => {
    setTab(next);
    setError('');
  };

  return (
    <section className="container auth-page">
      <div className="auth-card">
        <div className="auth-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'login'}
            className={`auth-tabs__btn ${tab === 'login' ? 'is-active' : ''}`}
            onClick={() => switchTab('login')}
          >
            Log In
          </button>
          <button
            role="tab"
            aria-selected={tab === 'register'}
            className={`auth-tabs__btn ${tab === 'register' ? 'is-active' : ''}`}
            onClick={() => switchTab('register')}
          >
            Register
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        {tab === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
            <p className="auth-hint">Demo mode: any email + password combination works.</p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-field">
              <label htmlFor="reg-name">Full name</label>
              <input
                id="reg-name"
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Create Account</button>
          </form>
        )}
      </div>
    </section>
  );
}