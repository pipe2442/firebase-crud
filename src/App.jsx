import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { getPeopleList } from "./firebase/api";

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

  return (
    <div className="App">
      <h1>hello world</h1>
    </div>
  );
}

export default App;
