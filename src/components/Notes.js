

import { useState } from 'react';
import React, { useContext,useEffect,useRef }from 'react'

import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import {useNavigate} from "react-router-dom"

const Notes = (props) => {
const context = useContext(noteContext);
let navigate=useNavigate();
  const {notes,getNotes,editnote}=context;
  console.log(notes);
useEffect(()=>{
  if(localStorage.getItem('token')){
    getNotes();
  }
  else{
        navigate("/login");
  }
   
},[])

         const ref=useRef(null);
         const refclose=useRef(null)
  const [note, setnote] = useState({_id:"",title:"",description:"",tag:""})

const handleclick=(e)=>{
  e.preventDefault();
  //console.log(note.title,note.description,note.tag);
      
      console.log(note.title,note.description,note.tag);
  editnote(note._id,(note.title)[0],(note.description)[0],(note.tag)[0]);
  refclose.current.click();
  props.showAlert("Updated successfully","success");
}
const onchange=(e)=>{
   setnote({...note,[e.target.name]:[e.target.value]})
}

const updateNote=(currnote)=>{
ref.current.click();
setnote({_id:currnote._id,title:currnote.title,description:currnote.description,tag:currnote.tag});
console.log(note);

}
  return (
    <>

    <button ref={ref} type="button"  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
  <div className="mb-3">
    <label for="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label for="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label for="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange}/>
  </div>
  
</form>
      </div>
      <div class="modal-footer">
        <button ref={refclose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleclick} class="btn btn-primary">Update note</button>
      </div>
    </div>
  </div>
</div>
    
   <div className='row my-4'>
    <h3>Your notes</h3>
    <div className="row mx-2">
    {notes.length===0 && "No notes to show"}</div>
    {notes.length>0 && notes.map((note)=>{
        return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/> 
    })}
    </div>
    
    </>
  )
}

export default Notes