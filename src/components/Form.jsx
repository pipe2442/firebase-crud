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
    <div class="max-w-sm rounded overflow-hidden shadow-lg my-12">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Add new people</div>
        <p class="text-gray-700 text-base">
          This form is created to add new people to the list.
        </p>
        <form onSubmit={submitForm}>
          <div className="my-4">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              onChange={handleInputChange}
              name="name"
              value={datos.name}
              required
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
              required
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
              required
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
              required
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
              required
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
              required
            ></input>
            <div className="my-4">
              <input
                type="text"
                placeholder="Color"
                className="form-control"
                onChange={handleInputChange}
                name="color"
                value={datos.color}
                required
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
    </div>
  );
}

export default Form;
