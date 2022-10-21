import { useState } from "react";


function Form() {
  const [datos, setDatos] = useState({
    name: "",
    age: 0,
    address: "",
    image: "",
  });

  const getRandomImage = async () => {
    const random = Math.floor(Math.random() * 30);

    const data = await fetch("https://picsum.photos/v2/list");
    const images = await data.json();
    return images[random].download_url;
  };

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
    console.log(datos);
  };

  const submitForm = (event) => {
    event.preventDefault();
    getRandomImage().then((image) => {
      setDatos({
        ...datos,
        ["image"]: image,
      });
    });
    console.log("enviando datos..." + JSON.stringify(datos));
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
          ></input>
        </div>
        <div className="my-4">
          <input
            type="number"
            placeholder="Age"
            className="form-control"
            onChange={handleInputChange}
            name="age"
          ></input>
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="Address"
            className="form-control"
            onChange={handleInputChange}
            name="address"
          ></input>
        </div>
        <button>add person</button>
      </form>
    </div>
  );
}

export default Form;
