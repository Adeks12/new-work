const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/notes', auth, async(req, res)=>{
    console.log('User ID:',req.user);

    try{
        const note = new Note({
            userId:req.user,
            content:req.body.content
        });
        await note.save();
        
        res.json({msg:'Note saved successfully', note});
    }catch(err){
        res.status(500).json({msg:'server error'});
    }
});

module.exports = router;