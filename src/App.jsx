import { useState, useEffect } from "react";
import "./App.css";
import { getPeopleList } from "./firebase/api";
import Form from "./components/Form";

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
      const querySnapshot = await getPeopleList();
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setPeople(docs);
    };
    getPeople();
  }, []);
  console.log(people);
  return (
    <div className="App">
      <h1>PEOPLE LIST</h1>
      <Form />
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <div className="w-36 h-36">
              <img className="w-36 h-36" src={person.image} alt="person" />
            </div>
            <h2>{person.name}</h2>
            <p>{person.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
