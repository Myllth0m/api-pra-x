import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message:
      'API WORKING!! case u found any problem, pls send me on https://github.com/Myllth0m/api-pra-x/issues',
  })
})

app.post('/users', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  })

  res.status(201).json(req.body)
})

app.get('/users', async (req, res) => {
  let users = []

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        email: req.query.email,
        name: req.query.name,
        age: req.query.age,
      },
    })
  } else {
    users = await prisma.user.findMany()
  }

  res.status(200).json(users)
})

app.put('/users/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  })

  res.status(200).json(req.body)
})

app.delete('/users/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  })

  res.status(200).json({ message: 'User deleted successfully!' })
})

app.listen(port)
