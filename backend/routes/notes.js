const express=require('express');
const Notes=require('../models/Notes');
const{body,validationResult}=require('express-validator');

const fetchUser=require('../middleware/fetchUser');
const router=express.Router();
//Get all notes of a user using :Get "/api/notes/fetchAllNotes" . Login required
router.get('/fetchAllNotes',fetchUser,async(req,res)=>{
    try{const notes=await Notes.find({user:req.user.id});
    res.json(notes);}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
//Add new notes of a user using :Post "/api/notes/addNotes" . Login required
router.post('/addNotes',fetchUser,[
    
        body('title','Enter a valid title').isLength({min:3}),
        body('description','Description must contain atleast 5 characters').isLength({min:5}),
    ],async(req,res)=>{
        const {title,description,tag}=req.body;
        const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   try{
        const notes=new Notes({
            title,description,tag,user:req.user.id
        })
        const savednote=await notes.save()
       res.json(savednote);}
       catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
//Update existing notes of a user using :PUT "/api/notes/updateNotes" . Login required
router.put('/updateNotes/:id',fetchUser,async(req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const newnotes={};
    if(title){newnotes.title=title};
    if(description){newnotes.description=description};
    if(tag){newnotes.tag=tag};
    //Find notes with that id is there or not
    let notes=await Notes.findById(req.params.id);
      if(!notes){return res.status(404).send("Not found")};
      //Check if user is trying to delete others notes
      if(notes.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
      }
        notes=await Notes.findByIdAndUpdate(req.params.id,{$set:newnotes},{new:true});
        res.send({notes});}
        catch(error){
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
})
//Delete existing notes of a user using :DELETE "/api/notes/deleteNotes" . Login required
router.delete('/deleteNotes/:id',fetchUser,async(req,res)=>{
    try{
        let notes=await Notes.findById(req.params.id);
        if(!notes){return res.status(404).send("Not found")};
        if(notes.user.toString()!==req.user.id){
          return res.status(401).send("Not allowed");
        }
        notes=await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Notes has been deleted",notes:notes});}
        catch(error){
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })
module.exports=router