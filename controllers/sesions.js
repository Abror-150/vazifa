import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findAll(req, res) {
  try {
    let all = await prisma.session.findMany();
    res.send(all);
  } catch (error) {
    console.log(error);
  }
}

async function findOne(req, res) {
  try {
    let all = await prisma.session.findUnique(req.params.id);

    res.send(all);
  } catch (error) {
    console.log(error);
  }
}

async function remove(req, res) {
  try {
    let deleted = await prisma.session.findUnique({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).send({ message: 'sesion not found' });
    }

    let ses = await prisma.session.delete({ where: { id: req.params.id } });
    res.send(ses);
  } catch (error) {
    console.log(error);
  }
}

export { findAll, findOne, remove };
