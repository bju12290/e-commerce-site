# E-Commerce Site

## Usage
You can test the application yourself at [this link](https://ecommerce-site-584f2.web.app/).

Stripe is intentionally left in test mode so anyone can test full site functionality without having to make an actual purchase. 

If you wish to test out an order, use card number: 4242 4242 4242 4242. The rest of the details can be anything. The payment will succeed, and you will be able to preview the checkout flow.

If you wish to test out authentication and order history functionaly, you can simply create an account and then make a purchase using the test card number provided above. After doing so, head to the Dashboard and you'll be able to see any orders placed. 

## Technologies Used

### Frontend Development

 - [Vite](https://vitejs.dev/): A build tool that offers fast development and optimized production builds for modern web applications. Used for clientside development and building.
 - [React](https://react.dev/): A JavaScript library for building user interfaces, allowing for the creation of dynamic and interactive components. Used throughout the application for a wide variety of functionality.
 - [Bootstrap](https://getbootstrap.com/): A front-end framework that provides pre-designed UI components and responsive layout utilities. Used throughout the application to ensure it stays pretty on all screen sizes.
 - [React Router](https://reactrouter.com/en/main): A routing library for React applications, enabling navigation between different pages and views. Used to manage all pages throughout the application.

 ### Backend Services

 - [Firebase Cloud Functions](https://firebase.google.com/docs/functions): Serverless functions that allow you to run custom code in response to events in your Firebase project, providing a way to extend and automate the functionality of your application. Firebase Cloud Functions host all server-side functionality for the application.
 - [Firebase Authentication](https://firebase.google.com/docs/auth): Allows developers to easily integrate secure user sign-up, sign-in, and identity management into their web and mobile applications. Does the heavy lifting in terms of account creation and signing in.  
 - [Firebase Realtime Database](https://firebase.google.com/docs/database): A NoSQL cloud database from Google's Firebase platform that enables real-time data synchronization across web and mobile applications. Used to keep track of product popularity, and clientside order IDs.
 - [Stripe API](https://stripe.com/docs/api): A payment processing interface that enables businesses to securely accept online payments, manage subscriptions, and handle various financial transactions in their web and mobile applications. Handles checkout flow, pricing, and user data for the e-commerce site.
  - [Printful API](https://developers.printful.com/docs/): A tool that allows e-commerce businesses to integrate and automate the printing and fulfillment of custom products into their online stores, streamlining the order processing and shipping of these personalized items. Used to handle product information, as well as occasionally serve "thumbnail" images throughout the site.

 ## Project Structure
 
- **'components/'**: This directory serves as a container for both reusable components and complex single-use components. Each component has it's own corresponding folder in the directory, and if applicable is stored with it's corresponding CSS file. These components are served to our **'/pages/'**.
- **'pages/'**: This directory serves as a container for all pages throughout the site. All pages have a corresponding folder inside the **'pages/'** directory, except for the **'User/'**, **'About/'**, and **'Checkout/'** directories.
    - **'User/'**: Contains pages related to the user, namely the User Dashboard, User Settings, and Order Details pages.
    - **'About/'**: Containes pages related to the about for the e-commerce store including Contact, FAQ, and information regarding the story and materials of the shop.
    - **'Checkout/'**: Contains the pages used for checkout flow, namely our Checkout Preview page, our Successful Checkout page, and our Checkout Canceled page.



 #### Contact Information

Feel free to contact via email! 

```brian.phartnettjr@gmail.com```

 #### Known Issues

 - No known issues at this time. If you find one let me know! :)

 #### Future Improvements
 - Add Images to Individual Order History Pages.



 

