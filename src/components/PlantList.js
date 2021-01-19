import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, deletePlant, handleUpdatePlant}) {

  const plantsMapped = plants.map(( plant ) => (
    <PlantCard 
    plant={plant}
    key={plant.id}
    deletePlant={deletePlant}
    handleUpdatePlant={handleUpdatePlant}
    />
  ))


  return (
    <ul className="cards">{plantsMapped}</ul>
  );
}

export default PlantList;
