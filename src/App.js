import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Note from "./components/Note";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteFrom";
import Togglable from "./components/Togglable";

import noteService from "./services/notes";
import loginService from "./services/login";
import "./index.css";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Developed by Amber Y.</em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  /* 
  The empty array as the parameter of the effect 
  ensures that the effect is executed only 
  when the component is rendered for the first time.
  */

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note.important };

    noteService
      .update(id, changeNote)
      .then((returnNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : changeNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id)); //filter函数可以看成是一个过滤函数，返回符合条件的元素的数组
      });
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  const handleLogin = async (userInfo) => {
    console.log("login");
    // event.preventDefault();
    try {
      const user = await loginService.login(userInfo);

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      // window.localStorage.getItem("loggedNoteappUser");
      noteService.setToken(user.token);
      setUser(user);
    } catch (expection) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedNoteappUser");
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm loginAction={handleLogin}></LoginForm>
    </Togglable>
  );

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  return (
    <div>
      <h1 className="note">Notes</h1>
      <Notification className="error" message={errorMessage}></Notification>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogOut}>log out</button>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer></Footer>
    </div>
  );
};

export default App;
