# Smoke and Bun

Smoke and Bun is a burger shop website I built with React. The idea behind it was to take a real business scenario, a local burger shop that only sells in person, and build the kind of website that would let it start taking orders online. Along the way this became a project for practicing routing, state management, form handling and building a full checkout flow from scratch, without relying on a real backend.

## What the site does

The site has a home page that introduces the shop and highlights a few signature burgers, and a full menu page where you can search and filter by category. Each item on the menu can be customized, and you can adjust the quantity before adding it to your cart. There is an about page that tells the story of the shop and its founder, and a contact page with a form that shows a confirmation message once submitted.

There is also a login and register page, built with two tabs so people can switch between signing in and creating an account without leaving the page. Once you are logged in, your name shows up in the header instead of the login link.

The cart page shows everything you have added, lets you change quantities or remove items, and updates the total as you go. If you add the same burger twice but customize it differently each time, it shows up as two separate lines rather than merging them together, which is closer to how a real ordering system would behave.

From the cart you move to a shipping and payment page, where you fill in a delivery address and a card number. I used Sweden, Finland, Denmark and Norway as the country options, since that felt more relevant than defaulting to the United States. No real payment is processed here, it is just a simulated checkout, but the form still validates things like postal codes and card format before letting you continue.

Once an order is placed, it shows up on a my orders page as a row in a table, with a status and a total. Clicking into an order shows a full breakdown, what was ordered, when it was placed, how it is being paid for, and where it is being shipped.

## How it is built

The project runs on Vite and React. I used React Router to handle navigation between pages, so things like the menu, cart and order details all have their own real url instead of everything living on one page. For state that needs to be shared across the app, like what is in the cart, whether someone is logged in, and what orders have been placed, I used React's Context API instead of passing props down through every component.

There is no real backend behind any of this. Everything is saved to the browser's local storage, so your cart, your login session and your past orders will still be there if you refresh the page, but none of it is connected to an actual server or database. That was a deliberate choice for this stage of the project, since the goal was to focus on the front end first. Prices throughout the site are shown in Swedish kronor rather than dollars.

Styling is all plain CSS, no framework like Tailwind or Bootstrap. I set up one shared file with colors, fonts, spacing and a few reusable classes like buttons, and every page and component pulls from that so the whole site feels consistent rather than styled piece by piece.

## Running it locally

To get the project running on your own machine, install the dependencies first.

npm install


Then start the development server.

npm run dev


It will print out a local address, usually localhost 5173, that you can open in your browser.

If you want to build it for production instead of just running it locally, use these two commands.

npm run build
npm run preview


## How the project is organized

Inside the src folder, components holds the pieces that get reused across pages, things like the header, footer, the menu card, and a popup component used for things like the contact form confirmation and the order confirmation. Context holds the three files that manage shared state, one for the cart, one for login, and one for orders. Data holds the mock menu items and the list of countries and regions used on the shipping page. Pages holds one file for every page on the site. There is also a small utils folder with a single file that handles formatting prices consistently, so the currency only needs to be defined in one place.

## What would need to change for this to be a real product

As it stands, login, payment and order status are all simulated for the sake of the demo. Turning this into something a real business could use would mean connecting it to an actual backend and database, wiring up a real payment provider instead of just validating card formatting, and having order status update automatically as an order moves through preparation and delivery rather than always showing as confirmed. I would also want to make the item customizations actually affect the price, since right now they are shown as labels but do not change the total.