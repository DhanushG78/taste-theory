require('dotenv').config();
const Contentstack = require('contentstack');
const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT || 'development',
});

Stack.ContentType('chef').Query().toJSON().find().then(r => console.log(JSON.stringify(r[0], null, 2))).catch(console.error);
