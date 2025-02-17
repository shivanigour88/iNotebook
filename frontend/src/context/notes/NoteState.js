import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState  = (props) => {
       const host = "http://localhost:5000"
      const initialNotes = []
      const[notes , setNotes] = useState(initialNotes);

      
      //Get all Notes
      const getNotes = async()=>{
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
           // "auth-token" :  localStorage.getItem('token')
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzZDMyODQ1M2ZmYzY2MTUzYWFkNGE1In0sImlhdCI6MTcxNTMxNzU0N30.Y8ZdecVTjLQYCaS-wz_fyLEmtOAzvnX2IEvYddP6irE",
          },
        });
        const json = await response.json()
          console.log(json);
          setNotes(json)
      }


      //ADD a Note
      const addNote = async(title , description , tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            //"auth-token" :  localStorage.getItem('token')
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzZDMyODQ1M2ZmYzY2MTUzYWFkNGE1In0sImlhdCI6MTcxNTMxNzU0N30.Y8ZdecVTjLQYCaS-wz_fyLEmtOAzvnX2IEvYddP6irE",
          },
          body: JSON.stringify({title , description ,tag}) 
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        console.log(note);
        console.log("Adding a new note");
        
      }
      
      //Delete a Note
      const deleteNote = async(id)=>{
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            //"auth-token" :  localStorage.getItem('token')
           "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzZDMyODQ1M2ZmYzY2MTUzYWFkNGE1In0sImlhdCI6MTcxNTMxNzU0N30.Y8ZdecVTjLQYCaS-wz_fyLEmtOAzvnX2IEvYddP6irE",
          }
        });
        const json =  await response.json(); 
        console.log(json);
        console.log("Deleting a new note" +id);
        const newNotes = notes.filter((note)=>{return note._id!== id})
        setNotes(newNotes);
      }

      //Edit a Note
      const editNote = async(id , title,description , tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            //"auth-token" :  localStorage.getItem('token')
           "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzZDMyODQ1M2ZmYzY2MTUzYWFkNGE1In0sImlhdCI6MTcxNTMxNzU0N30.Y8ZdecVTjLQYCaS-wz_fyLEmtOAzvnX2IEvYddP6irE",
          },
          body: JSON.stringify({title , description ,tag}) 
        });
        const json =  await response.json(); 
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        //Logic to edit in client
        for(let index =0 ; index<newNotes.length ; index++)
          {
            const element = newNotes[index];
            if(element._id === id)
              {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
              } 
          }
          setNotes(newNotes);
      }

return(
    <NoteContext.Provider value = {{notes , addNote , deleteNote,editNote ,getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;