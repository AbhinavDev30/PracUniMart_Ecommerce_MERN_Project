import { request } from "express";
import UserModel from "../model/User.js";

export const Register = async (req, res) => {
  try {
    const User = await UserModel.findOne({ email: req.body.email });
    if (User) {
      res.status(404).send({ error: "User already exists" });
      return;
    } else {
      {
        let userInfo = await UserModel.create({
          ...req.body,
          profilePic: req.file?.filename,
        });
        if (userInfo) {
          res.status(201).send({ message: "User created successfully" });
        } else {
          res.status(404).send({ error: "User creation failed" });
        }
      }
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      res.status(200).send({ id: user._id, role: user.role });
    } else {
      res.status(404).send({ error: "Invalid credentials" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
