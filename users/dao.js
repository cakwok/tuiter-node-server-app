import mongoose from "mongoose";
import User from "./model.js";

export const findAllUsers = async () => {
  const users = await User.find().exec();
  return users;
};

export const findUserByUsername = async (username) => {
  const user = await User.findOne({ username }).exec();
  return user;
};

export const findUsersByRole = (role) => User.find({ role });

export const findUserById = async (id) => {
  const user = await User.findById(id).exec();
  return user;
};

export const deleteUser = async (id) => {
  const status = await User.deleteOne({ _id: id }).exec();
  return status;
};

export const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

export const updateUser = async (id, user) => {
  const status = await User.updateOne({ _id: id }, { $set: user }).exec();
  return status;
};

export const findUserByCredentials = async (credentials) => {
  const user = await User.findOne(credentials).exec();
  return user;
};