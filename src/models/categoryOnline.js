import mongoose from "./index.js";
import ProductOnline from "./productOnline.js";

const categoryOnlineSchema = new mongoose.Schema({
  categoryImage: {
    type: String,
    required: true, 
    trim: true, 
  },
  categoryName: {
    type: String,
    required: true,
    trim: true,
    unique: true, 
    minlength: 3, 
    maxlength: 50, 
  },
  brands: {
    type: [String],
    trim: true,
    uniqueItems: true,
  },
  products: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ProductOnline }],
    required: false,
  },
});

const CategoryOnline = mongoose.model("category_online", categoryOnlineSchema);

export default CategoryOnline;
