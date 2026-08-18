import { useMemo, useState } from 'react';
import { categories, menuItems } from '../data/menuData.js';
import MenuCard from '../components/MenuCard.jsx';
import './Menu.css';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <section className="container menu-page">
      <p className="eyebrow">Full Menu</p>
      <h1>Explore the Menu</h1>
      <div className="stack-divider" aria-hidden="true">
        <span className="bun-top" /><span className="patty" /><span className="bun-bottom" />
      </div>

      <div className="menu-page__controls">
        <div className="menu-page__tabs" role="tablist" aria-label="Menu categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`menu-page__tab ${activeCategory === cat ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="menu-page__search"
          placeholder="Search the menu..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search menu items"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="menu-page__empty">No items match your search. Try a different keyword or category.</p>
      ) : (
        <div className="menu-grid">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}