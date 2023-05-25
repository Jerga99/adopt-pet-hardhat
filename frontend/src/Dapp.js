
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { PetItem } from "./components/PetItem";
import { TxError } from "./components/TxError";
import { WalletNotDetected } from "./components/WalletNotDetected";
import { ConnectWallet } from "./components/ConnectWallet";

function Dapp() {
  const [pets, setPets] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(undefined);

  useEffect(() => {
    async function fetchPets() {
      const res = await fetch("/pets.json");
      const data = await res.json();
      setPets(data);
    } 

    fetchPets();
  }, []);

  async function connectWallet() {
    try {
      const [address] = await window.ethereum.request({method: "eth_requestAccounts"});
      setSelectedAddress(address);
      
    } catch(e) {
      console.error(e.message);
    }
  }

  if (!window.ethereum) {
    return <WalletNotDetected />
  }

  if (!selectedAddress) {
    return <ConnectWallet connect={connectWallet} />
  }

  return (
    <div className="container">
      <TxError />
      <br />
      <Navbar address={selectedAddress} />
      <div className="items">
        { pets.map((pet) =>
          <PetItem key={pet.id} pet={pet} />
        )}
      </div>
    </div>
  );
}

export default Dapp;
