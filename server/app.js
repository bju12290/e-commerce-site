require('dotenv').config()
const functions = require('firebase-functions');
const config = require('./config/default')
const fs = require('fs');
const express = require('express')
const axios = require('axios')
const cors = require('cors')({ origin: true });
const stripe = require('stripe')(config.stripeApiKey);
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const firebase = require('firebase/app');
require('firebase/auth');
const db = require('firebase/database');

// Initialize Firebase app with your Firebase configuration
const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: "ecommerce-site-584f2.firebaseapp.com",
  databaseURL: "https://ecommerce-site-584f2-default-rtdb.firebaseio.com",
  projectId: "ecommerce-site-584f2",
  storageBucket: "ecommerce-site-584f2.appspot.com",
  messagingSenderId: config.firebaseMessagingSenderId,
  appId: config.firebaseAppId,
  measurementId: config.firebaseMeasurementId
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = db.getDatabase(firebaseApp);

const app = express();

cloudinary.config({
  secure: true
});


app.use(cors)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }))
const apiKey = config.printfulApiKey

const createCustomer = function(email) {
    let param = {}
    param.email = email
    param.description = "From Node.js"

    stripe.customers.create(param, function (err, customer) {
        if (err) {
            console.error("Error: "+err)
        }if (customer) {
            //console.log("Customer Created"+ customer)
        } else {
            //console.log("Something went wrong!")
        }
    })
}

app.get('/getStripeCustomerId', async (req, res) => {
    const { email } = req.query; 
    try {
        // Use the Stripe API to search for the customer based on the email
        const searchResults = await stripe.customers.search({
          query: `email:"${email}"`, // Search by email
        });
    
        // Assuming that searchResults.data is an array with customer objects
        if (searchResults.data.length > 0) {
          const customerId = searchResults.data[0].id;
          res.json({ id: customerId }); // Return the customerId
        } else {
          res.status(404).json({ error: 'Stripe customer not found for this email' });
        }
      } catch (error) {
        console.error('Error while retrieving Stripe customer data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });

  app.post('/getCustomerInfo', async (req, res) => {
    const {customerId} = req.query
    try {
      const customer = await stripe.customers.retrieve(
        customerId
      );
      res.json(customer)
    } catch (error) {
      console.error('Error while retrieving Stripe Customer Data:', error)
      res.status(500).json({error: 'Internal server error'})
    }
  })
  

app.post('/getOrderHistory', async (req, res) => {
    
  const { customerId } = req.query

    try {
        const paymentIntents = await stripe.checkout.sessions.list({
          customer: customerId,
          limit: 10
        });

        res.json({paymentIntents})
    } catch (error) {
      console.error('Error while retrieving Stripe customer order history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/getOrderDetails', async (req, res) => {
  const { orderId } = req.query;

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(orderId, { limit: 5 });
    res.json({ lineItems });
  } catch (error) {
    console.error('Error getting order details', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/createCustomer', async (req, res) => {
    const { email } = req.body; // Get the user's email from the request body
    createCustomer(email);
    res.json({ message: 'Stripe customer created' });
})

app.post('/updateCustomer', async (req, res) => {
  const { customerId } = req.query
  const userInfo = JSON.parse(req.body.userInfo);
  await stripe.customers.update(
    customerId,
    {name: userInfo.name, address: {
      city: userInfo.city,
      country: userInfo.country,
      line1: userInfo.line1,
      line2: userInfo.line2,
      postal_code: userInfo.postal_code,
      state: userInfo.state
    }}
  );
  res.json({ message: 'Stripe customer updated' });
}) 

app.get('/getProductInformation', async (req, res) => {

    // Set up headers
    const config = {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios.get(`https://api.printful.com/store/products`, config)

        if (response.status === 200) {
            // Send the data from Printful's API as a response to your client
            res.json(response.data)
        } else {
            // Handle errors
            res.status(response.status).json({ error: 'API request failed' })
        }
    } catch (error) {
        // Handle request errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.get('/popularity', (req, res) => {
  // Reference to the 'popularity' data in your Realtime Database.
  const ref = db.ref(database)
  db.get(db.child(ref, `popularity`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.status(404).send('Popularity data not found');
    }
  })
  .catch((error) => {
    console.error('Error reading popularity data:', error);
    res.status(500).send('Internal Server Error');
  });
});

app.get('/popularity/:productId', (req, res) => {
  const productId = req.params.productId;
  const ref = db.ref(database)

  db.get(db.child(ref, `popularity/${productId}/${productId}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      try {
        const popularityData = JSON.parse(snapshot.val());

        // Retrieve the popularity data for the specified product.
        // const popularity = popularityData[productId]

        // Send the popularity data as a JSON response.
        res.json(popularityData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(404).send('Popularity data not found');
    }
  })
  .catch((error) => {
    console.error('Error reading popularity data:', error);
    res.status(500).send('Internal Server Error');
  });
});

app.put('/popularity/:productId', (req, res) => {
  const productId = req.params.productId;
  const { popularity } = req.body;
  const ref = db.ref(database)

  const popularityData = {};
  popularityData[productId] = popularity;

  const updates = {}
  updates['/popularity/' + productId] = popularityData

  db.update(ref, updates)
})

app.get('/getProductInformation/:productId', async (req, res) => {
  const productId = req.params.productId;

  const config = {
      headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
      },
  }

  try {
      const response = await axios.get(`https://api.printful.com/store/products/${productId}`, config);
      const productData = response.data;

      try {
          const stripeProductData = await stripe.products.search({
              query: `metadata['productId']:"${productId}"`,
          });
          const combinedData = {
              printfulData: productData,
              stripeData: stripeProductData,
          };

          res.json(combinedData);
      } catch (error) {
          console.error('Stripe Error:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  } catch (error) {
      console.error('Printful Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


  // function readCurrentOrderID() {
  //   const ref = db.ref(database)

  //   const data = db.get(db.child(ref, `currentOrderID`))
  //   return JSON.parse(data);
  // }

  function incrementOrderID() {
    const ref = db.ref(database)

    const orderId = 0;
    const newOrderId = orderId + 234

    const updates = {}
    updates['/currentOrderID'] = newOrderId

    db.update(ref, updates)
  }

app.post('/create-checkout-session', async (req, res) => {

  const newOrderID = incrementOrderID();

  const customerId = req.query.customerId
  const cartContents = JSON.parse(req.body.cartContents);
  const lineItems = [];
  let colors = ''
  let sizes = ''
  const thumbnail_url = cartContents[0].thumbnail_url
  const name = cartContents[0].name

  cartContents.forEach((item) => {
    const { quantity, price, color, size } = item

    lineItems.push({
      price, 
      quantity,
    });

    colors = colors + " - " + color

    sizes = sizes + " - " + size
  });

  const sessionOptions = {
    line_items: lineItems, // Use the array of line items
    automatic_tax: {
      enabled: false,
    },
    metadata: {
      order_size: sizes,
      product_variant: colors,
      thumbnail: thumbnail_url,
      product_title: name,
      order_number: newOrderID,
    },
    payment_intent_data: {
      metadata: {
        order_size: sizes,
        product_variant: colors,
        thumbnail: thumbnail_url,
        product_title: name,
        order_number: newOrderID,
      },
    },
    mode: 'payment',
    success_url: `https://ecommerce-site-584f2.web.app/success`,
    cancel_url: `https://ecommerce-site-584f2.web.app/cancel`,
  };

  if (customerId) {
    sessionOptions.customer = customerId;
  }

    const session = await stripe.checkout.sessions.create(sessionOptions);
    res.redirect(303, session.url);
  });

exports.api = functions.https.onRequest(app);