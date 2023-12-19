import React ,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const context=useContext(noteContext);
    const {note,updateNote}=props;
    const {deleteNote}=context;
    const onclick=()=>{
        deleteNote(note._id);
        props.showAlert("Deleted successfully","success");
    }
  return (
    <div className='col-md-3'>
    
    <div className='card'>
  <div class="card-body">
    <h5 class="card-title">{note.title}
    <i class="fa-solid fa-trash mx-3" onClick={onclick} ></i>
    <i class="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}} > </i>
    </h5>
    <p class="card-text">{note.description}</p>
    
    </div>
  </div>
</div>
    
  )
}

export default NoteItem