import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] =useState("")

  useEffect(() => {
    fetch(`http://localhost:6001/plants`)
    .then(r => r.json())
    .then(r => 
      //{
      // const updatedPlants = r.map((plant) => (
      //   {...plant, stock: true}
      // ))
      setPlants(r)
      )
  }, [])


  function handleNewPlant(newPlant){
    setPlants([...plants, newPlant])
  }

  function deletePlant(plantdeleted){
    //console.log("adsf")

    const updatedPlants = plants.filter((plant) => (
      plant.id !== plantdeleted.id ? true : false
    ))
    //console.log(updatedPlants)
    setPlants(updatedPlants)
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlantsArray = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      } else {
        return plant;
      }
    });
    setPlants(updatedPlantsArray);
  }


  const filterPlants = plants.filter((plant) =>(
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  return (
    <main>
      <NewPlantForm handleNewPlant={handleNewPlant}/>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <PlantList plants={filterPlants} deletePlant={deletePlant} handleUpdatePlant={handleUpdatePlant}/>
    </main>
  );
}

export default PlantPage;
