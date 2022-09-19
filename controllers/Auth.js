const db = require('../models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const sendMail = (emailUsuario) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const message = {
    to: emailUsuario, // Para usuario
    from: 'lucianoscaglione21@gmail.com', // Email verificado en sendGrid.
    subject: '¡Bienvenido a nuestra ONG!', // Título
    text: 'Gracias por registarte, ¡Esperemos que andes bien!' // Texto a agregar.
  }
  sgMail.send(message).then(() => {
    console.log('Email de bienvenida enviado')
  }).catch((error) => {
    console.error(error)
  });
}

const userRegister = async (req, res) => {
  try {
    // Obtener input.
    const { firstName, lastName, email, image, password } = req.body;

    // Validar input del usuario.
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("Se requiere rellenar todos los campos: nombre, apellido, email y password");
    }

    // Checkear si el usuario ya existe.
    const searchUser = await db.User.findOne({ where: { email: email } });
    if (searchUser) {
      return res.status(409).send("Este email ya está registrado")
    }

    // Encriptar la contraseña del usuario.
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la DB.
    const user = await db.User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // Convertir el mail a minúsculas.
      image,
      password: encryptedPassword,
      roleId: 2
    });

    // Enviar email de bienvenida al nuevo usuario registrado.
    sendMail(email);

    // Devolver nuevo usuario.
    res.status(201).json({
      "user": user
      })
  } catch (err) {
    console.log(err);
  }
}

const userLogin = async (req, res) => {
  try {
    // Obtener input.
    const { email, password } = req.body;

    // Validar input.
    if (!(email && password)) {
      res.status(400).send("Se requiere rellenar los campos: email y password")
    }

    // Validar si el usuario existe en la DB.
    const user = await db.User.findOne({ where: { email: email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Crear token.
      const token = jwt.sign({ user_id: user.id, email }, "secret", { expiresIn: "10h" });

      // Guardar token.
      user.token = token;

      // Devolver user.
      res.status(201).json({
        "user": user,
        "token": token
      })
    } else {
      res.status(400).send("{ok: false}")
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  userRegister,
  userLogin
}