
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { PetItem } from "./components/PetItem";
import { TxError } from "./components/TxError";
import { WalletNotDetected } from "./components/WalletNotDetected";
import { ConnectWallet } from "./components/ConnectWallet";

import { ethers } from "ethers";
import contractAddress from "./contracts/contract-address-localhost.json";
import PetAdoptionArtifact from "./contracts/PetAdoption.json";

const HARDHAT_NETWORK_ID = Number(process.env.REACT_APP_NETWORK_ID);

function Dapp() {
  const [pets, setPets] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [contract, setContract] = useState(undefined);

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

      await checkNetwork();
      initiliazeDapp(address);

      window.ethereum.on("accountsChanged", ([newAddress]) => {
        if (newAddress === undefined) {
          setSelectedAddress(undefined);
          return;
        }
        
        initiliazeDapp(newAddress);
      });
      
    } catch(e) {
      console.error(e.message);
    }
  }

  async function initiliazeDapp(address) {
    setSelectedAddress(address);
    const contract = await initContract();

    console.log(contract);
  }

  async function initContract() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress.PetAdoption,
      PetAdoptionArtifact.abi,
      await provider.getSigner(0)
    );

    setContract(contract);
    return contract;
  }

  async function switchNetwork() {
    const chainIdHex = `0x${HARDHAT_NETWORK_ID.toString(16)}`;
    
    return await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{chainId: chainIdHex}]
    });
  }

  async function checkNetwork() {
    if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID.toString()) {
      return switchNetwork();
    }

    return null;
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
