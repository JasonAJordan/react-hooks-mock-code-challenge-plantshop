import React, {useState} from "react";

function PlantCard({plant, deletePlant, handleUpdatePlant}) {

  // "name": "Aloe",
  // "image": "./images/aloe.jpg",
  // "price": 15.99
  // maybe should have stock? need to add in plantpage

  const [stock, setStock] = useState(true);
  const [updatedPrice, setUpdatedPrice] = useState("")

  function handleStock(event){
    setStock(!stock);
  }

  function handleDeletePlant(event){
    //console.log("asdf")

    fetch(`http://localhost:6001/plants/${plant.id}`, {
          method: 'DELETE'
          })
      .then(r => r.json())
      .then(r => deletePlant(plant))
  }

  function handlePriceFormSubmit(event){
    event.preventDefault();
    const data = {price: updatedPrice}

    fetch(`http://localhost:6001/plants/${plant.id}`, {
         method: 'PATCH',
         headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((r) => r.json())
      .then((updatedPlant) => {
        handleUpdatePlant(updatedPlant)
      });
  
  }



  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {stock ? (
        <button className="primary" onClick={handleStock}>In Stock</button>
      ) : (
        <button >Out of Stock</button>
      )}
      <button onClick={handleDeletePlant}>Delete</button>
      <form onSubmit={handlePriceFormSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="New price..."
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
        />
        <button type="submit">Update Price</button>
        </form>
    </li>
  );
}

export default PlantCard;
