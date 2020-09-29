import axios from "axios";
// const baseUrl = "http://localhost:3002/api/notes";
// const baseUrl = "https://note-reminder.herokuapp.com/api/notes"; //Keroku
const baseUrl = "/api/notes"; //Keroku relative URL

const getAll = () => {
  const request = axios.get(baseUrl);

  const nonExisting = {
    id: 1000,
    content: "this note is not saved to server",
    date: "2020-09-10T 11:12:30.098Z",
    important: true,
  };

  //   return request.then((response) => response.data.concat(nonExisting));
  return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
