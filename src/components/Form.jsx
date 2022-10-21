import { useState } from "react";
import { addPeople } from "../firebase/api";

function Form({ handleMutate }) {
  const initialState = {
    name: "",
    age: "",
    address: "",
    image: "",
  };

  const [datos, setDatos] = useState(initialState);

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

    addPeople({
      ...datos,
      image: randomImage,
    });
    setDatos(initialState);
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
            placeholder="Address"
            className="form-control"
            onChange={handleInputChange}
            name="address"
            value={datos.address}
          ></input>
        </div>
        <button>add person</button>
      </form>
    </div>
  );
}

export default Form;
