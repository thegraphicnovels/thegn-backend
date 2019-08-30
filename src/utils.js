import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretEmail = (username, address, secret) => {
  const email = {
    from: "baek@prismagram.com",
    to: address,
    subject: "🔒 Login Secret for Prismagram 🔒",
    html: `Hi ${username}, <br/><br/> Your Login secret is <strong>${secret}</strong><br/>Copy paste on the app/website to Login`
  };
  return sendMail(email);
};

export const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRETORKEY);

const BCRYPT_ROUNDS = 10;
export const hashPassword = async password =>
  await bcrypt.hash(password, BCRYPT_ROUNDS);

export const comparePassword = (password, userPassword) =>
  bcrypt.compare(password, userPassword);
