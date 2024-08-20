import React ,{useContext, useEffect , useRef , useState} from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import {useNavigate} from 'react-router-dom';


const Notes = (props) => {

    const context = useContext(noteContext);
    const navigate = useNavigate();
    const{notes , getNotes,editNote} = context;
  
    useEffect(() => {
      if(localStorage.getItem('token'))
        {
        getNotes()
        }
        else{
          navigate('/login');
        }
      // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const[note , setNote] = useState({id:"",etitle:"" , edescription:"" ,etag:" "});

  const updateNote = (currentNote) =>{
    ref.current.click();
    setNote({id:currentNote._id ,etitle:currentNote.title, edescription:currentNote.description , etag:currentNote.tag});
  }
  const HandleClick = (e)=>{
    console.log("updating the note",note);
    editNote(note.id , note.etitle ,note.edescription , note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully" ,"success");
}
  const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value })
 }



  return (
     <>
     <AddNote showAlert={props.showAlert}/>
    
<button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <div className="modal-body">

      <form className='my-3'>
      <div className="form-group">
      <label htmlFor="title">Title</label>
      <input type="text" className="form-control" id="etitle" name="etitle" value ={note.etitle} minLength={5}required aria-describedby="emailHelp" placeholder="Enter title"onChange={onChange}/>
     </div>
    <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="edescription" name = "edescription" value = {note.edescription} minLength={5}required placeholder="Enter description" onChange={onChange}/>
    </div>
    <div className="form-group">
    <label htmlFor="description">Tag</label>
    <input type="text" className="form-control" id="etag" name = "etag" value = {note.etag} minLength={5}required placeholder="Enter tag" onChange={onChange}/>
    </div>
  </form>

    </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled ={note.etitle.length<5||note.edescription.length<5} type="button" className="btn btn-primary" onClick={HandleClick}>Update Notes</button>
      </div>
    </div>
  </div>
</div>

     <h1>Your Notes</h1>
     <div className='row my-3'>
     <div className="container mx-2">
     {notes.length===0 && 'No Notes to display'}
     </div>
     {notes.map((note)=>{
         return <Noteitem key={note._id}  updateNote={updateNote} note={note} showAlert={props.showAlert}/>  
       })}
     </div>

    </>   
  )
}

export default Notes
