import { useState, useEffect } from "react";
import { addPeople, getPerson, updatePerson } from "../firebase/api";

function Form({ handleMutate, updateMode, handleUpdate, updateId }) {
  const initialState = {
    name: "",
    age: "",
    city: "",
    country: "",
    zip: "",
    color: "",
    image: "",
    college: "",
  };

  const [datos, setDatos] = useState(initialState);

  useEffect(() => {
    if (updateMode) {
      const getPersonData = async () => {
        const person = await getPerson(updateId);
        setDatos(person.data());
      };
      getPersonData();
    }

    if (!updateMode) {
      setDatos(initialState);
    }
  }, [updateId]);

  const getRandomImage = async () => {
    const random = Math.floor(Math.random() * 30);

    const data = await fetch("https://picsum.photos/v2/list");
    const images = await data.json();
    const image = images[random].download_url;
    return image;
  };

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const randomImage = await getRandomImage();

    if (updateMode) {
      updatePerson(updateId, datos);
    }

    if (!updateMode) {
      addPeople({
        ...datos,
        image: randomImage,
      });
    }
    setDatos(initialState);
    handleUpdate(false);
    handleMutate();
  };

  return (
    <div className="my-24">
      <h2>Form to add people</h2>
      <form onSubmit={submitForm}>
        <div className="my-4">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            onChange={handleInputChange}
            name="name"
            value={datos.name}
          ></input>
        </div>
        <div className="my-4">
          <input
            type="number"
            placeholder="Age"
            className="form-control"
            onChange={handleInputChange}
            name="age"
            value={datos.age}
          ></input>
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="City"
            className="form-control"
            onChange={handleInputChange}
            name="city"
            value={datos.city}
          ></input>
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="Country"
            className="form-control"
            onChange={handleInputChange}
            name="country"
            value={datos.country}
          ></input>
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="Zip"
            className="form-control"
            onChange={handleInputChange}
            name="zip"
            value={datos.zip}
          ></input>
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="College"
            className="form-control"
            onChange={handleInputChange}
            name="college"
            value={datos.college}
          ></input>
          <div className="my-4">
            <input
              type="text"
              placeholder="Color"
              className="form-control"
              onChange={handleInputChange}
              name="color"
              value={datos.color}
            ></input>
          </div>
        </div>
        {!updateMode ? (
          <button type="submit">add person</button>
        ) : (
          <button type="submit">update person</button>
        )}
      </form>
    </div>
  );
}

export default Form;
