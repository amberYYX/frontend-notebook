import React from "react";

const NoteForm = ({
  onSubmit,
  newNote,
  handleNoteChange
}) => (
  <form onSubmit={onSubmit}>
    <input value={newNote} onChange={handleNoteChange} />
    <button type="submit">save</button>
  </form>
)

export default NoteForm