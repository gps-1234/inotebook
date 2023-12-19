import React,{useContext, useState,useEffect} from 'react'

import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
  const {notes,addnote}=context;
  const [note, setnote] = useState({title:"",description:"",tag:""})
  const handleclick=(e)=>{
    e.preventDefault();
    console.log(note.title,note.description,note.tag);
  
    addnote(note.title[0],note.description[0],note.tag[0]);
    setnote({title:"",description:"",tag:""});
    props.showAlert("Added successfully","success");
  }
  const onchange=(e)=>{
     setnote({...note,[e.target.name]:[e.target.value]})
  }
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    if (note.title.length <5 || note.description.length <5) {
        setIsButtonDisabled(true);
    }
    else {
        setIsButtonDisabled(false);
    }
 }, [note.title, note.description]);



  return (
    <div className="container my-3">
      <h3>Add a Note</h3>
    <form>
  <div className="mb-3">
    <label for="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" onChange={onchange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label for="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label for="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}/>
  </div>
  <button     type="submit" className="btn btn-primary"  onClick={handleclick}>Add Note</button>
</form>


</div>
  )
}

export default AddNote