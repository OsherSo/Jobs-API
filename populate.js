require('dotenv').config();

const Job = require('./models/Job');
const data = require('./mock-data.json');
const connectDB = require('./db/connect');

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Job.deleteMany();
    await Job.insertMany(data);
    console.log('Success!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
