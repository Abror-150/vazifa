import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { getToken, refreshToken, sendEmail } from '../functions/eskiz.js';
import { totp } from 'otplib';
const prisma = new PrismaClient();

async function findAll(req, res) {
  try {
    let all = await prisma.user.findMany();
    res.send(all);
  } catch (error) {
    res.send(error);
  }
}

async function findOne(req, res) {
  try {
    let one = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!one) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(one);
  } catch (error) {
    res.send(error);
  }
}
async function register(req, res) {
  try {
    let { name, email, password, role } = req.body;
    let hashed = bcrypt.hashSync(password, 10);

    let newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashed,
      },
    });

    let token = totp.generate(email + 'email');
    await sendEmail(email, token);
    res.send(newUser);
  } catch (error) {
    res.send(error);
  }
}
async function verifyy(req, res) {
  let { email, otp } = req.body;
  try {
    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      res.status(404).send({ message: 'user not exists' });
      return;
    }
    let match = totp.verify({ token: otp, secret: email + 'email' });
    if (!match) {
      res.status(401).send({ message: 'otp not valid' });
      return;
    }
    res.send(match);
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  try {
    let { name, password } = req.body;
    let user = await prisma.user.findFirst({ where: { name } });
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    let match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(401).send({ message: 'invalid password' });
    }
    let ipAdress = req.ip;
    let device = req.headers['user-agent'];
    let userSesion = await prisma.session.findFirst({
      where: { userId: user.id },
    });
    let sesion = await prisma.session.findFirst({
      where: { ipAdress: ipAdress },
    });
    if (!userSesion || !sesion)
      await prisma.session.create({
        data: { userId: user.id, ipAdress: ipAdress, userAgent: device },
      });
    await prisma.user.update({
      data: { ip: ipAdress, device: device },
      where: { id: user.id },
    });
    let accesToken = getToken(user.id, user.role);
    let refreshToke = refreshToken(user);
    res.send({ data: { accesToken, refreshToke } });
  } catch (error) {
    console.log(error);
  }
}

async function remove(req, res) {
  try {
    let del = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!del) {
      return res.status(404).send({ message: 'user not found' });
    }
    let deleted = await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.send(deleted);
  } catch (error) {
    res.send(error);
  }
}

export { findAll, findOne, register, login, verifyy, remove };
