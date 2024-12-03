import userModel from "../models/userModel.js";
import librosModel from "../models/librosModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { name, lastname, username, email, password, completed } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      lastname,
      username,
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
  try {
    // Validación de los campos de la solicitud
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ error: "ok", msj: "Email and password are required" });
    }
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "ok", msj: "Wrong user or password" });
    }
    const passwordValido = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordValido) {
      return res
        .status(400)
        .json({ error: "ok", msj: "Wrong user or password" });
    }

    // Crear el token JWT
    const jwToken = jwt.sign(
      {
        usuario: {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      },
      process.env.SEED,
      { expiresIn: process.env.EXPIRATION }
    );
    res.json({
      usuario: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      jwToken,
    });
  } catch (err) {
    res.status(500).json({ error: "ok", msj: "Server error: " + err.message });
  }
};

const toggleFavorite = async (req, res) => {
  const { id, libroId } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Si el libro ya está en favoritos, lo eliminamos, si no, lo agregamos
    if (user.favoritos.includes(libroId)) {
      user.favoritos = user.favoritos.filter((id) => id !== libroId);
    } else {
      user.favoritos.push(libroId);
    }

    await user.save();
    res
      .status(200)
      .json({ msg: "Favoritos actualizados", favoritos: user.favoritos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar favoritos", error });
  }
};
const getUserFavoritos = async (req, res) => {
  const { id } = req.params; // Usamos el id como parámetro en la URL
  try {
    const user = await userModel.findById(id).populate("favoritos");
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json({ msg: "Favoritos obtenidos", data: user.favoritos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener favoritos", error });
  }
};

export {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUserById,
  loginUser,
  getUserFavoritos,
  toggleFavorite,
};
