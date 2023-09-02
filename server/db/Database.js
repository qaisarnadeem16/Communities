const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Set the write concern to 'majority'
      // This ensures that write operations require acknowledgment from the majority of replica set members.
      writeConcern: {
        w: 'majority',
      },
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error(`MongoDB connection error: ${error}`);
    });
};

module.exports = connectDatabase;
