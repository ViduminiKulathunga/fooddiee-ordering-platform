import { Request, Response } from "express";
import User from "../models/User";

export const createCurrentUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).json(existingUser.toObject());
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const updateCurrentUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, addressLine1, country, city } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.address = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    return res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};
