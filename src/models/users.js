import mongoose from "./index.js";
const UserAddressSchema = new mongoose.Schema({
  addressName: {
    type: String,
    trim: true,
    required: [true, "Address name is required"],
  },
  doorNo: {
    type: String,
    trim: true,
    required: [true, "Door Number required"],
  },
  street: {
    type: String,
    trim: true,
    required: [true, "Street name is required"],
  },
  townOrVillage: {
    type: String,
    trim: true,
    required: [true, "Town/village name is required"],
  },
  district: {
    type: String,
    trim: true,
    required: [true, "District name is required"],
  },
  state: {
    type: String,
    trim: true,
    required: [true, "State name is required"],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country name is required"],
  },
  pincode: {
    type: String,
    trim: true,
    required: [true, "Pincode is required"],
    match: /^\d{6}$/,
  },
  geoLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: [true, "Geolocation is required"],
      index: "2dsphere",
    },
  },
});

let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 5,
    select: true, //Exclude from select query results by default(When any developer writes a select query ,then password field is excluded from the result)
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => validateEmail(value),
    },
  },
  mobileNumber: {
    type: Number,
    required: [true, "MobileNumber is required"],
    trim: true,
  },
  role: {
    type: [String],
    default: ["user"],
  },
  preferedLanguage: {
    type: String,
    default: "en",
  },
  theme: {
    type: String,
    default: "light",
  },
  address: [UserAddressSchema],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const UserModel = mongoose.model("User", UserSchema);
export const UserAddressModel = mongoose.model("UserAddress", UserAddressSchema);


