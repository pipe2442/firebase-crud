import { useState, useEffect } from "react";
import "./App.css";
import { getPeopleList, deletePerson } from "./firebase/api";
import Form from "./components/Form";

function App() {
  const [people, setPeople] = useState([]);
  const [mutate, setMutate] = useState(false);

  const handleMutate = () => setMutate(!mutate);

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
  }, [mutate]);
  console.log(people);
  return (
    <div className="App">
      <h1>PEOPLE LIST</h1>
      <Form handleMutate={handleMutate} />
      <ul>
        {people.map((person) => (
          <>
            <li key={person.id}>
              <div className="w-36 h-36">
                <img className="w-36 h-36" src={person.image} alt="person" />
              </div>
              <h2>{person.name}</h2>
              <p>{person.age}</p>
              <p>{person.address}</p>
              <p>{person.id}</p>
            </li>
            <button
              onClick={() => {
                deletePerson(person.id);
                handleMutate();
              }}
            >
              delete
            </button>
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
