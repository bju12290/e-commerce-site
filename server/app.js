require('dotenv').config()
const https = require('https');
const fs = require('fs');
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const stripe = require('stripe')(process.env.TEST_STRIPE_API_TOKEN);
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;

const app = express();

const YOUR_DOMAIN = 'https://localhost:3000';

cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }))
const apiKey = process.env.PRINTFUL_API_TOKEN

const createCustomer = function(email) {
    let param = {}
    param.email = email
    param.description = "From Node.js"

    stripe.customers.create(param, function (err, customer) {
        if (err) {
            console.log("Error: "+err)
        }if (customer) {
            console.log("Customer Created"+ customer)
        } else {
            console.log("Something went wrong!")
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
  console.log(customerId)
  const userInfo = JSON.parse(req.body.userInfo);
  console.log(req.body.userInfo)
  const customer = await stripe.customers.update(
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
  // Read and send the JSON file with popularity data.
  res.sendFile(__dirname + '/popularity.json');
});

app.get('/popularity/:productId', (req, res) => {
  const productId = req.params.productId;

  // Read the JSON file that contains popularity data.
  fs.readFile('popularity.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      try {
        const popularityData = JSON.parse(data);

        // Retrieve the popularity data for the specified product.
        const popularity = popularityData[productId];

        // Send the popularity data as a JSON response.
        res.json(popularity);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

app.put('/popularity/:productId', (req, res) => {
  const productId = req.params.productId;
  const { popularity } = req.body;

  // Read the JSON file to get the current popularity data.
  fs.readFile('popularity.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      const popularityData = JSON.parse(data);

      // Update the popularity value for the specified product.
      popularityData[productId] = popularity;

      // Write the updated data back to the JSON file.
      fs.writeFile('popularity.json', JSON.stringify(popularityData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to JSON file:', writeErr);
          res.status(500).send('Internal Server Error');
        } else {
          // Respond with the updated popularity value.
          res.json(popularity);
        }
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
});

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
              query: `metadata[\'productId\']:"${productId}"`,
          });

          // Combine the data from both APIs into a single object
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


  function readCurrentOrderID() {
    const data = fs.readFileSync('orderId.json');
    return JSON.parse(data).currentOrderID;
  }

  function incrementOrderID() {
    const currentID = readCurrentOrderID();
    const newID = currentID + 234;
    
    // Update the JSON file with the new ID
    fs.writeFileSync('orderId.json', JSON.stringify({ currentOrderID: newID }));
    
    return newID;
  }

app.post('/create-checkout-session', async (req, res) => {

  const newOrderID = incrementOrderID();
  console.log(`New Order ID: ${newOrderID}`);

  const customerId = req.query.customerId
  const cartContents = JSON.parse(req.body.cartContents);
  console.log(customerId)
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
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/cancel`,
  };

  if (customerId) {
    sessionOptions.customer = customerId;
  }
  console.log(sessionOptions)

    const session = await stripe.checkout.sessions.create(sessionOptions);
    res.redirect(303, session.url);
  });

const sslOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

console.log('SSL Options:', sslOptions);

const port = 3000

const server = https.createServer(sslOptions, app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    if(process.env.PRINTFUL_API_TOKEN && process.env.TEST_STRIPE_API_TOKEN) { 
        console.log('Printful API Token and Test Stripe API Token Set Successfully!')
    }
    else { 
        console.log('One ore more of the tokens were not set successfully!')
    }
})