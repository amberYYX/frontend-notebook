import React, { useState } from "react";

const NoteForm = ({createNote }) => {

  const [newNote, setNewNote] = useState('')

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }
  
  const addNote = (event) => {
    event.preventDefault();

    createNote({
      content: newNote,
      important: Math.random() > 0.5,
    })

    setNewNote('')
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )

}
  

export default NoteForm