// Mock menu data — swap this for a real API call later.
// Each item supports a customization list used by the Menu card + Cart.

export const categories = ['All', 'Signature', 'Classic', 'Veggie', 'Sides', 'Drinks'];

export const menuItems = [
  {
    id: 'b-01',
    name: 'Smoke Ranger',
    category: 'Signature',
    price: 109,
    description: 'Double smashed patty, smoked cheddar, crispy onions, chipotle mayo.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    customizations: ['Extra patty (+25 kr)', 'Extra cheese (+10 kr)', 'No onions', 'Add bacon (+15 kr)'],
  },
  {
    id: 'b-02',
    name: 'Mustard Mile',
    category: 'Classic',
    price: 89,
    description: 'Single beef patty, American cheese, pickles, house mustard sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    customizations: ['Extra patty (+25 kr)', 'Extra cheese (+10 kr)', 'Add jalapeños (+8 kr)'],
  },
  {
    id: 'b-03',
    name: 'Firelight Stack',
    category: 'Signature',
    price: 119,
    description: 'Triple patty, ghost pepper jack, candied bacon, chili aioli.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80',
    customizations: ['Extra patty (+25 kr)', 'Make it mild', 'Add fried egg (+12 kr)'],
  },
  {
    id: 'b-04',
    name: 'Charcoal Garden',
    category: 'Veggie',
    price: 95,
    description: 'Grilled black bean patty, avocado, charred corn salsa, chipotle crema.',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80',
    customizations: ['No avocado', 'Add cheese (+10 kr)', 'Gluten-free bun (+10 kr)'],
  },
  {
    id: 'b-05',
    name: 'Ember Bacon Melt',
    category: 'Classic',
    price: 105,
    description: 'Beef patty, smoked bacon, melted gouda, caramelized onion.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    customizations: ['Extra bacon (+15 kr)', 'No onion', 'Extra cheese (+10 kr)'],
  },
  {
    id: 'b-06',
    name: 'Paper Bag Fries',
    category: 'Sides',
    price: 45,
    description: 'Hand-cut fries tossed in smoked paprika salt.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    customizations: ['Add cheese sauce (+10 kr)', 'Add chili (+15 kr)'],
  },
  {
    id: 'b-07',
    name: 'Smoked Onion Rings',
    category: 'Sides',
    price: 49,
    description: 'Beer-battered onion rings, chipotle dip.',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80',
    customizations: ['Extra dip (+5 kr)'],
  },
  {
    id: 'b-08',
    name: 'Mustard Fizz Soda',
    category: 'Drinks',
    price: 29,
    description: 'House-made ginger & citrus soda, served over ice.',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80',
    customizations: ['No ice', 'Large size (+10 kr)'],
  },
];

export const getItemById = (id) => menuItems.find((item) => item.id === id);