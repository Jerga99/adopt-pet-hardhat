
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { PetItem } from "./components/PetItem";
import { TxError } from "./components/TxError";

function Dapp() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      const res = await fetch("/pets.json");
      const data = await res.json();
      setPets(data);
    } 

    fetchPets();
  }, []);

  return (
    <div className="container">
      <TxError />
      <br />
      <Navbar />
      {JSON.stringify(pets)}
      <div className="items">
        <PetItem />
      </div>
    </div>
  );
}

export default Dapp;
