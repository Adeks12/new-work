const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

router.post('/', auth, async(req, res)=>{
   
    try{
        const newNote = new Note({
            user:req.user.id,
            title:req.body.title,
            content:req.body.content
        });

        const note = await newNote.save();
        
        res.json({msg:'Note saved successfully', note});
    }catch(err){
        console.error('Create Note Error:', err.message);
        res.status(500).json({msg:'server error'});
    }
});

router.get('/', auth, async(req,res) => {
    try{
        const notes = await Note.find({user:req.user.id}).sort({createdAt:-1});
        res.json(notes);
    }catch(err) {
        console.error('Get Note Error:',err.message);
        res.status(500).json({msg:'Server error'});
    }
});

router.get('/:id', auth, async(req,res)=>{
    try{
        const note = await Note.findOne({_id:req.params.id,user:req.user.id});
        if(!note) return res.status(404).json({msg:'Note not found'});
        res.json(note);

    }catch(err){
        console.error('Get Note Error:',err.message);
        res.status(500).json({msg:'Server error'});

    }
});

router.put('/:id', auth, async(req,res)=>{
    const {title,content} = req.body;
    try{
        let note = await Note.findOne({_id:req.params.id,user:req.user.id});
        if(!note) return res.status(404).json({msg:'Note not found'});

        note.title = title || note.title;
        note.content = content||note.content;

        const updatedNote = await note.save();
        res.json(updatedNote);

    }catch(err){
        console.error('Update Note Error:',err.message);
        res.status(500).json({msg:'Server error'});

    }
});
router.delete('/:id', auth, async(req,res)=>{
    try{
        const note = await Note.findOneAndDelete({_id:req.params.id,user:req.user.id});
        if(!note) return res.status(404).json({msg:'Note not found'});

        res.json({msg: 'Note deleted'});

    }catch(err){
        console.error('Delete Note Error:',err.message);
        res.status(500).json({msg:'Server error'});

    }
});



module.exports = router;