import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createUser = async (req, res) => {
  try {
    const { name, lastname, email, password, completed } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      lastname,
      email,
      password: hashedPassword,
      completed,
    });
    const savedUser = await user.save();

    res.status(200).json({ msg: "success", data: savedUser });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};


const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "success", data: user });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ msg: "success", data: users });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, password, completed } = req.body;
  try {
    let updatedData = { name, lastname, email, completed };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "success", data: updatedUser });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "success", data: deletedUser });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const secretKey = "clavesupersecreta"; // Reemplaza con una clave más segura
    const token = jwt.sign(
      { id: user._id, email: user.email },
      secretKey,
      { expiresIn: "1h" } // El token expirará en 1 hora
    );

    // Enviar el token como respuesta
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
    console.error(error);
  }
};

export {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUserById,
  loginUser,
};
