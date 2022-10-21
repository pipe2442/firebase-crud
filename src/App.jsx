import { useState, useEffect } from "react";
import "./App.css";
import { getPeopleList, deletePerson } from "./firebase/api";
import Form from "./components/Form";

function App() {
  const [people, setPeople] = useState([]);
  const [mutate, setMutate] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const handleMutate = () => setMutate(!mutate);
  const handleUpdate = (mode) => setUpdateMode(mode);

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
      <Form
        handleMutate={handleMutate}
        updateMode={updateMode}
        handleUpdate={handleUpdate}
        updateId={updateId}
      />
      <ul>
        {people.map((person) => (
          <>
            <li key={person.id}>
              <div className="w-36 h-36">
                <img className="w-36 h-36" src={person.image} alt="person" />
              </div>
              <h2>{person.name}</h2>
              <p>{person.age}</p>
              <p>{person.id}</p>
              <p>{person.city}</p>
              <p>{person.country}</p>
              <p>{person.zip}</p>
              <p>{person.college}</p>
              <p>{person.color}</p>
            </li>
            <button
              onClick={() => {
                deletePerson(person.id);
                handleMutate();
              }}
            >
              delete
            </button>
            {updateMode ? (
              <button
                onClick={() => {
                  setUpdateId("");
                  handleUpdate(false);
                }}
              >
                cancel
              </button>
            ) : (
              <button
                onClick={() => {
                  setUpdateId(person.id);
                  handleUpdate(true);
                }}
              >
                update
              </button>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
