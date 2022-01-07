const Notes = require('../models/notes');
const User = require('../models/user');


const createPost = async (req, res) => {
  try {
    
    const note = await Notes.create({
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
    
      
    });
    return res.status(200).json({ note, });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const getAllNotes = async (req, res) => {
  try {
    
    const notes = await Notes.findAll({
      attributes: ['userId', 'title', 'description']
    });
    
    return res.status(200).json({ notes });
        
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const [ updated ] = await Notes.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedPost = await Notes.findOne({ where: { id: id } });
      return res.status(200).json({ note: updatedPost });
    }
    throw new Error('Post not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notes.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(200).json({"msg": "Note deleted"});
    }
    throw new Error("Note not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createPost,
  getAllNotes,
  updateNotes,
  deleteNotes
}
