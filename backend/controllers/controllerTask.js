const { PrismaClient } = require('@prisma/client') 

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

const createTask = async (req, res) => {
  try {
    const { listid, description} = req.body
    const list = await prisma.tasks.create({
      data: {
        listid,
        description,
      }
    });
    return res.status(200).json({ list });
  
    
    
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const getAllTasks = async (req, res) => {
  try {
    
    const lists = await prisma.tasks.findMany()
    
    return res.status(200).json({ lists });
        
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
    createTask,
    getAllTasks
}