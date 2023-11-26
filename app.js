require('dotenv').config();
require('express-async-errors');
const express = require('express');

const { notFound, errorHandler } = require('./middleware');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
