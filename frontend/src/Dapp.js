
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { PetItem } from "./components/PetItem";
import { TxError } from "./components/TxError";
import { WalletNotDetected } from "./components/WalletNotDetected";
import { ConnectWallet } from "./components/ConnectWallet";

import { ethers } from "ethers";

import {contractAddress} from "./address";

import PetAdoptionArtifact from "./contracts/PetAdoption.json";
import { TxInfo } from "./components/TxInfo";

const HARDHAT_NETWORK_ID = Number(process.env.REACT_APP_NETWORK_ID);

function Dapp() {
  const [pets, setPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [txError, setTxError] = useState(undefined);
  const [txInfo, setTxInfo] = useState(undefined);
  const [view, setView] = useState("home");

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
          setAdoptedPets([]);
          setOwnedPets([]);
          setSelectedAddress(undefined);
          setContract(undefined);
          setTxError(undefined);
          setTxInfo(undefined);
          setView("home");
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
    getAdoptedPets(contract);
  }

  async function initContract() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(0);
    const contract = new ethers.Contract(
      contractAddress.PetAdoption,
      PetAdoptionArtifact.abi,
      signer
    );

    setContract(contract);
    return contract;
  }

  async function getAdoptedPets(contract) {
    try {
      const adoptedPets = await contract.getAllAdoptedPets();
      const ownedPets = await contract.getAllAdoptedPetsByOnwer();

      if (adoptedPets.length > 0) {
        setAdoptedPets(adoptedPets.map(petIdx => Number(petIdx)));
      } else {
        setAdoptedPets([]);
      }

      if (ownedPets.length > 0) {
        setOwnedPets(ownedPets.map(petIdx => Number(petIdx)));
      } else {
        setOwnedPets([]);
      }
    } catch(e) {
      console.error(e.message);
    }
  }

  async function adoptPet(id) {
    try {
      const tx = await contract.adoptPet(id);
      setTxInfo(tx.hash);
      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed!");
      }

      setAdoptedPets([...adoptedPets, id]);
      setOwnedPets([...ownedPets, id]);
    } catch(e) {
      setTxError(e?.reason);
    } finally {
      setTxInfo(undefined);
    }
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
      { txInfo &&
        <TxInfo 
          message={txInfo}
        />
      }
      { txError &&
        <TxError 
          dismiss={() => setTxError(undefined)}
          message={txError} 
        />
      }
      <br />
      <Navbar 
        setView={setView}
        address={selectedAddress} 
      />
      <div className="items">
        { view === "home" ?
          pets.map((pet) =>
            <PetItem 
              key={pet.id} 
              pet={pet} 
              inProgress={!!txInfo}
              disabled={adoptedPets.includes(pet.id)}
              adoptPet={() => adoptPet(pet.id)}
            />
          ) :
          pets
            .filter(pet => ownedPets.includes(pet.id))
            .map((pet) =>
            <PetItem 
              key={pet.id} 
              pet={pet} 
              disabled={true}
              adoptPet={() => {}}
            />
          )
        }
      </div>
    </div>
  );
}

export default Dapp;
