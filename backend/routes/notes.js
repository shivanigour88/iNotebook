const express = require('express')
const router = express.Router();
const Note = require('../models/Note');

//using a middleware function
var fetchuser = require('../middleware/fetchuser');
//using an express validator pakage to validate credentials
const { body, validationResult } = require('express-validator');

//Route 1 :  Get all the notes  : GET "/api/notes/fetchallnotes" .  require login
router.get('/fetchallnotes' , fetchuser , async(req , res)=>{
    try{
    const notes = await Note.find({user : req.user.id});
    res.json(notes);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal server error"); 
    }
})

//Route 2 : Add a new Note  : POST "/api/notes/addnote" .  require login
router.post('/addnote' ,[body('title','Enter a valid title').isLength({min : 3}),
body('description','Description must be atleat 5 charcaters').isLength({min : 5})  
], fetchuser , async(req , res)=>{

    try{
    const{title , description , tag} = req.body;
     //if there are errors returns bad requests and the errors
     const result = validationResult(req);
     if (!result.isEmpty()) {
         return  res.status(404).json({ errors: result.array() });
     }

     const note = new Note({title,description , tag , user : req.user.id});
     const savedNote = await note.save();
     res.json(savedNote);
    }
    catch(error)
    {
        console.log(error.message);
        console.log("hii");
        res.status(500).send("Internal server error"); 
    }
})

//Route 3 : update existing  Note using  : PUT "/api/notes/updatenote" .  require login
router.put('/updatenote/:id' , fetchuser , async(req , res)=>{
   try{

    const{title , description , tag} = req.body;

    //create a newNote object
    const newNote = {}
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to update and update it
    let note = await Note.findById(req.params.id);
    if(!note)
    {
        return res.status(404).send("Not Found");
    }
    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("Not allowed");  
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote} , {new : true});
    res.json({note});

}
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal server error"); 
    }
})

 //Route 4 : Delete existing  Note using  : DELETE "/api/notes/deletenote" .  require login
 router.delete('/deletenote/:id' , fetchuser , async(req , res)=>{
    try{
     
     //find the note to delete and delete it
     let note = await Note.findById(req.params.id);
     if(!note)
     {
         return res.status(404).send("Not Found");
     }
     //Allow deletion if user owns this note
     if(note.user.toString()!==req.user.id)
     {
         return res.status(401).send("Not allowed");  
     }
     note = await Note.findByIdAndDelete(req.params.id);
     res.json({"success ": "Note has been deleted" , note : note});

    }
     catch(error)
     {
         console.log(error.message);
         res.status(500).send("Internal server error"); 
     }
 }) 


module.exports = router