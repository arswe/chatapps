const mongoose = require('mongoose');
const colors = require('colors');

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(colors.cyan.bold(`database connection successful!: ${conn.connection.host}`));
  } catch (error) {
    console.error(colors.underline.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

module.exports = connectDB;
