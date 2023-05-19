const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  platfom: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minLength: 4,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  genre: {
    type: String,
    minLength: 2,
    required: true,
  },
  description: {
    type: String,
    minLength: 10,
    required: true,
  },
  boughtBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
// need a array of likes or coments or something like that
const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
