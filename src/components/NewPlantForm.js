import React, {useState} from "react";

function NewPlantForm({handleNewPlant}) {

  const [formData, setFormData] = useState({

    name: "",
    image: "",
    price: "",
  })

  function handleFormChange(event){
    setFormData({...formData, 
      [event.target.name]: event.target.value 
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    //handleNewPlant(formData)

    fetch(`http://localhost:6001/plants`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      })
      .then(r => r.json())
      .then(newPlant => handleNewPlant(newPlant))
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" 
        value={formData.name}
        onChange={handleFormChange}
        />
        <input type="text" name="image" placeholder="Image URL" />
        <input type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
