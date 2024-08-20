import React , {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const{addNote} = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });


    const HandleClick = (e)=>{
        e.preventDefault();
        addNote(note.title , note.description , note.tag);
        setNote({title:"" , description:"" ,tag:" "});
        props.showAlert("Added successfully","success");
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value })
    }

  return (
    <div className="container my-3">
      <h1>Add Your Notes</h1>
  <form className='my-3'>
   <div className="form-group">
    <label htmlFor="title">Title</label>
    <input type="email" className="form-control" id="title" name="title" aria-describedby="emailHelp"  value={note.title} onChange={onChange}  minLength={5}required/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="description" name = "description" value={note.description} onChange={onChange} minLength={5}required />
  </div>
  <div className="form-group">
    <label htmlFor="description">Tag</label>
    <input type="text" className="form-control" id="tag" name = "tag" value={note.tag} onChange={onChange} minLength={5}required/>
  </div>
  <button disabled ={note.title.length<5||note.description.length<5||note.tag.length<5} type="submit" className="btn btn-primary" onClick={HandleClick}>Add Note</button>
  </form>
  </div>
  )
}

export default AddNote
