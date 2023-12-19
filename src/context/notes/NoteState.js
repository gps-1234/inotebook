import React, { useState } from "react";
import noteContext from './noteContext';
const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[];
        
      const [notes, setnotes] = useState(notesInitial)
      //Get all notes
      const getNotes=async ()=>{
        const response=await fetch(`${host}/api/notes/fetchAllNotes`
        ,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
        }
       
      });
      const json=await response.json();
      setnotes(json);
      }
      
      
      //Add a note
      const addnote=async (title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/addNotes`
            ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title:title,description:description,tag:tag})
          });
          const note=await response.json();
             console.log("Adding a new note")
      
      setnotes(notes.concat(note));}
      //Delete note
      const deleteNote=async(id)=>{
        const response=await fetch(`${host}/api/notes/deleteNotes/${id}`
            ,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            }
            
          });
        
        const newnotes=notes.filter((note)=>{return note._id!==id})
        setnotes(newnotes);
      }
      //Edit a note
      const editnote=async (id,title,description,tag)=>{
          //API CALL
          const response=await fetch(`${host}/api/notes/updateNotes/${id}`
            ,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          });
          const json=await response.json();


           const newnote=JSON.parse(JSON.stringify(notes));
         for(let index=0;index<newnote.length;index++){
            const element=newnote[index];
            if(element._id===id){
                newnote[index].title=title;
                newnote[index].description=description;
                newnote[index].tag=tag;
                break;
            }

         }
         setnotes(newnote);
      }

    return(
        <noteContext.Provider value={{notes,addnote,deleteNote,editnote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;