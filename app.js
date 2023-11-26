require('dotenv').config();
require('express-async-errors');
const express = require('express');

const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');
const { connectDB } = require('./db/connect');
const { notFound, errorHandler } = require('./middleware');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1', authRouter);
app.use('/api/v1/jobs', jobsRouter);

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
