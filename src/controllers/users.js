import { UserModel, UserAddressModel } from '../models/users.js';
import ts from "../utils/tokenServices.js"

const signIn = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      const hashedPassword = await ts.hashPassword(req.body.password);
      req.body.password = hashedPassword;
      await UserModel.create(req.body);
      res.status(200).send({
        message: "User signIn succssful!",
      });
    } else {
      res.status(400).send({
        message: `User with ${req.body.email} already exists!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const logIn = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (await  ts.hashCompare(req.body.password, user.password)) {
        const token = await  ts.createToken({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user._id,
          role: user.role,
        });

        res.status(200).send({
          message: "Login Successful",
          user,
          token,
        });
      } else {
        res.status(400).send({
          message: "Incorrect password!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error!!",
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const { userId, ...newAddressData } = req.body;
    const user = await UserModel.findById(userId);
    if (user) {
      const newAddress = new UserAddressModel(newAddressData);
      user.address.push(newAddress);
      await user.save();
      res.status(201).send({ message: "Address added successfully" });
    } else {
      res.status(404).send({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { userId, addressId, ...addressData } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    const addressToUpdate = user.address.id(addressId);

    if (!addressToUpdate) {
      return res.status(404).send({
        message: "Address not found!",
      });
    }

    Object.assign(addressToUpdate, addressData);

    await user.save();

    res.status(200).send({
      message: "Address updated successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error!!",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate({ _id: req.body._id },req.body, { new: true });
    if (user) {
      res.status(200).send({
        message: "User updated successfully",
        user,
      });
    } else {
      res.status(400).send({
        message: "User not found!"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error!!",
    });
  }
};

export default { signIn, logIn, updateUser , addAddress, updateAddress };
