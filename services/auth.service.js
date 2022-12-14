const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");

const Jwt = require('../utils/jwt');
const welcomeEmail = require('../templates/welcomeEmail');
const { getSignUrl } = require('../utils/s3');

// Models
const db = require("../models/index");

class AuthService {
  static async login(data) {
    const user = await this.validateLoginData(data);
    const token = await Jwt.signToken(user);
    return token;
  }

  static async validateLoginData(data) {
    const { email, password } = data;
    const user = await this.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("wrong email or password");
    }
    return user;
  }

  static async getUserByEmail(email) {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("wrong email or password");
    }
    return user;
  }

  static async registerUser(data) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUserData = {
      ...data,
      password: hashPassword,
      roleId: 2,
    };
    const user = await db.User.create(newUserData);
    this.sendWelcomeEmail(data.email);
    const token = await Jwt.signToken(user);
    return token;
  }

  static async sendWelcomeEmail(email) {
    const title = "¡Bienvenid@s a nuestra ONG!";
    const text = "Cualquier duda que tengas, no dudes en contactarnos";
    const contact = {
      mail: 'somos_mas@mail.com',
      instagram: '@somos_mas',
      facebook: 'somos_mas',
      phone: 'xxx-xxx-xxx',
    };

    const message = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: title,
      text,
      html: welcomeEmail(title, text, contact),
    };

    await this.sendEmail(message);
  }

  static async sendEmail(message) {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send(message);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getUserById(id) {
    const user = await db.User.findByPk(id, {
      attributes: ['firstName', 'lastName', 'image', 'email'],
    });

    // Get image url from AWS S3
    const filename = user.dataValues.image;
    const imageUrl = await getSignUrl(filename)

    return { 
      ...user.dataValues,
      image: imageUrl 
    };
  }
}

module.exports = AuthService;
