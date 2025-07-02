import jwt from "jsonwebtoken";
import Account from "../models/Account.js";
import { JWT_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const account = await Account.create({ name, email, password, role });
    const token = jwt.sign(
      { id: account._id, email: account.email, role: account.role },
      JWT_SECRET
    );
    res.json({
      token,
      user: { id: account._id, name: account.name, role: account.role },
    });
  } catch (err) {
    res.status(400).json({ message: "User already exists or invalid data" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const account = await Account.findOne({ email });
    if (!account || !(await account.matchPassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: account._id, email: account.email, role: account.role },
      JWT_SECRET
    );
    res.json({
      token,
      user: { id: account._id, name: account.name, role: account.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
