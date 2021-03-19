const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const weatherController = require('./weather_ctr');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/weather', async (req, res) => {
  try {
    const data = await weatherController.invoke(req);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(err.message));
  }
});

app.listen(5005, () => {
  console.log('Server is running on port 5005');
});
