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
            <li key={person.id} className="my-8">
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  class="w-full"
                  src={person.image}
                  alt="Sunset in the mountains"
                />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{person.name}</div>
                  <p class="text-gray-700 text-base">{person.college}</p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {person.age} years old
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    id: {person.id}
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {person.city}
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {person.color}
                  </span>
                </div>
                <div className="my-4 space-x-4">
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
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
