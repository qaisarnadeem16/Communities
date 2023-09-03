const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  communityImage: {
    type: String, // Assuming you will store the image URL as a string
  },
  // Add more fields as needed for other properties from the form
});

// Create a 'Community' model based on the schema
const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
