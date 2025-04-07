import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findAll(req, res) {
  try {
    const { page = 1, limit = 10, sort, name } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    let filters = {};
    if (name) {
      filters.name = { contains: name, mode: 'insensitive' };
    }
    let all = await prisma.product.findMany({ where: filters, take, skip });

    if (sort) {
      if (sort == 'name') {
        all.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort == '-name') {
        all.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    res.send({ data: all });
  } catch (error) {
    res.send(error);
  }
}

async function findOne(req, res) {
  try {
    let one = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    res.send(one);
  } catch (error) {
    res.send(error);
  }
}
async function Create(req, res) {
  try {
    let creat = await prisma.product.create({ data: req.body });
    res.send(creat);
  } catch (error) {
    res.send(error);
  }
}
async function update(req, res) {
  try {
    let data = await prisma.product.findUnique({
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
    let produc = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    let deleted = await prisma.product.delete({
      where: { id: req.params.id },
    });
    res.send(deleted);
  } catch (error) {
    res.send(error);
  }
}

export { findAll, findOne, Create, update, remove };
