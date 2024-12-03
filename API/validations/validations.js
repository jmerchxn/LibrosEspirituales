import Joi from "joi";
import etapaModel from "../models/etapaModel.js";
import autorModel from "../models/autorModel.js";
import userModel from "../models/userModel.js";
import librosModel from "../models/librosModel.js";
import multer from 'multer';
export const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    tags: Joi.array().items(Joi.string()),
  });
  return schema.validate(data);
};

// Validaciones para los usuarios
export const validateUserFields = (req, res, next) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({
      message:
        "Nombre, correo electrónico, nombre de usuario y contraseña son campos obligatorios.",
    });
  }
  // Validación manual del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "El correo electrónico no tiene un formato válido." });
  }
  next();
};

export const checkEmailExistente = async (req, res, next) => {
  const { email } = req.body;
  let userExistente = await userModel.findOne({ email: email });

  if (userExistente) {
    return res
      .status(400)
      .json({ message: "El correo electrónico ya está en uso." });
  }

  next();
};

export const passwordValida = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "La contraseña es obligatoria." });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 8 caracteres." });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({
      message: "La contraseña debe contener al menos una letra mayúscula.",
    });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({
      message: "La contraseña debe contener al menos una letra minúscula.",
    });
  }
  if (!/[0-9]/.test(password)) {
    return res
      .status(400)
      .json({ message: "La contraseña debe contener al menos un número." });
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(400).json({
      message: "La contraseña debe contener al menos un carácter especial.",
    });
  }

  next();
};

// Validaciones para el autor
export const validateAutorName = async (name) => {
  if (!name) {
    return "El nombre es obligatorio.";
  }
  if (/\d/.test(name)) {
    return "El nombre no puede contener números.";
  }
  const caracteresEspeciales = /[!@#$%^&*(),.?":{}|<>]/;
  if (caracteresEspeciales.test(name)) {
    return "El nombre no puede contener caracteres especiales.";
  }

  const nombreAutorExistente = await autorModel.findOne({ name: name });
  if (nombreAutorExistente) {
    return "Este autor ya se encuentra en nuestra base de datos!";
  }
  const idAutorExistente = await autorModel.findOne({ name: name });
  if (idAutorExistente) {
    return "Este autor ya se encuentra en nuestra base de datos!";
  }
};

// Validaciones de Etapa
export const etapaValida = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ msg: "error", error: "Ingrese el nombre de la etapa" });
  }
  if (typeof name !== "string") {
    return res
      .status(400)
      .json({ msg: "error", error: "Name must be a string" });
  }

  // Validar que el nombre tenga al menos 3 caracteres
  if (name.length < 6) {
    return res.status(400).json({
      msg: "error",
      error: "La etapa debe tener un mínimo de 6 caractéres",
    });
  }

  if (name.length > 30) {
    return res.status(400).json({
      msg: "error",
      error: "La etapa debe tener un máximo de 30 caractéres",
    });
  }

  try {
    const etapaExistente = await etapaModel.findOne({ name });
    if (etapaExistente) {
      return res
        .status(400)
        .json({ msg: "error", error: "Esta etapa ya existe!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "error", error: "Database error" });
  }

  next();
};

// Validaciones para libro


export const validateAutor = async (autor) => {
  let autorExistente = await autorModel.findOne({ name: autor });
  if (!autorExistente) {
    autorExistente = new autorModel({ name: autor });
    await autorExistente.save(); // Guardar el autor si no existe
  }
  return autorExistente;
};

export const validateEtapa = async (etapa) => {
  let etapaExistentePorName = await etapaModel.findOne({ name: etapa });
  console.log(etapaExistentePorName);
  if (!etapaExistentePorName) {
    etapaExistentePorName = new etapaModel({ name: etapa });
    await etapaExistentePorName.save();
    return etapaExistentePorName;
  }
};


export const validarLibro = async (req, res, next) => {
  const { name, autor, etapa, descripcion, complejidad, imagen, comentario } =
    req.body;
  // Validaciones del nombre del libro

  if (!name) {
    return res.status(400).json({ msg: "error", error: "Name is required" });
  }


  if (typeof name !== "string") {
    return res
      .status(400)
      .json({ msg: "error", error: "Name must be a string" });
  }


  if (name.length < 3) {
    return res.status(400).json({
      msg: "error",
      error: "Name must be at least 3 characters long",
    });
  }


  if (descripcion.length < 20) {
    return res
      .status(400)
      .json({ msg: "error", error: "Es una descripción demasiado corta!" });
  }


  try {
    const libroExistente = await librosModel.findOne({ name });
    console.log('paso5')

    if (libroExistente) {
      return res
        .status(400)
        .json({ msg: "error", error: "Este libro ya existe!!" });
    }    

  } catch (error) {
    return res.status(500).json({ msg: "error", error: "Database error" });
  }    



  try {
    await validateAutor(autor);

  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error", error: "Error en validar el autor" });
  }    

  try {
    await validateEtapa(etapa);


  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error", error: "Error en validar el etapa" });
  }
  console.log('paso6')


  next();
};
