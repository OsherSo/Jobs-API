require('dotenv').config();
require('express-async-errors');
const path = require('path');
const express = require('express');

// Security Packages
const xss = require('xss-clean');
const helmet = require('helmet');

// Database Connection
const connectDB = require('./db/connect');

// Routers
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');

// Middlewares
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());

app.use(helmet());
app.use(xss());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', auth, jobsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
