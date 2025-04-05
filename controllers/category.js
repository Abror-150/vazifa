import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findAll(req, res) {
  try {
    let all = await prisma.category.findMany();
    res.send(all);
  } catch (error) {
    res.send(error);
  }
}

async function findOne(req, res) {
  try {
    let one = await prisma.category.findFirst({
      where: { id: req.params.id },
    });
    if (!one) {
      return res.status(404).send({ message: 'category not found' });
    }
    res.send(one);
  } catch (error) {
    res.send(error);
  }
}
async function Create(req, res) {
  try {
    let creat = await prisma.category.create({ data: req.body });
    console.log(creat);

    res.send(creat);
  } catch (error) {
    res.send(error);
  }
}
async function update(req, res) {
  try {
    let data = await prisma.category.findUnique({
      where: { id: req.params.id },
    });
    await data.update(req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}
async function remove(req, res) {
  try {
    let category = await prisma.category.findUnique({
      where: { id: req.params.id },
    });
    if (!category) {
      return res.status(404).send({ message: 'category not found' });
    }
    let deleted = await prisma.category.delete({
      where: { id: req.params.id },
    });

    res.send(deleted);
  } catch (error) {
    res.send(error);
  }
}

export { findAll, findOne, Create, update, remove };
