import mongoose from "./index.js";

const commentSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: "Unknown",
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
});

const productOnlineSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  brandName: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  mrp: {
    type: Number,
    required: true,
    min: 0,
  },
  offerPer: {
    type: Number,
    validate: {
      validator: (value) => value >= 0 && value <= 100,
      message: "Discount percentage must be between 0 and 100",
    },
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  comments: [commentSchema],
});

const ProductOnline = mongoose.model("products_online", productOnlineSchema);

export default ProductOnline

